export function IconShield({ check = false, ...props }) {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M12 22s8-3.6 8-10V5l-8-3-8 3v7c0 6.4 8 10 8 10z" />
      {check && <path d="m9 11.5 2 2 4-4.5" />}
    </svg>
  )
}

export function IconSend(props) {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  )
}

export function IconWarning(props) {
  return (
    <svg className="icon" viewBox="0 0 24 24" {...props}>
      <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  )
}

export function IconInfo(props) {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}

export function IconSearch(props) {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

export function IconGlobe(props) {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

export function IconCheck(props) {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export function IconLock(props) {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect width="18" height="11" x="3" y="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

export function IconMenu(props) {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  )
}

export function IconClose(props) {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
