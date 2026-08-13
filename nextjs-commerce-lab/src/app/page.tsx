import Link from "next/link";

const stack = [
  ["Next.js + TypeScript", "Routing, Server Components, Server Actions and strict contracts"],
  ["RHF + Zod", "Client form state plus runtime validation at the server boundary"],
  ["Prisma + PostgreSQL", "Type-safe persistence, relations, migrations and transactions"],
  ["Auth.js", "Identity, protected routes and resource-level authorization"],
  ["Vitest + Playwright", "Fast rule tests and browser-level critical-flow tests"],
] as const;

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <section className="relative border-b border-slate-900/10 px-5 py-6 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-amber-400 font-black">C</span>
            <div><p className="font-semibold">Commerce Practice Lab</p><p className="text-xs text-slate-500">Learn through one complete data flow</p></div>
          </div>
          <Link className="button-secondary" href="/sign-in">Open dashboard</Link>
        </div>
      </section>

      <section className="relative px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="pointer-events-none absolute -right-32 top-5 size-[460px] rounded-full bg-amber-300/40 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <p className="eyebrow">Full-stack practice project</p>
            <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl">Understand the stack by following the data.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">Build products and quantity-break offers while tracing every decision from the browser to PostgreSQL and back to the refreshed interface.</p>
            <div className="mt-9 flex flex-wrap gap-3"><Link className="button-primary" href="/sign-in">Start the workflow</Link><a className="button-secondary" href="#architecture">Explore architecture</a></div>
          </div>

          <div className="rounded-[2rem] border border-slate-900/10 bg-slate-950 p-5 shadow-2xl shadow-slate-900/15 sm:p-7">
            <div className="flex items-center justify-between border-b border-white/10 pb-5"><div><p className="text-sm text-slate-400">Runtime trace</p><p className="mt-1 font-semibold text-white">Create quantity offer</p></div><span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-medium text-emerald-300">Ready</span></div>
            <ol className="mt-5 space-y-3">
              {["React Hook Form captures intent", "Zod validates untrusted input", "Auth.js proves identity", "Server Action runs the use case", "Prisma writes to PostgreSQL", "revalidatePath refreshes server data"].map((step, index) => (
                <li className="flex items-center gap-4 rounded-xl border border-white/8 bg-white/[.04] p-3.5 text-sm text-slate-200" key={step}><span className="grid size-7 shrink-0 place-items-center rounded-lg bg-amber-300 font-mono text-xs font-bold text-slate-950">{String(index + 1).padStart(2, "0")}</span>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-900/10 bg-white/55 px-5 py-16 sm:px-8 lg:px-12" id="architecture">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl"><p className="eyebrow">Tool responsibility map</p><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Every dependency owns one boundary.</h2></div>
          <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-slate-900/10 bg-slate-900/10 md:grid-cols-2 lg:grid-cols-5">
            {stack.map(([name, purpose], index) => <article className="bg-[#faf8f3] p-6" key={name}><p className="font-mono text-xs text-amber-700">LAYER {index + 1}</p><h3 className="mt-5 text-lg font-semibold">{name}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{purpose}</p></article>)}
          </div>
        </div>
      </section>
    </main>
  );
}
