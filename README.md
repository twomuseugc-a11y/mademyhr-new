This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Notes (Madebyhr)

### Where To Update Prices

- Update prices in [lib/products.ts](lib/products.ts) by editing each product's `price` value.
- Product cards on [app/(shop)/product/page.tsx](app/(shop)/product/page.tsx) read directly from [lib/products.ts](lib/products.ts).
- Product detail pages under [app/(shop)/product/[product]/page.tsx](app/(shop)/product/[product]/page.tsx) also use the same data source.

### Source Of Truth

- Use only this root folder as the active project: [mademyhr-new](.).
- If a nested [mademyhr-new](mademyhr-new) folder appears, treat it as legacy/duplicate and ignore it.

### Clean Structure

- Main app pages: [app](app)
- Product data and prices: [lib/products.ts](lib/products.ts)
- APIs: [app/api](app/api)
- DB models: [models](models)
- Public assets/images: [public](public)

### Quick Edit Map

- Update product prices: [lib/products.ts](lib/products.ts)
- Update homepage: [app/(shop)/page.tsx](app/(shop)/page.tsx)
- Update about story: [app/about/page.tsx](app/about/page.tsx)
- Update admin orders UI: [app/admin/orders/page.tsx](app/admin/orders/page.tsx)

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

You can start editing the page by modifying `app/(shop)/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
