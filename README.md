Property Ireland — property listings for rent and sale in Ireland, built with Next.js App Router and Supabase (Auth, Postgres, Edge Functions).

## Getting Started

Local development

1. Install dependencies:

```
npm install
```

2. Create `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL="https://YOUR_PROJECT_ID.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
```

3. Start dev server:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

Auth

- Supabase Auth (email/password, Google, Facebook). Configure providers in Supabase dashboard.

Legal

- Privacy Policy: `/privacy-policy`
- Data deletion: `/data-deletion` (submits request)
- Terms: `/terms`
