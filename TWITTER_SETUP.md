# Twitter Integration Setup

This project includes a Twitter posting functionality that allows you to share articles directly from the article pages. The feature is only available in development mode for security reasons.

## Prerequisites

1. A Twitter Developer Account
2. A Twitter App with OAuth 1.0a permissions

## Setup Instructions

### 1. Create a Twitter Developer Account

1. Go to [https://developer.twitter.com/](https://developer.twitter.com/)
2. Sign in with your Twitter account
3. Apply for a developer account if you don't have one

### 2. Create a Twitter App

1. Once approved, go to the [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
2. Click "Create App" or "New Project"
3. Fill in the required information:
   - App name: Choose a name for your app
   - App description: Describe your personal website
   - Website URL: Your website URL (can be localhost for development)
   - Callback URL: Not required for this implementation

### 3. Get Your API Credentials

1. In your app dashboard, go to "Keys and Tokens"
2. Generate the following credentials:
   - **API Key** (Consumer Key)
   - **API Secret Key** (Consumer Secret)
   - **Access Token**
   - **Access Token Secret**

### 4. Configure Environment Variables

1. Copy `env.example` to `.env.local`:
   ```bash
   cp env.example .env.local
   ```

2. Add your Twitter credentials to `.env.local`:
   ```
   TWITTER_APP_KEY=your_api_key_here
   TWITTER_APP_SECRET=your_api_secret_key_here
   TWITTER_ACCESS_TOKEN=your_access_token_here
   TWITTER_ACCESS_SECRET=your_access_token_secret_here
   ```

### 5. Set Permissions

Make sure your Twitter app has **Read and Write** permissions:
1. Go to your app settings in the Twitter Developer Portal
2. Navigate to "App permissions"
3. Select "Read and Write" 
4. Save changes

**Important**: You may need to regenerate your access tokens after changing permissions.

## How to Use

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to any article page (e.g., `/articles/your-article-slug`)

3. You'll see a blue Twitter button in the top-right area of the article (only in development mode)

4. Click the button to open the Twitter posting dialog

5. The dialog will pre-populate with:
   - Article title
   - Article description  
   - Link to the article

6. You can:
   - Edit the tweet text (280 character limit)
   - Upload an image or video (optional, up to 5MB)
   - Post the tweet

## Features

- ✅ Pre-populated tweet with article details
- ✅ Character count with validation
- ✅ Media upload support (images/videos up to 5MB)
- ✅ Real-time posting status
- ✅ Success/error feedback
- ✅ Development-only visibility
- ✅ Responsive design

## Security Notes

- The Twitter posting feature is **only available in development mode**
- API credentials are server-side only and never exposed to the client
- The feature will not appear in production builds

## Troubleshooting

### "Failed to post tweet" Error
- Check that your API credentials are correct
- Ensure your Twitter app has Read and Write permissions
- Verify that your access tokens are generated after setting permissions

### Button Not Visible
- Make sure you're running in development mode (`npm run dev`)
- The button is hidden in production for security

### Media Upload Issues
- Check file size (must be under 5MB)
- Ensure file is an image or video format
- Verify your Twitter app permissions include media upload

### Character Limit Issues
- Twitter has a 280 character limit
- The form will prevent posting if you exceed this limit
- Consider shortening your message or using Twitter threads for longer content
