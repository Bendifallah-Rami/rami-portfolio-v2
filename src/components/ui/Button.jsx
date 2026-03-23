"use client";

export default function Button({ href, children, className = "", style = {}, ...props }) {
  const commonClasses = "btn-accent inline-flex items-center justify-center gap-2 border-0 rounded-[calc(0.75rem-0.2rem)] px-4 py-2 font-medium cursor-pointer transition-[background,transform,color] duration-200";

  if (href) {
    return (
      <a
        href={href}
        className={`${commonClasses} ${className}`.trim()}
        style={style}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={props.type || "button"}
      className={`${commonClasses} ${className}`.trim()}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
}
