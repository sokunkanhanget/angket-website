export function Checkbox({ id, checked, onChange, children }) {
  return (
    <label className="flex cursor-pointer select-none items-start gap-2 text-[0.88rem] text-text" htmlFor={id}>
      <span className="relative mt-px h-[18px] w-[18px] shrink-0">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer absolute h-0 w-0 opacity-0"
        />
        <span className="before:absolute before:inset-0 before:rounded-[5px] before:border-2 before:border-[#e3e9f3] before:bg-white before:transition-[background,border-color] before:duration-150 before:content-[''] peer-checked:before:border-blue-700 peer-checked:before:bg-blue-700 peer-checked:[&_svg]:opacity-100 absolute inset-0" />
        <svg
          className="absolute inset-0 m-auto text-white opacity-0 transition-opacity duration-150"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M3 7.5L5.5 10L11 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span>{children}</span>
    </label>
  )
}
