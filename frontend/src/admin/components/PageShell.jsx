export default function PageShell({ title, children }) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <>
      <header className="topbar">
        <h1 className="page-title">{title}</h1>
        <span className="today-date mono">{today}</span>
      </header>
      <main className="admin-content">{children}</main>
    </>
  )
}
