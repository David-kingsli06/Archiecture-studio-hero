"use client";

import React, { useState, useEffect, useRef } from "react";

// Local image assets in /public
const IMAGES = [
  "/img1.png",
  "/img2.png",
  "/img3.png",
  "/img4.png",
  "/img5.png",
  "/img6.png",
];

const MENU_LINKS = ["Work", "Index", "Events", "Projects"];

function LogoIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 256 256"
      fill="#1a1a1a"
      className="flex-shrink-0"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M 144 256 L 27.598 256 L 144 139.598 Z M 256 207.5 L 200 256 L 200 56 L 0 56 L 48 0 L 256 0 Z M 0 204.402 L 0 112 L 92.402 112 Z" />
    </svg>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Body scroll lock while menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Image Marquee drag & animation refs
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const [isCursorGrabbing, setIsCursorGrabbing] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    const SPEED = 0.8; // px per frame (auto-scroll left)

    const animate = () => {
      const track = trackRef.current;
      if (track) {
        const halfWidth = track.scrollWidth / 2;

        if (halfWidth > 0) {
          if (!isDraggingRef.current) {
            if (Math.abs(velocityRef.current) > 0.1) {
              offsetRef.current += velocityRef.current;
              velocityRef.current *= 0.95; // momentum decay
            } else {
              velocityRef.current = 0;
              offsetRef.current -= SPEED; // resume auto-scroll
            }

            // Seamless wrap check
            if (offsetRef.current <= -halfWidth) {
              offsetRef.current += halfWidth;
            } else if (offsetRef.current > 0) {
              offsetRef.current -= halfWidth;
            }
          }

          track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;

    isDraggingRef.current = true;
    velocityRef.current = 0;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    setIsCursorGrabbing(true);

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // In case pointer capture fails
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    const currentTime = performance.now();
    const dt = currentTime - lastTimeRef.current || 16;
    const dx = e.clientX - lastXRef.current;

    // velocity = (dx / dt) * 16 (normalize ~60fps)
    velocityRef.current = (dx / dt) * 16;

    lastXRef.current = e.clientX;
    lastTimeRef.current = currentTime;

    const track = trackRef.current;
    if (track) {
      const halfWidth = track.scrollWidth / 2;
      let newOffset = dragStartOffsetRef.current + (e.clientX - dragStartXRef.current);

      if (halfWidth > 0) {
        while (newOffset <= -halfWidth) {
          newOffset += halfWidth;
          dragStartOffsetRef.current += halfWidth;
        }
        while (newOffset > 0) {
          newOffset -= halfWidth;
          dragStartOffsetRef.current -= halfWidth;
        }
      }

      offsetRef.current = newOffset;
      track.style.transform = `translate3d(${newOffset}px, 0, 0)`;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsCursorGrabbing(false);

    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Pointer release fallback
    }
  };

  const duplicatedImages = [...IMAGES, ...IMAGES];

  return (
    <div className="h-screen w-screen bg-white overflow-hidden text-neutral-900 selection:bg-neutral-200 flex flex-col justify-between">
      {/* ═══════════════════════════════════════
          1) NAVBAR — fixed top bar
          ═══════════════════════════════════════ */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-10 py-4 sm:py-5 bg-white/80 backdrop-blur-md">
        {/* LEFT — Logo */}
        <a href="#" className="flex items-center" aria-label="ATELIER VOID Architecture Studio Home">
          <LogoIcon />
        </a>

        {/* CENTER — Hamburger open button, absolutely centered */}
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="group absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-[5px] p-2 focus:outline-none"
          aria-label="Open menu"
        >
          <span className="w-6 h-[1.5px] bg-neutral-900 rounded-full group-hover:w-5 transition-all duration-300" />
          <span className="w-6 h-[1.5px] bg-neutral-900 rounded-full group-hover:w-5 transition-all duration-300" />
        </button>

        {/* RIGHT — CTA link (hidden on mobile, visible sm+) */}
        <div className="flex items-center">
          <a
            href="#"
            className="hidden sm:inline-block text-sm font-medium text-white bg-neutral-900 rounded-full px-5 py-2.5 hover:bg-neutral-800 transition-colors"
          >
            Book a meeting
          </a>
          {/* On mobile only: spacer div w-7 to balance the logo (sm:hidden) */}
          <div className="w-7 h-7 sm:hidden" aria-hidden="true" />
        </div>
      </header>

      {/* OVERLAY */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      />

      {/* DRAWER / FULL-SCREEN MENU */}
      <div
        className={`fixed bg-white z-[70] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between p-6 sm:p-10
          /* Mobile styles: fixed inset-0 */
          inset-0 sm:inset-auto sm:top-0 sm:right-0 sm:h-full sm:w-full sm:max-w-sm
          ${
            menuOpen
              ? "opacity-100 translate-y-0 sm:translate-x-0"
              : "opacity-0 translate-y-full sm:translate-y-0 sm:translate-x-full pointer-events-none"
          }
        `}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between">
          <LogoIcon />
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="relative w-10 h-10 rounded-full hover:bg-neutral-100 flex items-center justify-center focus:outline-none"
            aria-label="Close menu"
          >
            {/* Morphing X lines */}
            <span
              className={`absolute w-5 h-[1.5px] bg-neutral-900 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                menuOpen ? "rotate-45 translate-y-0" : "rotate-0 -translate-y-[3px]"
              }`}
            />
            <span
              className={`absolute w-5 h-[1.5px] bg-neutral-900 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                menuOpen ? "-rotate-45 translate-y-0" : "rotate-0 translate-y-[3px]"
              }`}
            />
          </button>
        </div>

        {/* Menu links (staggered entrance) */}
        <nav className="flex flex-col my-auto py-8">
          {MENU_LINKS.map((link, i) => {
            const delayMs = 150 + i * 60; // 150, 210, 270, 330ms
            return (
              <a
                key={link}
                href="#"
                onClick={() => setMenuOpen(false)}
                style={{
                  transitionDelay: menuOpen ? `${delayMs}ms` : "0ms",
                }}
                className={`text-3xl font-medium text-neutral-900 py-3 hover:text-neutral-500 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  menuOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8"
                }`}
              >
                {link}
              </a>
            );
          })}

          {/* Drawer CTA below links (pt-12) */}
          <div
            style={{
              transitionDelay: menuOpen ? "400ms" : "0ms",
            }}
            className={`pt-12 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              menuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <a
              href="#"
              onClick={() => setMenuOpen(false)}
              className="inline-block text-sm font-medium text-white bg-neutral-900 rounded-full px-6 py-3 hover:bg-neutral-800 transition-colors"
            >
              Book a meeting
            </a>
          </div>
        </nav>
      </div>

      {/* ═══════════════════════════════════════
          2) HERO CONTENT
          ═══════════════════════════════════════ */}
      <section className="pt-20 sm:pt-24 pb-1 text-center px-4 sm:px-6 flex-shrink-0">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-[5.5rem] font-semibold tracking-tight text-neutral-900 leading-[1.05] max-w-3xl mx-auto">
          Atelier Void
          <br />
          Studio
        </h1>
        <p className="mt-3 sm:mt-5 text-base sm:text-lg md:text-xl text-neutral-900 max-w-xl mx-auto leading-relaxed">
          The building you deserve has never been built before.
        </p>
      </section>

      {/* ═══════════════════════════════════════
          3) IMAGE MARQUEE (core visual + interaction)
          ═══════════════════════════════════════ */}
      <section className="relative py-2 sm:py-3 overflow-hidden flex-1 flex items-center min-h-0">
        {/* TOP CURVED WHITE MASK (pointer-events-none, z-10) */}
        <div className="absolute top-0 left-0 right-0 h-[60px] sm:h-[80px] md:h-[100px] pointer-events-none z-10">
          <svg
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            className="w-full h-full fill-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0H1440V50C1440 50 1200 100 720 100C240 100 0 50 0 50V0Z" />
          </svg>
        </div>

        {/* BOTTOM CURVED WHITE MASK (mirror) */}
        <div className="absolute bottom-0 left-0 right-0 h-[60px] sm:h-[80px] md:h-[100px] pointer-events-none z-10">
          <svg
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            className="w-full h-full fill-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 100H1440V50C1440 50 1200 0 720 0C240 0 0 50 0 50V100Z" />
          </svg>
        </div>

        {/* MARQUEE TRACK CONTAINER */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`flex w-max gap-3 sm:gap-4 py-2 select-none touch-none ${
            isCursorGrabbing ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{ willChange: "transform" }}
          ref={trackRef}
        >
          {duplicatedImages.map((src, index) => (
            <div
              key={index}
              className="w-48 h-64 sm:w-64 sm:h-80 md:w-72 md:h-96 lg:w-80 lg:h-[30rem] max-h-[48vh] flex-shrink-0 rounded-2xl overflow-hidden bg-neutral-100"
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                draggable={false}
                className="w-full h-full object-cover pointer-events-none"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          4) BOTTOM SECTION
          ═══════════════════════════════════════ */}
      <section className="text-center px-4 sm:px-6 pt-1 pb-6 sm:pb-8 md:pb-10 max-w-2xl mx-auto flex-shrink-0">
        <p className="text-sm sm:text-base md:text-lg text-neutral-900 leading-relaxed">
          We design private residences and commercial spaces from a blank page. No templates, no repeated floorplans, no shortcuts.
        </p>

        <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8">
          <a
            href="#"
            className="text-neutral-900 font-semibold underline underline-offset-4 decoration-neutral-400 hover:decoration-neutral-900 transition-colors"
          >
            Book a meeting
          </a>
          <a
            href="#"
            className="text-neutral-900 font-semibold underline underline-offset-4 decoration-neutral-400 hover:decoration-neutral-900 transition-colors"
          >
            See Projects
          </a>
        </div>
      </section>
    </div>
  );
}
