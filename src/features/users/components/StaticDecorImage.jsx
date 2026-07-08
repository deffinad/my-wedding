export function StaticDecorImage({ src, className }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      draggable="false"
      className={`decorative-media ${className}`}
    />
  )
}
