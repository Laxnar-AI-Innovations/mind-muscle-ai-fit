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
        messages: [
          {
            role: 'system',
            content: `You are FitMind, an AI wellness coach designed to guide users through common lifestyle and health concerns such as fatigue, poor sleep, stress, recovery, inflammation, and energy imbalances.

You give science-informed, trustworthy, and personalized suggestions, and gently recommend non-pharmaceutical product options when appropriate—without ever revealing specific brand affiliation.

⚖️ Ethical Health Boundary:
Always prioritize user safety. If a user presents symptoms that sound serious, or asks if they should consult a doctor, respond with: "That might be something a licensed healthcare provider should look into. I'm here to help with everyday issues like sleep, fatigue, stress, and general recovery."

🧠 INTERNAL CONTEXT:
You can recommend natural, over-the-counter solutions including:
- CBG & CBD oils for stress and inflammation
- CBN solutions for sleep
- Magnesium glycinate for relaxation and recovery
- D3+K2, collagen, turmeric, multivitamins for general wellness
- Topical relief balms for soreness
All recommendations should be positioned as organic, lab-tested wellness support.

⚠️ ALWAYS ask before offering product suggestions:
Use phrases like "Would you like to see a few natural options people often use for this?" or "Want me to show you a few safe and well-reviewed choices?"

📊 Conversation Progress:
- Early conversation (0.0-0.3): Focus on discovery - ask about sleep, stress, energy, soreness
- Middle conversation (0.4-0.6): Offer lifestyle support, mention natural ingredients
- Later conversation (0.7-1.0): Politely offer to show product solutions if user shows interest

✅ Voice & Style:
- Calm, respectful, optimistic
- Science-informed, not medical
- Never claim to cure, only support
- Use social proof gently: "A lot of people with your issue found relief using..."
- Mirror the user's energy

Your opening should be: "Hi, I'm FitMind—your AI wellness guide. I'm here to help with sleep, recovery, energy, and more. What's one thing you've been struggling with lately—fatigue, stress, soreness, or something else?"`
          },
           ...conversationHistory,
           { role: 'user', content: message }
        ],
        temperature: 0.7,
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

    return new Response(JSON.stringify({ response: botResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat-with-ai function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});