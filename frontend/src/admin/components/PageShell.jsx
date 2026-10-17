export default function PageShell({ title, children }) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <>
      <header className="flex items-center justify-between px-5 py-[22px] bg-white border-b border-admin-border md:pl-5 pl-[60px]">
        <h1 className="text-[22px] font-bold text-admin-slate m-0">{title}</h1>
        <span className="text-[13px] text-admin-slate-600 font-[IBM_Plex_Mono,monospace] font-variant-numeric-tabular-nums">{today}</span>
      </header>
      <main className="p-5 flex flex-col gap-5">{children}</main>
    </>
  )
}
