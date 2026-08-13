import type { Metadata } from "next";
import Link from "next/link";
import { SignInForm } from "@/components/auth/sign-in-form";

export const metadata: Metadata = { title: "Sign in" };

export default function SignInPage() {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <section className="flex items-center justify-center px-5 py-14 sm:px-8">
        <div className="w-full max-w-md">
          <Link className="text-sm font-medium text-slate-500 hover:text-slate-950" href="/">← Back to overview</Link>
          <p className="eyebrow mt-12">Authentication boundary</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">Sign in to the lab</h1>
          <p className="mt-4 leading-7 text-slate-600">The form validates in the browser, then Auth.js verifies the password against the PostgreSQL user record.</p>
          <div className="mt-8"><SignInForm /></div>
          <p className="mt-6 rounded-xl border border-amber-300 bg-amber-100/60 p-4 text-sm leading-6 text-amber-950">Seed login: <strong>admin@example.com</strong> / <strong>Practice123!</strong></p>
        </div>
      </section>
      <section className="hidden bg-slate-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-amber-400 font-black text-slate-950">C</span><span className="font-semibold">Commerce Practice Lab</span></div>
        <div><p className="font-mono text-sm text-amber-300">REQUEST CHECKPOINT</p><p className="mt-5 max-w-xl text-4xl font-medium leading-tight tracking-tight">Authentication answers “who are you?” Authorization still decides “may you create this product?”</p></div>
        <p className="text-sm text-slate-400">Credentials are for local practice. Prefer OAuth, magic links or passkeys in a production product.</p>
      </section>
    </main>
  );
}
