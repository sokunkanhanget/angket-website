const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

export function emailRule(value) {
  const v = typeof value === "string" ? value.trim() : ""
  if (!v || v.length > 254 || !EMAIL_RE.test(v)) {
    return { valid: false, message: "A valid email is required" }
  }
  return { valid: true }
}

export function passwordRule(value, options = {}) {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumber = true,
    requireSpecial = true,
  } = options

  const v = String(value ?? "")

  if (!v) return { valid: false, message: "Password is required" }
  if (v.length < minLength) {
    return { valid: false, message: `Password must be at least ${minLength} characters` }
  }
  if (requireUppercase && !/[A-Z]/.test(v)) {
    return { valid: false, message: "Password must include an uppercase letter" }
  }
  if (requireLowercase && !/[a-z]/.test(v)) {
    return { valid: false, message: "Password must include a lowercase letter" }
  }
  if (requireNumber && !/[0-9]/.test(v)) {
    return { valid: false, message: "Password must include a number" }
  }
  if (requireSpecial && !/[^A-Za-z0-9]/.test(v)) {
    return { valid: false, message: "Password must include a special character" }
  }
  return { valid: true }
}

export function phoneRule(value) {
  const v = typeof value === "string" ? value.trim() : ""
  if (!v) {
    return { valid: false, message: "A valid phone number is required" }
  }

  if (!/^\+?[0-9\s().-]+$/.test(v)) {
    return { valid: false, message: "A valid phone number is required" }
  }

  const isIntl = v.startsWith("+")
  const digits = v.replace(/\D/g, "")

  if (isIntl) {
    if (!/^855[0-9]{8,9}$/.test(digits)) {
      return { valid: false, message: "A valid phone number is required (e.g. 012 345 678)" }
    }
  } else {
    if (!/^0[0-9]{8,9}$/.test(digits)) {
      return { valid: false, message: "A valid phone number is required (e.g. 012 345 678)" }
    }
  }

  return { valid: true }
}
export function requiredRule(value, message = "This field is required") {
  if (value === undefined || value === null || String(value).trim() === "") {
    return { valid: false, message }
  }
  return { valid: true }
}

export function minLengthRule(value, min, message) {
  const v = String(value ?? "")
  if (v.trim().length < min) {
    return { valid: false, message: message ?? `Must be at least ${min} characters` }
  }
  return { valid: true }
}

export function maxLengthRule(value, max, message) {
  const v = String(value ?? "")
  if (v.trim().length > max) {
    return { valid: false, message: message ?? `Must be no more than ${max} characters` }
  }
  return { valid: true }
}

export function matchRule(value, otherValue, message = "Values do not match") {
  if (value !== otherValue) {
    return { valid: false, message }
  }
  return { valid: true }
}

export function validate(rules) {
  const errors = {}
  for (const [field, checks] of Object.entries(rules)) {
    for (const check of Array.isArray(checks) ? checks : [checks]) {
      const result = check()
      if (!result.valid) {
        errors[field] = result.message
        break
      }
    }
  }
  return { valid: Object.keys(errors).length === 0, errors }
}