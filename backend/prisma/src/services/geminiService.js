// Google Gemini text-analysis placeholders. These are wired so the analysis
// endpoint works even without an API key, but they are NOT used by the
// current admin/reporting flows — they exist for future risk-scoring work.
//
// To enable real analysis: set GEMINI_API_KEY in backend/.env and uncomment
// the @google/generative-ai call below.

export async function analyzeReport(report) {
  // If a real key is configured, call Gemini here and return a structured
  // { riskScore, reasons, recommendation } object.
  void report
  return {
    riskScore: 0,
    reasons: [],
    recommendation: null,
    note: "Gemini analysis not configured",
  }
}
