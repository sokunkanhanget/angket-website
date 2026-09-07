import supabase from "./supabaseClient.js"

const SCREENSHOT_BUCKET = "screenshots"
const AVATAR_BUCKET = "avatars"

async function ensureBucket(bucket) {
  const { error } = await supabase.storage.getBucket(bucket)
  if (!error) return
  if (error.message?.toLowerCase().includes("not found") || error.statusCode === 404) {
    const created = await supabase.storage.createBucket(bucket, { public: true })
    if (created.error) {
      console.error("Failed to create bucket:", created.error.message)
      throw new Error(`Storage bucket "${bucket}" does not exist and could not be created. Please create it manually in your Supabase dashboard under Storage.`)
    }
    return
  }
  throw error
}

export async function uploadImage(file, bucket) {
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

  await ensureBucket(bucket)

  const ext = file.mimetype.split("/")[1] || "png"
  const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(name, file.buffer, { contentType: file.mimetype })

  if (error) throw error

  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path)
  return urlData.publicUrl
}

export async function uploadScreenshot(file) {
  return uploadImage(file, SCREENSHOT_BUCKET)
}

export async function uploadAvatar(file) {
  return uploadImage(file, AVATAR_BUCKET)
}

export async function parseScreenshot(formData) {
  const file = formData.get("screenshot")
  if (!file || typeof file === "string") return null
  return uploadScreenshot(file)
}
