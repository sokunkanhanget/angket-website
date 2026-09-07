const ADJECTIVES = [
  "Swift", "Brave", "Calm", "Bold", "Bright", "Clever", "Coy", "Deep",
  "Eager", "Gentle", "Golden", "Happy", "Hidden", "Kind", "Lively",
  "Mellow", "Mighty", "Misty", "Quiet", "Sage", "Shy", "Silent", "Sly",
  "Smart", "Soaring", "Steady", "Still", "Sunny", "Swift", "Wise",
]

const NOUNS = [
  "Fox", "Otter", "Falcon", "Lynx", "Owl", "Hawk", "Wolf", "Raven",
  "Deer", "Badger", "Heron", "Koi", "Lark", "Mink", "Ocelot", "Puma",
  "Robin", "Skunk", "Swan", "Tiger", "Viper", "Wren", "Yak", "Zebra",
]

export function generateAlias() {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)]
  return `${adj} ${noun}`
}

export function generateAvatarSeed() {
  const chars = "0123456789abcdef"
  let seed = ""
  for (let i = 0; i < 8; i++) {
    seed += chars[Math.floor(Math.random() * chars.length)]
  }
  return seed
}
