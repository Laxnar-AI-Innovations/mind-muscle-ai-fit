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
            content: `You are an AI response analyzer.  
Your sole job is to decide whether the assistant's reply should trigger a product‑recommendation component.

TRIGGER CONDITIONS
A trigger happens **only** when the reply contains the control token  
    show_components  
or a trivially‑mistyped / spacing variant, such as:
- show components
- show_component
- showcomponents
(Upper‑/lower‑case differences are also allowed.)

No other words (e.g. "recommend", "show you") may trigger.

RESPONSE FORMAT  
Return strict JSON:

{
  "shouldTrigger": <true|false>,
  "cleanedResponse": "<assistant‑reply with token removed>",
  "reasoning": "<brief reason>"
}

RULES
1. Detect the token at the *end* of the reply or anywhere inside.
2. If detected:
   • set "shouldTrigger": true  
   • strip **only** the token and surrounding whitespace/new‑line  
   • leave the rest of the reply intact in cleanedResponse.
3. If not detected:
   • "shouldTrigger": false  
   • cleanedResponse = original reply (unchanged)
4. Always include a short reasoning.
5. Never emit anything except the JSON object.`
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