# Interview Rally

Interview Rally is a Next.js application that generates tailored interview questions based on job descriptions. Simply paste a job description, and the application will generate 10 relevant interview questions to help you prepare.

## Features

- Job description input form with validation
- Integration with OpenAI API to generate tailored interview questions
- Responsive design that works well on mobile and desktop
- Beautiful UI using Tailwind CSS and Shadcn UI components

## Prerequisites

- Node.js 16.8 or later
- An OpenAI API key

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/yourusername/interview-rally.git
cd interview-rally
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:

```
OPENAI_API_KEY=your-openai-api-key-here
```

4. Start the development server

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## How to Use

1. Paste a job description into the text area.
2. Click "Generate Interview Questions".
3. Review the generated questions.
4. Click "Generate New Questions" to start over with a new job description.

## Deployment

This application can be easily deployed to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Finterview-rally)

Make sure to add your OpenAI API key as an environment variable in your Vercel project settings.

## Built With

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [OpenAI API](https://openai.com/) - For generating questions
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Shadcn UI](https://ui.shadcn.com/) - UI components
- [React Hook Form](https://react-hook-form.com/) - Form validation
- [Zod](https://zod.dev/) - Schema validation

## License

This project is licensed under the MIT License - see the LICENSE file for details.
