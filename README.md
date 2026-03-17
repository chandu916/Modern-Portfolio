This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on GitHub Pages

This project is configured for static export and automatic deployment to GitHub Pages.

Expected production URL:

`https://chandu916.github.io/Modern-Portfolio/`

Deployment is handled by:

- `.github/workflows/deploy-pages.yml`
- `next.config.ts` with GitHub Pages base path and static export enabled

If Pages is not already enabled in repository settings, set the source to `GitHub Actions` once.

## Contact Form Email Setup

The Contact Us form is configured for GitHub Pages and submits through FormSubmit, which forwards inquiries to `cchandhan021@gmail.com`.

Important note:

- The first submission to the form will trigger a FormSubmit activation email. You must confirm that email once before notifications start arriving normally.

After activation, inquiries from the deployed site will be forwarded to your Gmail inbox without needing a server.
