import { useEffect, useRef, useState } from "react"

export function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(
    () =>
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
  )

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return undefined
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            io.disconnect()
          }
        })
      },
      { threshold: 0.12 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [inView])

  return (
    <Tag ref={ref} className={`reveal${inView ? " in" : ""}${className ? ` ${className}` : ""}`} {...rest}>
      {children}
    </Tag>
  )
}
