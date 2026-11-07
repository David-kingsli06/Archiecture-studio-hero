# Exact Prompt: Atelier Void Studio Landing Page Replica

Copy and paste the prompt below into any AI coding assistant to recreate this exact landing page pixel-for-pixel.

---

```markdown
Recreate this exact single-page marketing landing page for “Atelier Void Studio” (Architecture Studio) pixel-faithfully. Stack: React + TypeScript + Next.js (or Vite) + Tailwind CSS. Page title: “ATELIER VOID Architecture Studio”. Pure white background (#ffffff). No cards in the hero. No purple. No cream. No dark mode. Minimal black/white architectural aesthetic. Root page wrapper must fit viewport height without scrolling: `h-screen w-screen bg-white overflow-hidden text-neutral-900 selection:bg-neutral-200 flex flex-col justify-between`.

═══════════════════════════════════════
FONTS & TYPOGRAPHY
═══════════════════════════════════════
Load Google Fonts Geist:
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

Apply globally:
body { font-family: 'Geist', sans-serif; background-color: #ffffff; color: #1a1a1a; }

═══════════════════════════════════════
PAGE STRUCTURE (top → bottom, 4 sections)
═══════════════════════════════════════
1) Fixed Navbar
2) HeroContent
3) ImageMarquee (infinite drag-enabled horizontal strip with curved white masks)
4) BottomSection

═══════════════════════════════════════
1) NAVBAR — FIXED TOP BAR
═══════════════════════════════════════
Position: fixed top-0 left-0 right-0 z-50
Layout: flex items-center justify-between
Background: bg-white/80 backdrop-blur-md
Padding: px-4 sm:px-6 md:px-10 py-4 sm:py-5

LEFT — Logo SVG (28×28), viewBox="0 0 256 256", fill="#1a1a1a", exact path:
M 144 256 L 27.598 256 L 144 139.598 Z M 256 207.5 L 200 256 L 200 56 L 0 56 L 48 0 L 256 0 Z M 0 204.402 L 0 112 L 92.402 112 Z
(Abstract geometric mark: angular arrow/corner brand glyph, near-black #1a1a1a)
aria-label="ATELIER VOID Architecture Studio Home"

CENTER — Hamburger open button, absolutely centered:
Classes: group absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-[5px] p-2 focus:outline-none
Two horizontal lines only (NOT three): each w-6 h-[1.5px] bg-neutral-900 rounded-full
Hover: each line shrinks to w-5, transition-all duration-300
aria-label="Open menu"

RIGHT — CTA link:
Desktop (visible sm+): text-sm font-medium text-white bg-neutral-900 rounded-full px-5 py-2.5 hover:bg-neutral-800 transition-colors
Label: “Book a meeting”
href="#"
Mobile only: spacer div w-7 h-7 to balance the logo (sm:hidden)

MENU OPEN STATE:
- When open: document.body.style.overflow = 'hidden'; restore on close/unmount

OVERLAY:
fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]
transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
Open: opacity-100 pointer-events-auto
Closed: opacity-0 pointer-events-none
Click overlay → close

DRAWER / FULL-SCREEN MENU:
Mobile: fixed inset-0 white panel
Desktop (sm+): fixed top-0 right-0 h-full w-full max-w-sm white panel
z-[70]
Same duration-500 cubic-bezier(0.16,1,0.3,1)
Open mobile: opacity-100 translate-y-0
Closed mobile: opacity-0 translate-y-full
Open desktop: opacity-100 translate-x-0
Closed desktop: opacity-0 translate-x-full

Drawer header:
flex justify-between items-center, same logo SVG, close button:
relative w-10 h-10 rounded-full hover:bg-neutral-100 flex items-center justify-center
Two lines morphing into an X when open:
- line A: rotate-45 when open; otherwise rotate-0 -translate-y-[3px]
- line B: -rotate-45 when open; otherwise rotate-0 translate-y-[3px]
Each line: absolute w-5 h-[1.5px] bg-neutral-900 rounded-full
transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
aria-label="Close menu"

Menu links (staggered entrance), exact labels and order:
Work, Index, Events, Projects
Each: text-3xl font-medium text-neutral-900 py-3 hover:text-neutral-500
Open: opacity-100 translate-x-0
Closed: opacity-0 translate-x-8
transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
Stagger delay when opening: 150ms + i * 60ms (i = 0..3) → 150, 210, 270, 330ms
On click: close menu
href="#"

Drawer CTA below links (pt-12):
“Book a meeting” pill: text-sm font-medium text-white bg-neutral-900 rounded-full px-6 py-3 hover:bg-neutral-800 transition-colors
Fade/slide: open opacity-100 translate-y-0; closed opacity-0 translate-y-4
Delay when open: 400ms
Duration: 500ms cubic-bezier(0.16,1,0.3,1)

═══════════════════════════════════════
2) HERO CONTENT
═══════════════════════════════════════
Container: pt-20 sm:pt-24 pb-1 text-center px-4 sm:px-6 flex-shrink-0

H1 (two lines, exact line break):
“Atelier Void
Studio”
Classes: text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-[5.5rem] font-semibold tracking-tight text-neutral-900 leading-[1.05] max-w-3xl mx-auto

Subhead paragraph:
“The building you deserve has never been built before.”
Classes: mt-3 sm:mt-5 text-base sm:text-lg md:text-xl text-neutral-900 max-w-xl mx-auto leading-relaxed

═══════════════════════════════════════
3) IMAGE MARQUEE (CORE INTERACTIVE COMPONENT)
═══════════════════════════════════════
Container: relative py-2 sm:py-3 overflow-hidden flex-1 flex items-center min-h-0

TOP CURVED WHITE MASK (pointer-events-none, z-10):
absolute top-0 left-0 right-0 h-[60px] sm:h-[80px] md:h-[100px] pointer-events-none z-10
SVG viewBox="0 0 1440 100" preserveAspectRatio="none" class="w-full h-full fill-white"
Path:
M0 0H1440V50C1440 50 1200 100 720 100C240 100 0 50 0 50V0Z
(Produces a soft concave curtain dipping into the strip from the top)

BOTTOM CURVED WHITE MASK (mirror):
absolute bottom-0 left-0 right-0 h-[60px] sm:h-[80px] md:h-[100px] pointer-events-none z-10
Path:
M0 100H1440V50C1440 50 1200 0 720 0C240 0 0 50 0 50V100Z

MARQUEE TRACK:
flex w-max gap-3 sm:gap-4 py-2 select-none touch-none
Cursor: cursor-grab (cursor-grabbing while dragging)
style: willChange: 'transform'
Images duplicated once: [...images, ...images] for seamless infinite looping.

Image slide cards:
wrapper: w-48 h-64 sm:w-64 sm:h-80 md:w-72 md:h-96 lg:w-80 lg:h-[30rem] max-h-[48vh] flex-shrink-0 rounded-2xl overflow-hidden bg-neutral-100
img: w-full h-full object-cover pointer-events-none loading="lazy" draggable={false} alt=""

IMAGE SOURCES (6 images placed in public/ or equivalent URLs):
/img1.png
/img2.png
/img3.png
/img4.png
/img5.png
/img6.png

PHYSICS & ANIMATION ENGINE (requestAnimationFrame, NOT CSS marquee):
Constant SPEED = 0.8 px per frame (auto-scroll left)
Track Transform: translate3d(offsetPx, 0, 0)
Seamless wrap calculation:
halfWidth = track.scrollWidth / 2
if offset <= -halfWidth → offset += halfWidth
if offset > 0 → offset -= halfWidth

DRAG / POINTER GESTURE:
- onPointerDown:
  isDragging = true, velocity = 0, capture pointer (e.currentTarget.setPointerCapture), store startX and startOffset, toggle grabbing cursor.
- onPointerMove while dragging:
  currentTime = performance.now()
  dt = currentTime - lastTime || 16
  dx = e.clientX - lastX
  velocity = (dx / dt) * 16   // normalized to ~60fps
  offset = dragStartOffset + (e.clientX - dragStartX)
- onPointerUp / onPointerCancel:
  isDragging = false, release pointer capture, restore grab cursor.
- While NOT dragging:
  if |velocity| > 0.1:
    offset += velocity
    velocity *= 0.95   // momentum decay
  else:
    velocity = 0
    offset -= SPEED   // resume auto-scroll

═══════════════════════════════════════
4) BOTTOM SECTION
═══════════════════════════════════════
Container: text-center px-4 sm:px-6 pt-1 pb-6 sm:pb-8 md:pb-10 max-w-2xl mx-auto flex-shrink-0

Body copy:
“We design private residences and commercial spaces from a blank page. No templates, no repeated floorplans, no shortcuts.”
Classes: text-sm sm:text-base md:text-lg text-neutral-900 leading-relaxed

CTA link row:
mt-4 sm:mt-5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8
Two underlined text links (NOT button pills):
1) “Book a meeting”
2) “See Projects”
Both: text-neutral-900 font-semibold underline underline-offset-4 decoration-neutral-400 hover:decoration-neutral-900 transition-colors
href="#"

═══════════════════════════════════════
STRICT CONSTRAINTS
═══════════════════════════════════════
- Do not use CSS @keyframes marquee; use requestAnimationFrame + pointer drag inertia.
- No purple, cream, or dark background themes. Pure #ffffff background.
- Exact SVG paths for logo and both top/bottom curved masks.
- Exact hamburger and close morphing transitions.
- All links and text copies must match exactly.
```
