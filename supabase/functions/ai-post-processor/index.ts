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
    const { aiResponse } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    if (!aiResponse) {
      throw new Error('AI response is required');
    }

    console.log('Processing AI response:', aiResponse);

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
            content: `You are an AI response analyzer. Your job is to determine if an AI wellness coach response should trigger a product recommendation component.

TRIGGER CONDITIONS:
A response should trigger the product recommendation ONLY if it contains:
1. The exact phrase "show_components"
2. Very similar variations like "show components", "showcomponents", "show_component"
3. Minor typos or spacing variations of "show_components"

RESPONSE FORMAT:
You must respond with a JSON object containing:
{
  "shouldTrigger": boolean,
  "cleanedResponse": "string with trigger phrase removed",
  "reasoning": "brief explanation of your decision"
}

IMPORTANT RULES:
- Only trigger on "show_components" or very close variations of this exact phrase
- Remove the trigger phrase from cleanedResponse but keep the natural conversation flow
- If no "show_components" detected, cleanedResponse should be identical to the input
- Always provide reasoning for your decision`
          },
          {
            role: 'user',
            content: `Analyze this AI response and determine if it should trigger product recommendations:

"${aiResponse}"`
          }
        ],
        temperature: 0.1,
        max_tokens: 500
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const analysisResult = data.choices[0].message.content;

    console.log('AI analysis result:', analysisResult);

    // Parse the JSON response
    let parsedResult;
    try {
      parsedResult = JSON.parse(analysisResult);
    } catch (parseError) {
      console.error('Failed to parse AI analysis result:', parseError);
      // Fallback: check for common trigger patterns
      const shouldTrigger = aiResponse.toLowerCase().includes('show_components') || 
                           aiResponse.toLowerCase().includes('show you') ||
                           aiResponse.toLowerCase().includes('recommend') ||
                           aiResponse.toLowerCase().includes('i\'ll show');
      
      parsedResult = {
        shouldTrigger,
        cleanedResponse: aiResponse.replace(/show_components/gi, '').trim(),
        reasoning: 'Fallback analysis due to parsing error'
      };
    }

    console.log('Final analysis result:', parsedResult);

    return new Response(JSON.stringify(parsedResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-post-processor function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      shouldTrigger: false,
      cleanedResponse: '',
      reasoning: 'Error occurred during processing'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});