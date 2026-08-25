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

export function IconMail(props) {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  )
}

export function IconLink(props) {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}

export function IconChart(props) {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M3 3v18h18" />
      <rect x="7" y="12" width="3" height="6" rx="0.5" />
      <rect x="12" y="8" width="3" height="10" rx="0.5" />
      <rect x="17" y="4" width="3" height="14" rx="0.5" />
    </svg>
  )
}

export function IconBrain(props) {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44A2.5 2.5 0 0 1 4.5 17.5 2.5 2.5 0 0 1 3 13a2.5 2.5 0 0 1 .05-4A2.5 2.5 0 0 1 4.5 4.5 2.5 2.5 0 0 1 7 3a2.5 2.5 0 0 1 2.5-1z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.54-2.44 2.5 2.5 0 0 0 1.5-4.5 2.5 2.5 0 0 0-.05-4A2.5 2.5 0 0 0 19.5 4.5 2.5 2.5 0 0 0 17 3a2.5 2.5 0 0 0-2.5-1z" />
    </svg>
  )
}

export function IconBot(props) {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="4" y="8" width="16" height="12" rx="2" />
      <path d="M12 8V4" />
      <circle cx="12" cy="3" r="1" />
      <path d="M9 13v1" />
      <path d="M15 13v1" />
      <path d="M9 17h6" />
    </svg>
  )
}

export function IconCard(props) {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
      <path d="M6 15h4" />
    </svg>
  )
}

export function IconClock(props) {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  )
}

export function IconArrowRight(props) {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  )
}

export function IconArrowDown(props) {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M12 5v14" />
      <path d="m18 13-6 6-6-6" />
    </svg>
  )
}

export function IconCheckDouble(props) {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="m2 13 4 4L14 9" />
      <path d="m10 13 4 4L22 9" />
    </svg>
  )
}
