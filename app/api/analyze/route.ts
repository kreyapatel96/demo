import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabaseServer';
import { geminiModel } from '@/lib/gemini';
import { groq } from '@/lib/groq';
import { PROMPT_TEMPLATES, type Tool } from '@/lib/prompts';

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { tool, input_text } = await request.json() as { tool: Tool; input_text: string };

    if (!tool || !input_text) {
      return NextResponse.json({ error: 'Missing tool or input_text' }, { status: 400 });
    }

    const template = PROMPT_TEMPLATES[tool];
    if (!template) {
      return NextResponse.json({ error: 'Invalid tool selected' }, { status: 400 });
    }

    const prompt = template(input_text);
    let aiResponse = '';
    let modelUsed = 'gemini-1.5-flash';

    try {
      // Primary: Google Gemini
      const result = await geminiModel.generateContent(prompt);
      aiResponse = result.response.text();
    } catch (geminiError) {
      console.error('Gemini Error, falling back to Groq:', geminiError);
      
      try {
        // Fallback: Groq (Llama 3.1)
        modelUsed = 'llama-3.1-70b-versatile';
        const groqResult = await groq.chat.completions.create({
          messages: [{ role: 'user', content: prompt }],
          model: modelUsed,
        });
        aiResponse = groqResult.choices[0]?.message?.content || 'No response from Groq';
      } catch (groqError) {
        console.error('Groq Error:', groqError);
        return NextResponse.json({ error: 'Both AI models failed to respond' }, { status: 500 });
      }
    }

    // Save results to Supabase
    const { data, error: dbError } = await supabase.from('analyses').insert([
      {
        user_id: user.id,
        tool,
        input_text,
        ai_response: aiResponse,
        model_used: modelUsed,
      }
    ]).select();

    if (dbError) {
      console.error('Database Error:', dbError);
      return NextResponse.json({ error: 'Failed to save analysis result' }, { status: 500 });
    }

    return NextResponse.json({ 
      message: 'Analysis completed successfully', 
      analysis: data[0] 
    });

  } catch (error) {
    console.error('Analysis Request Error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
