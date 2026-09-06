import supabase from "./supabaseClient.js"

const BUCKET = "screenshots"

export async function ensureBucket() {
  const { error } = await supabase.storage.getBucket(BUCKET)
  if (!error) return
  if (error.message?.toLowerCase().includes("not found") || error.statusCode === 404) {
    const created = await supabase.storage.createBucket(BUCKET, { public: true })
    if (created.error) throw created.error
    return
  }
  throw error
}

export async function uploadScreenshot(file) {
  const allow = ["image/png", "image/jpeg", "image/webp"]
  if (!allow.includes(file.mimetype)) {
    const err = new Error("Unsupported image type")
    err.status = 400
    throw err
  }
  const maxBytes = 5 * 1024 * 1024
  if (file.size > maxBytes) {
    const err = new Error("Image must be under 5MB")
    err.status = 400
    throw err
  }

  await ensureBucket()

  const ext = file.mimetype.split("/")[1] || "png"
  const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(name, file.buffer, { contentType: file.mimetype })

  if (error) throw error

  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(data.path)
  return urlData.publicUrl
}

export async function parseScreenshot(formData) {
  const file = formData.get("screenshot")
  if (!file || typeof file === "string") return null
  return uploadScreenshot(file)
}
