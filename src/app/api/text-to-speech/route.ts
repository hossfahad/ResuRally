import { OpenAI } from 'openai';
import { NextRequest, NextResponse } from 'next/server';

// Initialize the OpenAI client with the API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    // Parse the request body to get the text
    const { text } = await request.json();

    // Validate input
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    // Call the OpenAI API to convert text to speech
    const response = await openai.audio.speech.create({
      model: "tts-1",
      voice: "shimmer", // Use the shimmer voice as specified
      input: text,
      speed: 1.0,
      response_format: "mp3",
    });

    // Convert the response to an ArrayBuffer
    const buffer = await response.arrayBuffer();

    // Return the audio as a response with the appropriate content type
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': buffer.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error('Error generating speech:', error);
    
    // Return an error response
    return NextResponse.json(
      { error: 'Failed to generate speech' },
      { status: 500 }
    );
  }
} 