"use client";

import { useEffect, useRef } from "react";

export default function MobileMenu() {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      const details = detailsRef.current;
      if (
        details?.open &&
        event.target instanceof Node &&
        !details.contains(event.target)
      ) {
        details.open = false;
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      const details = detailsRef.current;
      if (event.key !== "Escape" || !details?.open) return;

      event.preventDefault();
      event.stopPropagation();
      details.open = false;
      summaryRef.current?.focus({ preventScroll: true });
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function closeMenu() {
    const details = detailsRef.current;
    if (!details) return;

    details.open = false;
    summaryRef.current?.focus({ preventScroll: true });
  }

  return (
    <details className="mobile-menu" ref={detailsRef}>
      <summary ref={summaryRef}>
        <span className="menu-label">Menu</span>
        <span className="menu-icon" aria-hidden="true">
          <i />
          <i />
        </span>
      </summary>
      <nav aria-label="Mobile navigation">
        <a href="#releases" onClick={closeMenu}>
          Releases
        </a>
        <a href="#artists" onClick={closeMenu}>
          Artists
        </a>
        <a href="#about" onClick={closeMenu}>
          About
        </a>
        <a href="#contact" onClick={closeMenu}>
          Contact
        </a>
        <a
          href="mailto:lukulurecordings@gmail.com?subject=Demo%20submission"
          onClick={closeMenu}
        >
          Send a demo <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </details>
  );
}
