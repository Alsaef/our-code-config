# Next.js App Router Authentication with NextAuth.js

This project implements **NextAuth.js** for authentication in a **Next.js (App Router) + TypeScript** application.

## 🚀 Features

- Next.js App Router
- Authentication with NextAuth.js
- GitHub OAuth Provider
- Protected Routes
- Middleware for route protection
- Session management with `getServerSession`

---

## 📦 Installation

Clone the repository and install dependencies:

```sh
npm install next-auth
```

\
\
pnpm install

---

## ⚙️ Configuration

### 1️⃣ Set Up Environment Variables

Create a `.env.local` file and add:

```env
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
NEXTAUTH_SECRET=your_random_secret_key
NEXTAUTH_URL=http://localhost:3000
```

Generate a secret key:

```sh
openssl rand -base64 32
```

---

### 2️⃣ Configure Authentication

#### **API Route for Authentication**

Create an authentication route in the App Router.

📂 `app/api/auth/[...nextauth]/route.ts`

```ts
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

#### **Define Auth Options**

Create a configuration file for authentication settings.

📂 `lib/auth.ts`

```ts
import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
```

---

### 3️⃣ Use Authentication in the App

#### **Session Provider**

Wrap your app with `SessionProvider` in `app/layout.tsx`:

```tsx
"use client";

import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
```

#### **Sign In & Sign Out Button**

Create an authentication button.

📂 `components/AuthButton.tsx`

```tsx
"use client";

import { signIn, signOut, useSession } from "next-auth/react";

const AuthButton = () => {
  const { data: session } = useSession();

  return session ? (
    <div>
      <p>Welcome, {session.user?.name}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  ) : (
    <button onClick={() => signIn("github")}>Sign In with GitHub</button>
  );
};

export default AuthButton;
```

---

### 4️⃣ Protect Pages with `getServerSession`

To restrict access to specific pages:

📂 `app/protected/page.tsx`

```tsx
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>Access Denied. Please sign in.</p>;
  }

  return <p>Welcome, {session.user?.name}!</p>;
}
```

---

### 5️⃣ Protect Routes Using Middleware

To globally protect certain routes:

📂 `middleware.ts`

```ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = { matcher: ["/dashboard", "/profile"] };
```

---

## 🏃‍♂️ Run the App

Start the development server:

```sh
pnpm dev
```

Now visit `http://localhost:3000` and test authentication! 🎉

---

## 📌 Notes

- Replace `your_github_client_id` and `your_github_client_secret` with your actual credentials.
- Update the protected routes in `middleware.ts` as needed.

---

## 📜 License

This project is open-source under the MIT License.

