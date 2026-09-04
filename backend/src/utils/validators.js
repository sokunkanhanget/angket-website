export function emailRule(value) {
  if (!value || !/^\S+@\S+\.\S+$/.test(value)) {
    return { valid: false, message: "A valid email is required" }
  }
  return { valid: true }
}

export function passwordRule(value) {
  if (!value || String(value).length < 6) {
    return { valid: false, message: "Password must be at least 6 characters" }
  }
  return { valid: true }
}

export function phoneRule(value) {
  if (!value || !/^[0-9+\-\s]{7,20}$/.test(value)) {
    return { valid: false, message: "A valid phone number is required" }
  }
  return { valid: true }
}

export function requiredRule(value, message = "This field is required") {
  if (value === undefined || value === null || String(value).trim() === "") {
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
