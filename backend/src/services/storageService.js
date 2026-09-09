import supabase from "./supabaseClient.js"

const SCREENSHOT_BUCKET = "screenshots"
const AVATAR_BUCKET = "avatars"
const ALLOWED_MIME_TYPES = ["image/png", "image/jpeg", "image/webp"]
const MAX_FILE_BYTES = 5 * 1024 * 1024

function validateImageFile(file) {
  if (!file) {
    const err = new Error("No image provided")
    err.status = 400
    throw err
  }
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    const err = new Error("Unsupported image type. Allowed: PNG, JPEG, WEBP")
    err.status = 400
    throw err
  }
  if (file.size > MAX_FILE_BYTES) {
    const err = new Error("Image must be under 5MB")
    err.status = 400
    throw err
  }
}

async function uploadToBucket(file, bucket, folder) {
  validateImageFile(file)

  const ext = file.mimetype.split("/")[1] || "png"
  const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`
  const path = folder ? `${folder}/${name}` : name

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file.buffer, { contentType: file.mimetype })

  if (error) {
    const err = new Error(`Failed to upload image: ${error.message}`)
    err.status = 502
    throw err
  }

  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path)
  return urlData.publicUrl
}

export async function uploadScreenshot(file, reportId) {
  return uploadToBucket(file, SCREENSHOT_BUCKET, reportId)
}

export async function uploadScreenshots(files, reportId) {
  return Promise.all((files || []).map((file) => uploadScreenshot(file, reportId)))
}

export async function uploadAvatar(file, userId) {
  return uploadToBucket(file, AVATAR_BUCKET, userId)
}

export async function deleteAvatar(userId) {
  const { data: listData } = await supabase.storage
    .from(AVATAR_BUCKET)
    .list(userId, { limit: 100, sortBy: { column: "updated_at", order: "desc" } })

  const names = (listData || []).filter((f) => !f.name.endsWith("/")).map((f) => `${userId}/${f.name}`)
  if (names.length === 0) return 0

  const { error } = await supabase.storage.from(AVATAR_BUCKET).remove(names)
  if (error) return 0
  return names.length
}
