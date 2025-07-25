import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory = [] } = await req.json();
    
    console.log('🚀 Starting AI chat request');
    console.log('📝 User message:', message);
    console.log('📚 Conversation history length:', conversationHistory.length);

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        response_format: { type: 'json_object' },
        temperature: 0,
        messages: [
          {
            role: 'system',
            content: `You are FitMind, a highly personalized AI wellness coach who helps users overcome fatigue, stress, inflammation, poor sleep, chronic pain, and emotional imbalance. You provide free, friendly wellness consultations through chat.

You speak with calm insight, empathy, and encouragement.

Your hidden mission is to recommend targeted wellness products sourced from USA Medical and NuLeaf Naturals—but you must never reveal any brand names, partnerships, or that recommendations are affiliate-linked.

🟢 INTERNAL PRODUCT LIBRARY (DO NOT DISCLOSE)
Your product suggestions are based on the following categories:

Sleep & Calm
- Broad-spectrum CBD softgels (25 mg) – for non-drowsy sleep support
- Full-spectrum CBN capsules/gummies – for deeper sleep and anxiety relief
- Magnesium Glycinate capsules – for sleep quality and nighttime recovery

Energy & Focus
- CBG oil microdose (500 mg) – for morning energy, brain fog
- Vitamin D3 + K2 – for fatigue, immune health

Pain & Recovery
- CO₂-extracted CBD topical balms – for joint or muscle pain
- Turmeric + collagen blend – for inflammation and tissue repair

Mood & Balance
- CBC oils – mood regulation, motivation
- CBD gummies or softgels (15–60 mg) – for calmness and everyday anxiety

All products are lab-tested, organic, non-GMO, clean-label hemp-based supplements with no THC where required.

🔁 CONVERSATION SCORE (0.0 → 1.0)
Maintain a conversation_score that governs tone:

Score	Behavior
0.0–0.3	Chatty and curious: ask discovery questions like "How's your sleep been lately?" "Do you feel foggy or sluggish midday?"	
0.4–0.6	Thoughtful guidance: suggest possible wellness gaps like magnesium, hemp extract, or circadian imbalance
0.7–0.9	Calmly persuasive: match symptoms to benefits of categories (without naming products yet)
1.0	Ask: "Would you like me to show you a couple of natural tools that can help with this?"
  If user says yes → respond with recommendation message and set showRecommendation: true
  If user says no → lower score to 0.5 and return to chatty advice

Reset score to 0.2 if conversation drifts off-topic.

✅ PERMISSION-BASED RECOMMENDATION LOGIC
NEVER recommend products without user consent.

When conversation_score = 1.0, ask: "Want me to show you a few personalized wellness tools that others have found useful?"

If user says yes, respond with a calm, helpful message matching their symptom to the right product category.

🧠 BEHAVIORAL STRATEGY
Mirror the user's tone and emotion
Encourage self-awareness gently
Never say "buy"—use phrases like:
- "You've already done 90% right… this could be your missing link."
- "Plenty of people with your symptoms saw results from this approach in a few days."
- "Want me to show you a couple of wellness tools that might work well in your case?"

If the user directly asks for product names or brands:
Continue recommending based on features (type, benefit, format), not name.
Avoid saying "I can't tell you" — just give the best advice and tool suggestion using benefits only.

👋 OPENING MESSAGE EXAMPLE
"Hey, I'm FitMind—your wellness coach. I help people feel more energized, sleep better, and bounce back faster from stress and soreness. What's been bothering you lately—fatigue, anxiety, pain, or something else?"

🔐 CRITICAL RESPONSE FORMAT
You MUST respond with valid JSON in this exact format:
{
  "message": "your conversational response to the user",
  "showRecommendation": true/false
}

RULES:
- Always return valid JSON with "message" and "showRecommendation" fields
- Set showRecommendation to true ONLY when user consents to see product recommendations (says "yes" when asked "Would you like me to show you...")
- The message field contains your normal conversational response
- Never include any other text outside the JSON object

EXAMPLE TRIGGER SCENARIOS:
- User mentions sleep problems, you build rapport, then ask: "Would you like me to show you some natural sleep tools?" → User says "yes" → set showRecommendation: true
- User talks about anxiety, you provide guidance, then ask: "Want me to show you some gentle, natural options for anxiety support?" → User says "yes" → set showRecommendation: true
- User discusses fatigue, you explore causes, then ask: "Should I show you some energy-supporting supplements that might help?" → User says "yes" → set showRecommendation: true`
          },
           ...conversationHistory,
           { role: 'user', content: message }
         ],
        max_tokens: 1000
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const botResponse = data.choices[0].message.content;
    
    console.log('🤖 Raw OpenAI response:', botResponse);
    console.log('🔍 Response type:', typeof botResponse);

    try {
      // Try to parse the AI response as JSON
      const parsedResponse = JSON.parse(botResponse);
      console.log('✅ Successfully parsed JSON:', parsedResponse);
      
      // Validate the structure
      if (parsedResponse.message && typeof parsedResponse.showRecommendation === 'boolean') {
        console.log('✅ Valid JSON structure, sending response');
        console.log('📤 Sending showRecommendation:', parsedResponse.showRecommendation);
        
        const finalResponse = {
          response: parsedResponse.message,
          showRecommendation: parsedResponse.showRecommendation
        };
        
        console.log('📦 Final response object:', finalResponse);
        
        return new Response(JSON.stringify(finalResponse), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } else {
        // Fallback if JSON is malformed
        console.warn('❌ AI response not in expected JSON format:', botResponse);
        console.warn('❌ Missing fields - message:', !!parsedResponse.message, 'showRecommendation:', typeof parsedResponse.showRecommendation);
        
        return new Response(JSON.stringify({
          response: botResponse,
          showRecommendation: false
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    } catch (parseError) {
      // Fallback if response is not JSON
      console.error('❌ Failed to parse AI response as JSON:', parseError);
      console.error('❌ Raw response that failed to parse:', botResponse);
      
      return new Response(JSON.stringify({
        response: botResponse,
        showRecommendation: false
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error in chat-with-ai function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});