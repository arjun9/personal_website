# Google Analytics & Search Console Setup

This guide will help you set up Google Analytics 4 (GA4) and Google Search Console for your personal website.

## Prerequisites

1. A Google account
2. Access to your website's domain
3. Ability to add environment variables

## Step 1: Set up Google Analytics 4

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Start measuring"
3. Create a new property for your website
4. Choose "Web" as the platform
5. Enter your website details:
   - Property name: Your website name
   - Reporting time zone: Your timezone
   - Currency: Your preferred currency
6. Click "Next" and complete the setup
7. Copy your **Measurement ID** (starts with "G-")

## Step 2: Set up Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Start now"
3. Enter your website URL
4. Choose "HTML tag" as the verification method
5. Copy the verification code (meta tag content)

## Step 3: Configure Environment Variables

1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add the following variables:

```bash
# Google Analytics 4 Measurement ID
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Search Console Verification Code
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_verification_code_here

# Your site URL (if not already set)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

3. Replace the placeholder values with your actual codes
4. Restart your development server

## Step 4: Verify Installation

1. Open your website in a browser
2. Open Developer Tools (F12)
3. Go to the Network tab
4. Refresh the page
5. Look for requests to `googletagmanager.com` and `google-analytics.com`
6. Check the Console tab for any Google Analytics related messages

## Step 5: Test Page View Tracking

1. Navigate to different pages on your website
2. Check your Google Analytics Real-Time reports
3. Verify that page views are being recorded

## Features

### Automatic Page View Tracking
- Tracks all page views automatically
- Works with dynamic routes (articles, projects, etc.)
- Handles client-side navigation

### Future-Proof
- Automatically covers new articles and pages
- No need to manually add tracking to new content
- Built into the root layout

### Privacy Compliant
- Uses Next.js Script component for optimal loading
- Respects user preferences
- Follows best practices for analytics implementation

## Troubleshooting

### Analytics not working?
1. Check that your Measurement ID is correct
2. Verify the environment variable is loaded
3. Check browser console for errors
4. Ensure your website is accessible to Google's servers

### Page views not tracking?
1. Verify the gtag function is loaded
2. Check that `send_page_view: false` is set in the initial config
3. Ensure the useEffect hook is running on route changes

### Search Console verification failed?
1. Double-check the verification code
2. Ensure the meta tag is being rendered
3. Wait a few minutes for Google to verify

## Advanced Configuration

### Custom Events
You can add custom events by calling `window.gtag('event', 'event_name', { parameters })` anywhere in your components.

### Enhanced Ecommerce
For ecommerce tracking, you can extend the gtag configuration with additional parameters.

### Debug Mode
During development, you can enable debug mode by adding `debug_mode: true` to your gtag config.

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify your Google Analytics property settings
3. Ensure your domain is properly configured
4. Check that environment variables are loaded correctly

## Security Notes

- Never commit your `.env.local` file to version control
- The `NEXT_PUBLIC_` prefix makes these variables available to the client
- Consider implementing consent management for GDPR compliance
- Monitor your analytics data for any unusual activity
