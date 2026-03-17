/* ─────────────────────────────────────────────────────────
   projects.data.js  —  All content for the projects overview page

   Edit this file to:
     - Add / remove / reorder project cards
     - Add / remove / reorder lab items
     - Change filter categories
     - Update hero text, footer, etc.
   ───────────────────────────────────────────────────────── */

const PROJECTS_DATA = {

  /* ── Page meta ── */
  title:  "Projects — Jona Melvin Grobe",
  backUrl: "../",
  backLabel: "Back",

  /* ── Footer ── */
  footer: {
    copyright: "© Jona Melvin Grobe — 2025",
    tagline:   "Technical Artist · Germany - Bavaria",
  },

  /* ── Works hero ── */
  worksHero: {
    number: "12",           // ghost number top-right — update when you add projects
    title:  "Selected<br><em>Works.</em>",
    sub:    "VFX · Short Films · Music Videos",
  },

  /* ── Filter buttons ──
     value must match the data-category strings on project cards below.
     "all" is always the first button and is hardcoded — edit the rest freely.
  ── */
  filters: [
    { label: "Short",       value: "short" },
    { label: "Music Video", value: "musicvideo" },
    { label: "Ad",          value: "ad" },
    { label: "Misc",        value: "misc" },
  ],

  /* ── Project cards ──
     category: space-separated string, e.g. "short ad" — matches filter values above
     images:   first image is the default; rest cycle on hover
     pill:     label shown on hover (top-right badge)
  ── */
  projects: [
    {
      href:     "../projects/Echoes/",
      category: "short",
      pill:     "Short",
      title:    "Echoes",
      desc:     "Short · Master Project 1",
      images: [
        { src: "../projects/Echoes/img/ECHOES_3.webp", alt: "Echoes" },
        { src: "../projects/Echoes/img/ECHOES_4.webp", alt: "Echoes 2" },
        { src: "../projects/Echoes/img/ECHOES_5.webp", alt: "Echoes 3" },
      ],
    },
    {
      href:     "../projects/PaintingGreys/",
      category: "musicvideo",
      pill:     "Music Video",
      title:    "Painting Greys",
      desc:     "Multimedia Music Video · Bachelor Project 3",
      images: [
        { src: "../projects/PaintingGreys/img/Thumbnail.webp",        alt: "Painting Greys" },
        { src: "../projects/PaintingGreys/img/PaintingGreys_11.webp",  alt: "PG 2" },
        { src: "../projects/PaintingGreys/img/PaintingGreys_4.webp",   alt: "PG 3" },
        { src: "../projects/PaintingGreys/img/PaintingGreys_8.webp",   alt: "PG 4" },
      ],
    },
    {
      href:     "../projects/Tinnitus/",
      category: "musicvideo",
      pill:     "Music Video",
      title:    "Tinnitus",
      desc:     "Music Video",
      images: [
        { src: "../projects/Tinnitus/img/Still_16.webp", alt: "Tinnitus" },
        { src: "../projects/Tinnitus/img/Still_7.webp",  alt: "Tinnitus 2" },
        { src: "../projects/Tinnitus/img/Still_15.webp", alt: "Tinnitus 3" },
      ],
    },
    {
      href:     "../projects/TheUSBParadox/",
      category: "short ad",
      pill:     "Short",
      title:    "The USB Paradox",
      desc:     "Advertisement",
      images: [
        { src: "../projects/TheUSBParadox/img/thumbnail.webp", alt: "USB Paradox" },
        { src: "../projects/TheUSBParadox/img/USB_3.webp",     alt: "USB 2" },
        { src: "../projects/TheUSBParadox/img/USB_1.webp",     alt: "USB 3" },
        { src: "../projects/TheUSBParadox/img/USB_5.webp",     alt: "USB 4" },
      ],
    },
    {
      href:     "../projects/WithoutYou/",
      category: "short",
      pill:     "Short",
      title:    "Without You",
      desc:     "Bachelor Project 2",
      images: [
        { src: "../projects/WithoutYou/img/Still_4.webp", alt: "Without You" },
        { src: "../projects/WithoutYou/img/Still_1.webp", alt: "WY 2" },
        { src: "../projects/WithoutYou/img/Still_0.webp", alt: "WY 3" },
      ],
    },
    {
      href:     "../projects/NoNeedToRushLife/",
      category: "short",
      pill:     "Short",
      title:    "No Need To Rush Life",
      desc:     "Bachelor Project 1",
      images: [
        { src: "../projects/NoNeedToRushLife/img/NO_NEED_TO_RUSH_LIFE_1.webp", alt: "NNTRL" },
        { src: "../projects/NoNeedToRushLife/img/NO_NEED_TO_RUSH_LIFE_3.webp", alt: "NNTRL 2" },
        { src: "../projects/NoNeedToRushLife/img/NO_NEED_TO_RUSH_LIFE_2.webp", alt: "NNTRL 3" },
      ],
    },
    {
      href:     "../projects/Deviant/",
      category: "musicvideo",
      pill:     "Music Video",
      title:    "Deviant",
      desc:     "Music Video Snippet",
      images: [
        { src: "../projects/Deviant/img/Thumbnail.webp", alt: "Deviant" },
        { src: "../projects/Deviant/img/Deviant_4.webp", alt: "Deviant 2" },
        { src: "../projects/Deviant/img/Deviant_1.webp", alt: "Deviant 3" },
      ],
    },
    {
      href:     "../projects/WheelofSuffering/",
      category: "misc",
      pill:     "Challenge",
      title:    "Wheel of Suffering",
      desc:     "Pwnisher Challenge · Top 100",
      images: [
        { src: "../projects/WheelofSuffering/img/Thumbnail.webp", alt: "Wheel of Suffering" },
        { src: "../projects/WheelofSuffering/img/WOS_0.webp",     alt: "WOS 2" },
        { src: "../projects/WheelofSuffering/img/WOS_1.webp",     alt: "WOS 3" },
      ],
    },
  ],

  /* ── Lab divider ── */
  labDivider: {
    title: "The<br><em>Lab.</em>",
    sub:   "Experiments · Sketches · Side Work",
  },

  /* ── Lab items ──
     type: "image" | "video"
     src:  path to the image or video file
     desc: optional longer description shown in the lightbox
  ── */
  lab: [
    {
      type:  "video",
      src:   "../projects/WellThatHappened/vid/StylizedTexture_workflow.mp4",
      title: "Stylized Texture Workflow",
      sub:   "Houdini · COPs",
      desc:  "A procedural texture workflow built entirely inside Houdini's COPs context.",
    },
    {
      type:  "image",
      src:   "../vid/MuscleStiff.webp",
      title: "Muscle Stiffness Test",
      sub:   "Houdini · Muscle Simulation",
      desc:  "Testing muscle stiffness parameters in Houdini's muscle solver.",
    },
    {
      type:  "video",
      src:   "../projects/WellThatHappened/vid/Penguin_BTS.mp4",
      title: "Stylized Penguin",
      sub:   "Houdini · Character FX",
      desc:  "Behind the scenes of a stylized penguin character built and rigged in Houdini.",
    },
    {
      type:  "image",
      src:   "../img/curiosities/ConceptArtCreature.png",
      title: "Concept Art Creature",
      sub:   "Photoshop · Concept Art",
      desc:  "Concept art sketch exploring creature design.",
    },
    {
      type:  "image",
      src:   "../img/curiosities/SketchMe (5).png",
      title: "Cute Sketch 01",
      sub:   "Photoshop · 2D Sketch",
      desc:  "",
    },
  ],

};