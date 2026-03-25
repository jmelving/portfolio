/**
 * ╔══════════════════════════════════════════════╗
 * ║         CURIOSITIES — CONTENT DATA           ║
 * ║  Edit this file to update all page content.  ║
 * ╚══════════════════════════════════════════════╝
 *
 * HOW TO USE:
 *  - Set  enabled: true   to show a section
 *  - Set  enabled: false  to hide a section
 *  - Edit stats, text, gallery items freely
 *  - Gallery items: add { src, title, sub, desc } objects to the items array
 *  - For spotify: paste your embed src into spotifyEmbedSrc
 */

const CURIOSITIES_DATA = {

  /* ─── SITE META ─────────────────────────────── */
  site: {
    author:    "Jona Melvin Grobe",
    role:      "Technical Artist",
    location:  "Austria",
    year:      "2025",
    backHref:  "../",
    backLabel: "Home",
  },

  /* ─── HERO ──────────────────────────────────── */
  hero: {
    eyebrow:    "Beyond the Brief",
    titleLine1: "Curio-",
    titleLine2: "sities.",
    desc: `The work that doesn't fit a showreel. Music I make alone at night,
objects I pull out of a printer at 2am, games I build for the joy of
building, AI experiments I run at midnight, and frames I collect when
I forget to leave the camera at home.`,
    tags: ["Music", "3D Printing", "Game Development", "ComfyUI & AI", "Photography"],
    ghostChar: "∞",
  },

  /* ─── SECTIONS ───────────────────────────────
   * Each section has:
   *   id        – used for anchor links + side-rail
   *   enabled   – true/false toggle
   *   num       – chapter number label
   *   navLabel  – short label shown in side rail
   *   title     – two-part title (plain + italic)
   *   subtitle  – small monospaced subtitle below title
   *   ghostChar – large decorative background character
   *   intro     – paragraph shown at top of section
   *   pullQuote – optional { text, cite }
   *   stats     – optional array of { num, label }
   *   spotifyEmbedSrc – optional Spotify iframe src (music section)
   *   featureCard – optional { imgSrc, imgAlt, eyebrow, titlePlain, titleItalic, desc }
   *   gallery   – optional { cols: 3|4, items: [...] }
   *   gameCards – optional array of { imgSrc, imgAlt, tag, title, desc }
   * ─────────────────────────────────────────── */
  sections: [

    /* ══ 01 · MUSIC ═══════════════════════════ */
    {
      id:       "music",
      enabled:  false,
      navLabel: "Music",
      num:      "01",
      titlePlain:  "Music.",
      titleItalic: "",
      subtitle: "Production · Composition · Sound Design",
      ghostChar: "♩",

      intro: `Music is where I think without an output file format. Most of it lives on a hard drive
somewhere — beats started at midnight, half-finished ambient pieces, the occasional
thing that actually gets exported. It feeds directly into how I approach sound design
and scoring for motion work.`,

      /* ↓ Paste your Spotify embed src here */
      spotifyEmbedSrc: "https://open.spotify.com/embed/track/YOUR_TRACK_ID?utm_source=generator&theme=0",

      textParagraphs: [
        `I produce mostly in the electronic space — somewhere between ambient, hyperpop and
whatever mood the night calls for. Gear is minimal: a laptop, a MIDI controller, and
too many plugins.`,
        `Some of it ends up online. If you want to hear it, ask nicely.`,
      ],

      stats: [
        { num: "4+", label: "Years producing" },
        { num: "∞",  label: "Unfinished tracks" },
        { num: "1",  label: "MIDI controller" },
        { num: "0",  label: "Albums (yet)" },
      ],

      gallery: {
        cols: 3,
        subHeading: "Studio & Process",
        subTitle:   "Where the tracks live",
        items: [
          { src: "./img/music/daw_session.webp",  title: "DAW Session", sub: "Production · 2024", desc: "" },
          { src: "./img/music/midi_setup.webp",   title: "Midi Setup",  sub: "Hardware · Studio", desc: "" },
          { src: "./img/music/waveforms.webp",    title: "Waveforms",   sub: "Sound Design",      desc: "" },
        ],
      },
    },

    /* ══ 02 · 3D PRINTING ═════════════════════ */
    {
      id:       "printing",
      enabled:  false,
      navLabel: "3D Printing",
      num:      "02",
      titlePlain:  "3D Printing &",
      titleItalic: "Installations.",
      subtitle: "FDM · Resin · Physical Fabrication",
      ghostChar: "◈",

      intro: `Taking something from a 3D viewport into physical space is a feeling that never gets old.
I use printing mostly for installation work and props — pieces that need to exist in a
room rather than on a screen.`,

      featureCard: {
        imgSrc:       "./img/printing/installation_hero.webp",
        imgAlt:       "3D Printed Installation",
        eyebrow:      "Featured Work",
        titlePlain:   "Printed",
        titleItalic:  "Objects.",
        desc: `Most prints start as experiments — testing material properties, tolerances, or just
whether an idea that looked good in Houdini can survive being held in someone's hands.
Some become installation pieces. Some end up on a shelf. All of them teach something
the viewport can't.`,
      },

      stats: [
        { num: "FDM",    label: "Primary method" },
        { num: "PLA+",   label: "Material of choice" },
        { num: "Houdini",label: "Modelling pipeline" },
      ],

      gallery: {
        cols: 3,
        subHeading: "Selected Prints",
        subTitle:   "Objects & Installations",
        items: [
          { src: "./img/printing/print_01.webp",           title: "Print 01",         sub: "FDM · PLA+",        desc: "" },
          { src: "./img/printing/print_02.webp",           title: "Print 02",         sub: "FDM · Installation", desc: "" },
          { src: "./img/printing/in_progress.webp",        title: "In Progress",      sub: "Bed · 2am",         desc: "" },
          { src: "./img/printing/installation_view.webp",  title: "Installation View",sub: "Physical · Space",  desc: "" },
          { src: "./img/printing/detail_shot.webp",        title: "Detail Shot",      sub: "Macro · FDM",       desc: "" },
        ],
      },
    },

    /* ══ 03 · GAMES ═══════════════════════════ */
    {
      id:       "games",
      enabled:  false,
      navLabel: "Games",
      num:      "03",
      titlePlain:  "Game",
      titleItalic: "Development.",
      subtitle: "Unreal · Unity · VR · Mechanics",
      ghostChar: "▶",

      intro: `Games are where real-time constraints meet storytelling. I approach them as an interactive
extension of the same visual language — lighting, shading, spatial composition — except
now the audience can walk around in it. Two projects so far, very different in tone.`,

      pullQuote: {
        text: `"Real-time rendering is the one place where the audience gets to decide the camera."`,
        cite: "— on why game development is a different kind of interesting",
      },

      gameCards: [
        {
          imgSrc: "./img/games/vr_game.webp",
          imgAlt: "VR Game",
          tag:    "VR · Unreal Engine",
          title:  "VR Game",
          desc:   `A virtual reality experience built in Unreal Engine. Focused on spatial storytelling
and presence — the feeling that the world pushes back when you touch it.`,
        },
        {
          imgSrc: "./img/games/walle_game.webp",
          imgAlt: "Wall-E Game",
          tag:    "Fan Project · Game Dev",
          title:  "Wall&#8209;E",
          desc:   `A fan-made Wall-E game exploring how cinematic animation and game mechanics can
coexist. An excuse to model Wall-E and make him roll around a wasteland.`,
        },
      ],

      gallery: {
        cols: 3,
        subHeading: "Behind the Scenes",
        subTitle:   "Screenshots & Development",
        items: [
          { src: "./img/games/vr_env.webp",      title: "VR — Environment", sub: "Unreal Engine · Lookdev", desc: "Environment pass from the VR project. Lumen lighting throughout." },
          { src: "./img/games/vr_interact.webp", title: "VR — Interaction", sub: "Unreal Engine · Blueprint",desc: "Interaction system wiring in Blueprint." },
          { src: "./img/games/walle_model.webp", title: "Wall-E — Model",   sub: "3D · Character",          desc: "Wall-E model pass. Tried to keep the proportions faithful." },
          { src: "./img/games/walle_world.webp", title: "Wall-E — World",   sub: "Environment · Game",      desc: "The wasteland environment — trash piles and rust." },
        ],
      },
    },

    /* ══ 04 · COMFYUI & AI ════════════════════ */
    {
      id:       "ai",
      enabled:  false,           // ← LIVE
      navLabel: "AI",
      num:      "04",
      titlePlain:  "ComfyUI &",
      titleItalic: "AI.",
      subtitle: "ComfyUI · Stable Diffusion · Node Pipelines · Generative Tooling",
      ghostChar: "⬡",

      intro: `ComfyUI is interesting to me not just as an AI tool, but as a general
automation platform. With everything going on around AI it's hard not to
be curious — and combining both is where it gets genuinely exciting.`,

      textParagraphs: [
        `I've had workflows running for a while, but lately I find myself going
deeper. Reference early in a project, a cleaner finish at the end, the
occasional thing that would've taken an hour now taking ten minutes.`,
        `The AI side and the automation side start feeding each other in ways
that are hard to map in advance. That's the part I'm most curious
about right now.`,
      ],

      stats: [
        { num: "Houdini",  label: "Where it starts" },
        { num: "ComfyUI",  label: "Where it continues" },
        { num: "20%",      label: "The part it helps most" },
        { num: "Open",     label: "Fully open source" },
      ],

      pullQuote: {
        text: `"The more I use it the more I notice the gaps it fits into — and the more interesting those gaps get."`,
        cite: "— on where the curiosity is pointing",
      },

      gallery: {
        cols: 3,
        subHeading: "Workflows & Outputs",
        subTitle:   "What comes out of the pipeline",
        items: [
          /* ↓ Replace src paths with your actual exports / screenshots */
          { src: "./img/ai/workflow_01.webp", title: "Houdini → ComfyUI",  sub: "Pipeline",        desc: "" },
          { src: "./img/ai/output_01.webp",   title: "Concept Reference",  sub: "Early Stage",     desc: "" },
          { src: "./img/ai/workflow_02.webp", title: "Render Enhancement", sub: "Post",            desc: "" },
          { src: "./img/ai/output_02.webp",   title: "Upscale Pass",       sub: "Detail Recovery", desc: "" },
          { src: "./img/ai/node_graph.webp",  title: "Node Graph",         sub: "ComfyUI",         desc: "" },
        ],
      },
    },

    /* ══ 05 · PHOTOGRAPHY ═════════════════════ */
    {
      id:       "photography",
      enabled:  false,
      navLabel: "Photo",
      num:      "05",
      titlePlain:  "Photo-",
      titleItalic: "graphy.",
      subtitle: "35mm · Digital · Street · Light",
      ghostChar: "○",

      intro: `Photography taught me more about lighting than any rendering textbook. The constraint of
working with what's already there — no HDRI to swap, no light rig to reposition —
makes you read a scene differently. I shoot when something is worth keeping.`,

      gallery: {
        cols: 4,
        subHeading: "",
        subTitle:   "",
        items: [
          { src: "./img/photo/photo_01.webp", title: "Untitled 01", sub: "2024 · Street",       desc: "" },
          { src: "./img/photo/photo_02.webp", title: "Untitled 02", sub: "2024 · Light",        desc: "" },
          { src: "./img/photo/photo_03.webp", title: "Untitled 03", sub: "2023 · Architecture", desc: "" },
          { src: "./img/photo/photo_04.webp", title: "Untitled 04", sub: "2023 · Portrait",     desc: "" },
          { src: "./img/photo/photo_05.webp", title: "Untitled 05", sub: "2024 · Nature",       desc: "" },
          { src: "./img/photo/photo_06.webp", title: "Untitled 06", sub: "2024 · Night",        desc: "" },
          { src: "./img/photo/photo_07.webp", title: "Untitled 07", sub: "2023 · Travel",       desc: "" },
          { src: "./img/photo/photo_08.webp", title: "Untitled 08", sub: "2024 · Colour",       desc: "" },
        ],
      },
    },

  ], /* end sections */

}; /* end CURIOSITIES_DATA */