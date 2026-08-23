export async function getReports() {
  const res = await fetch("/api/reports")
  if (!res.ok) throw new Error(`Failed to load reports (${res.status})`)
  return res.json()
}

export async function submitReport(formData) {
  try {
    const res = await fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.get("title"),
        scamType: formData.get("scamType"),
        description: formData.get("description"),
        platform: formData.get("platform"),
        scammerContact: formData.get("scammerContact"),
        amountLost: formData.get("amountLost"),
        reporterName: formData.get("reporterName"),
      }),
    })

    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
      return { ok: false, error: data.error || "Something went wrong. Please try again." }
    }

    return { ok: true, report: data }
  } catch {
    return { ok: false, error: "Network error. Please check your connection and try again." }
  }
}
