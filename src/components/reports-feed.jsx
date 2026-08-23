import { AlertTriangle, MapPin, Banknote, ShieldAlert } from "lucide-react"
import { Badge } from "@/components/ui/badge"

function timeAgo(date) {
  const diff = Date.now() - new Date(date).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return new Date(date).toLocaleDateString()
}

export function ReportsFeed({ reports }) {
  return (
    <section id="feed" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Community feed</p>
          <h2 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Recently reported scams
          </h2>
        </div>
        <p className="text-sm text-muted-foreground">
          {reports.length} report{reports.length === 1 ? "" : "s"} shared by the community
        </p>
      </div>

      {reports.length === 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShieldAlert className="h-6 w-6" />
          </span>
          <p className="mt-4 font-display text-lg font-semibold text-foreground">No reports yet</p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Be the first to warn the community. Submit a report above and it will appear here.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((report) => (
            <article
              key={report.id}
              className="flex flex-col rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex items-center justify-between gap-2">
                <Badge variant="secondary" className="gap-1 bg-primary/10 text-primary hover:bg-primary/10">
                  <AlertTriangle className="h-3 w-3" />
                  {report.scamType}
                </Badge>
                <span className="text-xs text-muted-foreground">{timeAgo(report.createdAt)}</span>
              </div>

              <h3 className="mt-3 font-display text-base font-bold leading-snug text-foreground">
                {report.title}
              </h3>
              <p className="mt-2 line-clamp-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                {report.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-border pt-3 text-xs text-muted-foreground">
                {report.platform && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" /> {report.platform}
                  </span>
                )}
                {report.amountLost && (
                  <span className="flex items-center gap-1 font-medium text-destructive">
                    <Banknote className="h-3.5 w-3.5" /> {report.amountLost}
                  </span>
                )}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                — {report.reporterName ? report.reporterName : "Anonymous"}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
