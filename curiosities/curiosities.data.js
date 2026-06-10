/**
 * ╔══════════════════════════════════════════════╗
 * ║         CURIOSITIES - CONTENT DATA           ║
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
      enabled:  true,
      navLabel: "Music",
      num:      "01",
      titlePlain:  "Music &",
      titleItalic: "Visuals.",
      subtitle: "Music Videos · Editing · Rhythm · Sound Design & Music Production",
      ghostChar: "♩",

      intro: `Combining visuals, music, and rhythm is the work I'm most passionate about.
The edit lives in the beat, the cut lands on the note. Whether it's editing or
creating music videos, I'm drawn to the craft of building visuals that feel like
they were made for the sound and vice versa.`,

      /* spotifyEmbedSrc: "",  ← nothing to show yet */

      /* stats: [],  ← nothing to claim yet */

      featureCard: {
        videoSrc:    "./vid/Music&MusicVideosCuriosity.mp4",
        reversed:    true,
        eyebrow:     "Music & Visuals",
        titlePlain:  "Sound meets",
        titleItalic: "Image.",
        desc: `Most of it is still in progress, but the direction is clear. Edits built
around the music, visuals that earn the sound they're paired with. The kind
of thing where you notice immediately when it's off.`,
      },
    },

    /* ══ 02 · CRAFTING ════════════════════════ */
    {
      id:       "printing",
      enabled:  true,
      navLabel: "Crafting",
      num:      "02",
      titlePlain:  "Crafting &",
      titleItalic: "Making.",
      subtitle: "3D Printing · Clay · Wood · Paper · Whatever Works",
      ghostChar: "◈",

      intro: `I also love seeing digital ideas become physical objects with a real purpose.
Unfortunately, that's all I need: to buy more PLA than I'll use in a lifetime.`,

      featureCard: {
        videoSrc:     "./vid/Crafting_Curiosities.mp4",
        imgSrc:       "./img/printing/installation_hero.webp",
        imgAlt:       "3D Printed Object",
        eyebrow:      "Physical Work",
        titlePlain:   "Digital to",
        titleItalic:  "Physical.",
        desc: `Most prints start as experiments, testing whether an idea that looked good in
Houdini can survive being held in someone's hands. Some become installation pieces.
Some end up on a shelf. All of them teach something the viewport can't.`,
      },

      stats: [
        { num: "PLA+",   label: "Material of choice" },
        { num: "Houdini",label: "Print prep pipeline" },
      ],

    },

    /* ══ 03 · INTERACTIVE LOGIC SYSTEMS ══════ */
    {
      id:       "games",
      enabled:  true,
      navLabel: "Games",
      num:      "03",
      titlePlain:  "Interactive Logic",
      titleItalic: "Systems.",
      subtitle: "VR · Game Dev · Simulations · Educational Experiences",
      ghostChar: "▶",

      intro: `I'm also fascinated by building interactive logic systems that simulate
real-world and abstract scenarios, whether through VR, games, or playful
educational experiences.`,

      /* pullQuote: {
        text: `"Real-time rendering is the one place where the audience gets to decide the camera."`,
        cite: "— on why game development is a different kind of interesting",
      }, */

      /* gameCards: [
        {
          imgSrc: "./img/games/vr_game.webp",
          imgAlt: "VR Game",
          tag:    "VR · Unreal Engine",
          title:  "VR Game",
          desc:   `A virtual reality experience built in Unreal Engine. Focused on spatial storytelling
and presence -the feeling that the world pushes back when you touch it.`,
        },
        {
          imgSrc: "./img/games/walle_game.webp",
          imgAlt: "Wall-E Game",
          tag:    "Fan Project · Game Dev",
          title:  "Wall&#8209;E",
          desc:   `A fan-made Wall-E game exploring how cinematic animation and game mechanics can
coexist. An excuse to model Wall-E and make him roll around a wasteland.`,
        },
      ], */

      featureCard: {
        videoSrc:    "./vid/InteractiveLogicSystems&GamesCuriosity.mp4",
        eyebrow:     "Interactive Logic Systems & Games",
        titlePlain:  "Systems that",
        titleItalic: "Play.",
        desc: `There's something deeply satisfying about defining a set of rules and then
watching someone interact with them in ways you didn't predict. That's the
part that keeps pulling me back.`,
      },
    },

    /* ══ 04 · COMFYUI & AI ════════════════════ */
    {
      id:       "ai",
      enabled:  true,
      navLabel: "AI",
      num:      "04",
      titlePlain:  "ComfyUI &",
      titleItalic: "AI.",
      subtitle: "ComfyUI · Stable Diffusion · Node Pipelines · Generative Tooling",
      ghostChar: "⬡",

      intro: `ComfyUI is interesting to me because it's free, handles a lot of image tasks
well, and is a good place to experiment, figuring out where AI actually fits
and where it doesn't.`,

      textParagraphs: [
        `The part that genuinely excites me isn't AI doing things that were already
possible. It's when it does something that wasn't possible before, like generating a usable depth map
from a single image, or offering a suggestion that involves just enough random
chance to land somewhere you wouldn't have gone yourself. That's where it stops
feeling like a shortcut and starts feeling like a tool with its own character.`,
      ],

      pullQuote: {
        text: `"All of these fascinations feed back into my work, helping me stay connected to being an artist, while building the tools to empower me at the same time."`,
        cite: "",
      },

      featureCard: {
        videoSrc:    "./vid/ComfyUI_AI_Curiosity.mp4",
        reversed:    true,
        eyebrow:     "ComfyUI & AI",
        titlePlain:  "Where it fits,",
        titleItalic: "Where it doesn't.",
        desc: `This workflow from 2024 transfers facial performance from live video onto a
3D character, generating the animation on top rather than keyframing it. It had
3D music videos in mind. Nowadays it can be done far more easily, but back then it
took some figuring out. That's the approach: find out where it fits, and for which purposes.`,
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
working with what's already there. No HDRI to swap, no light rig to reposition,
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