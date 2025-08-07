Property Ireland — property listings for rent and sale in Ireland, built with Next.js App Router, Prisma, and NextAuth.

## Getting Started

Local development

1. Install dependencies and generate Prisma client:

```
npm install
npx prisma generate
```

2. Create `.env`:

```
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="change-me"
NEXTAUTH_URL="http://localhost:3000"
```

3. Apply migrations and start dev server:

```
npx prisma migrate dev --name init
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

Auth

- Email/password via credentials provider (MVP). Social providers can be added later.

Legal

- Privacy Policy: `/privacy-policy`
- Data deletion: `/data-deletion` (submits request)
- Terms: `/terms`
