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
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert interview coach. Generate 10 detailed and challenging interview questions based on the job description provided. Format the response as a numbered list with each question on a new line starting with a number followed by a period and a space. Focus on technical skills, behavioral scenarios, and problem-solving abilities relevant to the position.',
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