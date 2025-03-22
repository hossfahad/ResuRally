# Deploying Interview Rally on Vercel

This guide explains how to properly deploy the Interview Rally application, including both the Next.js frontend and the Manifest backend service.

## Architecture Overview

Interview Rally consists of two main components:

1. **Next.js Frontend**: The user interface and application logic
2. **Manifest Backend**: A data storage and API service running on port 1111

When deploying to production, you'll need to ensure both components are accessible to each other.

## Deployment Steps

### Step 1: Deploy the Manifest Backend

The Manifest backend needs to be deployed to a service that can run Node.js applications. Options include:

- **Railway** (Recommended)
- **Heroku**
- **DigitalOcean App Platform**
- **AWS Elastic Beanstalk**
- **Google Cloud Run**

#### Railway Deployment (Recommended)

1. Create a new project on [Railway](https://railway.app/)
2. Connect your GitHub repository
3. Set up the following environment variables:
   - `TOKEN_SECRET_KEY`: Your token secret key (already in your `.env` file)
   - Any other environment variables specific to your Manifest service
4. Configure the deployment command: `npm run deploy:manifest`
5. Note the deployed URL (e.g., `https://interview-rally-backend-production.up.railway.app`)

### Step 2: Deploy the Next.js Frontend on Vercel

1. Push your code to GitHub
2. Create a new project on [Vercel](https://vercel.com/)
3. Connect your GitHub repository
4. Configure the following environment variables:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `MANIFEST_URL`: The URL of your deployed Manifest backend (from Step 1)
   - `TOKEN_SECRET_KEY`: Your token secret key
5. Deploy the project
6. Vercel will automatically use your `vercel-build` script from package.json

### Step 3: Verify the Deployment

After deployment, you should verify that:

1. The Next.js frontend is accessible via your Vercel URL
2. The API rewrites are correctly routing to your Manifest backend
3. All functionality works as expected in the production environment

## Troubleshooting

### Common Issues

1. **API Connection Issues**: If your frontend cannot connect to the backend, check:
   - The `MANIFEST_URL` environment variable is correctly set
   - The backend service is running and accessible
   - CORS settings are properly configured

2. **Database Errors**: If you encounter database-related errors:
   - Ensure your Manifest backend is properly initialized
   - Check if you need to run database migrations or seeds

3. **Environment Variable Problems**:
   - Verify all required environment variables are set in both services
   - Double-check for typos or formatting issues in environment variable values

### Testing Backend Connection

You can verify the connection to your backend by accessing:

- `https://your-vercel-domain.vercel.app/api/health-check`

This should connect to your Manifest backend's health check endpoint and return a status.

## Scaling Considerations

As your application grows, consider:

1. **Database Scaling**: Monitor the performance of your Manifest backend
2. **Rate Limiting**: Implement rate limiting for API endpoints
3. **Caching**: Add caching mechanisms for frequently accessed data
4. **Analytics**: Set up monitoring to track application performance

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app/)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)

For any specific deployment issues, refer to the GitHub repository or contact the development team. 