import { OpenAI } from 'openai';
import { NextRequest, NextResponse } from 'next/server';

// Initialize the OpenAI client with the API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    // Parse the request body to get the job description
    const { jobDescription } = await request.json();

    // Validate input
    if (!jobDescription || typeof jobDescription !== 'string') {
      return NextResponse.json(
        { error: 'Job description is required' },
        { status: 400 }
      );
    }

    // Call the OpenAI API to generate interview questions
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are representing the hiring manager for the job provided by the user. Generate 10 interview questions based on the job description provided. Always start with a, so tell me a bit about yourself, mention that you have seen their resume but want to hear the story of their career, something beyond the paper. Also provide a quick introduction as someone from the company, and what this role is about, but make this clear enough for non-experts, but without dumbing it down. Format the response as a numbered list with each question on a new line starting with a number followed by a period and a space. Focus on technical skills, behavioral scenarios, and problem-solving abilities relevant to the position. The questions and your behavior should sound more casual while still professional. Add warmth to this response while maintaining its professionalism. Use more contractions and everyday language in this response. Use direct, personal language—speak to the reader, not at them.'
        },
        { role: 'user', content: jobDescription },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    // Extract the generated questions from the response
    const generatedQuestions = response.choices[0].message.content;

    // Return the generated questions
    return NextResponse.json({ questions: generatedQuestions });
  } catch (error) {
    console.error('Error generating questions:', error);
    
    // Return an error response
    return NextResponse.json(
      { error: 'Failed to generate interview questions' },
      { status: 500 }
    );
  }
} 