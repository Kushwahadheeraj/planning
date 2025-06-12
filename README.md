#videolink:https://drive.google.com/file/d/1veSednUmsrh8sWF6nHQD0eEQFcxSi75i/view?usp=sharing
#Admin: userid: A-00001, password:123456
#user/customer : C-00001, password:123456
#Super_Admin: S-00001, password:123456

frontend livelink:https://nextjs-front-end-event-management-and-planning-fccq4pt0z.vercel.app
backend livelink:https://event-management-and-planning-955nyypit.vercel.app/api/v1

frontend env: NEXTAUTH_SECRET=secret
JWT_SECRET=backend-for-event

NEXT_PUBLIC_BACKEND_URL=http://localhost:3005/api/v1

backend env: PORT=3005
BACKEND_URL=http://localhost:3005/api/v1
NODE_ENV=development
FRONTEND_URL=https://localhost:3000
DATABASE_URL=mongodb+srv://event-management:LuIxsoyOHin6Gdar@cluster0.d6f547g.mongodb.net/event-management?retryWrites=true&w=majority
BCRYPT_SALT_ROUNDS=12
JWT_SECRET="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJBLTAwMDAxIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzA0NjI2MDk0LCJleHAiOjE3MDU0OTAwOTR9.M00iBu2riHiHYBGBPFdtZbU6pAvYVo9fk0I1cFXleQg"
JWT_REFRESH_SECRET="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJBLTAwMDAxIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzA0NjI2MDk0LCJleHAiOjE3MDcyMTgwOTR9.o1aVvZjIaDNMcEmHTNMON_mgu4bfT4Xd5U-OAxm4huE"
JWT_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=365d



















































This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
