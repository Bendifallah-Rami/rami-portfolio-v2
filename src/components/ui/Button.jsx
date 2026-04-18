"use client";

import Link from "next/link";

export default function Button({ href, children, className = "", style = {}, ...props }) {
  const commonClasses = "btn-accent inline-flex items-center justify-center gap-2 border-0 rounded-[calc(0.75rem-0.2rem)] px-4 py-2 font-medium cursor-pointer transition-[background,transform,color] duration-200";

  if (href) {
    // Use Next.js Link for internal routes, regular anchor for external links/protocols
    const isInternal = href.startsWith('/') || href.startsWith('#');
    const isMailto = href.startsWith('mailto:');
    
    if (isMailto) {
      // For mailto links, use anchor tag
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
    
    if (isInternal && !href.startsWith('#')) {
      // For internal routes, use Next.js Link
      return (
        <Link
          href={href}
          className={`${commonClasses} ${className}`.trim()}
          style={style}
          {...props}
        >
          {children}
        </Link>
      );
    }
    
    // For anchors and external links, use anchor tag
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
