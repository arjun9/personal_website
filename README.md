# Spotlight

Spotlight is a [Tailwind UI](https://tailwindui.com) site template built using [Tailwind CSS](https://tailwindcss.com) and [Next.js](https://nextjs.org).

## Getting started

To get started with this template, first install the npm dependencies:

```bash
npm install
```

Next, create a `.env.local` file in the root of your project and set the `NEXT_PUBLIC_SITE_URL` variable to your site's public URL:

```
NEXT_PUBLIC_SITE_URL=https://example.com
```

Next, run the development server:

```bash
npm run dev
```

Finally, open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## Google Analytics & Search Console Setup

This template includes built-in Google Analytics 4 (GA4) and Google Search Console integration. To set it up:

1. **Set up Google Analytics 4**: Create a property in [Google Analytics](https://analytics.google.com/) and get your Measurement ID (starts with "G-")

2. **Set up Google Search Console**: Add your website to [Google Search Console](https://search.google.com/search-console) and get your verification code

3. **Configure environment variables**: Add these to your `.env.local` file:
   ```bash
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_verification_code_here
   ```

4. **Restart your development server**

The analytics will automatically track all pages, including future articles and content you create. See [GOOGLE_ANALYTICS_SETUP.md](./GOOGLE_ANALYTICS_SETUP.md) for detailed setup instructions and [ANALYTICS_EXAMPLES.md](./ANALYTICS_EXAMPLES.md) for usage examples.

## Customizing

You can start editing this template by modifying the files in the `/src` folder. The site will auto-update as you edit these files.

## License

This site template is a commercial product and is licensed under the [Tailwind UI license](https://tailwindui.com/license).

## Learn more

To learn more about the technologies used in this site template, see the following resources:

- [Tailwind CSS](https://tailwindcss.com/docs) - the official Tailwind CSS documentation
- [Next.js](https://nextjs.org/docs) - the official Next.js documentation
- [Headless UI](https://headlessui.dev) - the official Headless UI documentation
- [MDX](https://mdxjs.com) - the MDX documentation
