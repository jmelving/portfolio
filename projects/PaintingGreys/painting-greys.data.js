/* ─────────────────────────────────────────────────────────
   painting-greys.data.js  —  Project data for "Painting Greys"

   To create a new project page:
     1. Duplicate this file and rename it  e.g. new-project.data.js
     2. Fill in all the fields below
     3. In your HTML, point the first <script> tag at the new file
   ───────────────────────────────────────────────────────── */

const PROJECT_DATA = {

  /* ── Page meta ── */
  title:           "Painting Greys",
  author:          "Jona Melvin Grobe",
  metaDescription: "Unofficial Music Video for Emmit Fenn's 'Painting Greys' — motion capture, 3D visuals and compositing in Houdini and Nuke.",
  backUrl:         "../../projects/",
  headerMeta:      "Music Video · 2024",

  /* ── Footer ── */
  footer: {
    copyright: "© Jona Melvin Grobe — 2026",
    tagline:   "Technical Artist · Germany - Bavaria",
  },

  /* ── Hero ──
     slides:    array of image URLs for the slideshow (used when no videoSrc)
     videoSrc:  local video file path — if set, overrides slides
     videoId:   YouTube or Vimeo ID — clicking the hero opens the modal
     platform:  "youtube" (default) | "vimeo"
  ── */
  hero: {
    eyebrow:   "Music Video · Motion Capture · 2024",
    title:     "Painting<br>Greys.",
    sub:       "Mocap · 3D Visuals · Multimedia",
    playLabel: "Watch",
    slides: [
      "./img/PaintingGreys_2.webp",
      "./img/PaintingGreys_3.webp",
      "./img/PaintingGreys_1.webp",
      "./img/Thumbnail.webp",
    ],
    videoSrc:  "",           // local video, e.g. "./video/hero.mp4" — leave "" to use slides
    videoId:   "zH8ladtiEsE",
    platform:  "youtube",
  },

  /* ── Details bar ──
     value can be a plain string or an array of strings / link objects { href, label }
  ── */
  details: [
    {
      label: "Role",
      value: "3D Generalist",
    },
    {
      label: "Collaborators",
      value: [
        { href: "https://open.spotify.com/intl-de/artist/3VVLqeEqQQqTgT8YhfY9Z6", label: "Emmit Fenn" },
        { href: "https://rampitschhannah.com/",                                    label: "Hannah Rampitsch" },
        { href: "https://lenaschibany.com/",                                       label: "Lena Schibany" },
        { href: "https://supersbergerm.myportfolio.com/",                          label: "Mona Supersberger" },
        { href: "https://sinaistanders.com/",                                      label: "Sina Anders" },
        { href: "https://www.instagram.com/christina.ottoson",                     label: "Christina Ottoson" },
        { href: "https://www.linkedin.com/in/danijel-jamal-wolf-312290380/",       label: "Danijel Jamal Wolf" },
      ],
    },
    {
      label:     "Duration",
      value:     "1 Year",
      secondary: "2023–2024",
    },
    
    {
      label: "Tools",
      value: "Houdini<br>Nuke<br>Premiere Pro<br>Optitrack",
    },
  ],

  /* ── Sections ──

     Sections with `id` + `navLabel` appear in the side rail.
     Sections without them are still rendered but not navigable.

     Each entry in this array can be one of:
       { type: "text" }         — eyebrow + title + body paragraph
       { type: "gallery" }      — masonry image grid (2/3/4 cols)
       { type: "subsection" }   — sub-rule + sub-heading + body
       { type: "video" }        — embedded iframe (YouTube/Vimeo)
       { type: "spotify" }      — embedded Spotify track/album
       { type: "learnings" }    — block table of takeaways
       { type: "rule" }         — plain horizontal divider

     You can add as many galleries, videos, etc. as you want in any order.
     Consecutive non-text blocks are appended to the preceding section.
  ── */
  sections: [

    /* ══ 01 OVERVIEW ══ */
    {
      type:     "text",
      id:       "overview",
      navLabel: "Overview",
      eyebrow:  "01 — Project Description",
      title:    "Overview",
      body: `In the music video for <em>Painting Greys</em> by Emmit Fenn, the protagonist is a glamorous yet
             tormented editor-in-chief grappling with her perfectionism. Her vivid dreams reveal a subconscious
             yearning for joy, gradually overtaking her meticulous habits. Motion capture performances by
             Christina Ottoson and Danijel Jamal Wolf brought the dream sequences to life — rendered and
             composited in Houdini and Nuke by our team of four.`,
    },

    // Embedded video right below the description
    {
      type:     "video",
      embedUrl: "https://www.youtube.com/embed/zH8ladtiEsE?autoplay=0",
      title:    "Painting Greys — Emmit Fenn (Unofficial Music Video)",
    },

    // First gallery — finished stills
    {
      type: "gallery",
      cols: 3,
      items: [
        {
          src:   "./img/PaintingGreys_2.webp",
          title: "Star Sequence",
          sub:   "Stopmotion · After Effects",
          desc:  "Mixed media star sequence by Mona Supersberger, using a mixture of Stopmotion and After Effects.",
        },
        {
          src:   "./img/PaintingGreys_3.webp",
          title: "Cloth Wrap Shot",
          sub:   "Houdini · Hannah Rampitsch",
          desc:  "Cloth simulation shot by Hannah Rampitsch.",
        },
        {
          src:   "./img/PaintingGreys_1.webp",
          title: "2D Animation",
          sub:   "Digital Animation · Lena Schibany",
          desc:  "Digital 2D animation by Lena Schibany.",
        },
        {
          src:   "./img/PaintingGreys_4.webp",
          title: "Dance Shot",
          sub:   "KarmaXPU · Compositing",
          desc:  "One of my dance shots. Played a lot with light filters and volumes to give it a dreamy look.",
        },
        {
          src:   "./img/PaintingGreys_8.webp",
          title: "Abstract Paper Spiral",
          sub:   "Houdini · KarmaXPU",
          desc:  "Fairly unrealistic, but every time I look at it it looks pretty cool and abstract.",
        },
        {
          src:   "./img/PaintingGreys_12.webp",
          title: "Shutter Trail Sequence",
          sub:   "KarmaXPU · Compositing",
          desc:  "Playing with the camera's shutter speed to get trails of people walking around the dancer.",
        },
      ],
    },


    /* ══ 02 PROCESS ══ */
    {
      type:     "text",
      id:       "process",
      navLabel: "Process",
      eyebrow:  "02 — Behind the Scenes",
      title:    "Process",
      body: `The project began with storyboarding and choreography to synchronise the narrative with the
             song's emotional rhythm. After 9 months of working on the concept and some previs shots, the
             team decided to scrap a large portion and restart with a cleaner division of labour — each
             person owning a defined type of shot. My focus was the dance sequences, grey-scale shots,
             animation layout, rendering and compositing.`,
    },

    // Sub-section: Motion Capture
    {
      type:     "subsection",
      heading:  "§ Motion Capture",
      subTitle: "Optitrack · KineFX · Retargetting",
      body: `We used the Optitrack motion capture system to record expressive dance performances, then
             imported the data into Houdini for cleanup and retargetting using KineFX. The captured
             animation formed the skeleton of all dance and figure sequences in the final video.`,
    },

    // BTS gallery — mocap
    {
      type: "gallery",
      cols: 3,
      items: [
        {
          src:       "./img/bts/PaintingGreys_bts_6.webp",
          title:     "Christina Ottoson in Mocap Suit",
          sub:       "Optitrack · BTS",
          desc:      "Christina Ottoson dancing in an Optitrack Mocap suit during the capture session.",
          labelTitle: "1",
          labelDesc: "Christina Ottoson dancing in an Optitrack mocap suit during the capture session.",
        },
        {
          src:       "./img/bts/PaintingGreys_bts_5.webp",
          title:     "Choke Scene Recording",
          sub:       "Optitrack · Scrapped Version",
          desc:      "Recording a choke scene for the earlier scrapped version of the project.",
          labelTitle: "2",
          labelDesc: "Recording a choke scene for the earlier, scrapped version of the project.",
        },
        {
          src:       "./img/bts/PaintingGreys_bts_4.webp",
          title:     "Activating Superhuman Capabilities",
          sub:       "Optitrack · BTS",
          desc:      "Me activating my superhuman capabilities to counter attack any moving motion capture threats.",
          labelTitle: "3",
          labelDesc: "Me activating my superhuman capabilities to counter attack any moving motion capture threats.",
        },
      ],
    },

    // Sub-section: Materials & Textures
    {
      type:     "subsection",
      heading:  "§ Materials &amp; Textures",
      subTitle: "Substance Designer Materials · Lena Schibany (Art Director)",
      body: `Textures were designed in Substance Designer and Photoshop primarily by art director
             Lena Schibany. Her work gave the project its distinct visual identity — a selection is
             shown below.`,
    },

    // Second gallery — materials
    {
      type: "gallery",
      cols: 3,
      items: [
        {
          src:       "./img/bts/PaintingGreys_bts_7.webp",
          title:     "Bathroom Tile Material",
          sub:       "Substance Designer · Lena Schibany",
          desc:      "Bathroom tile material by Lena Schibany, created for the previous version of the project that was later scrapped.",
          labelTitle: "1",
          labelDesc: "Bathroom tile material by Lena Schibany, created for the earlier scrapped build.",
        },
        {
          src:       "./img/bts/PaintingGreys_bts_8.webp",
          title:     "Fish Skin Material",
          sub:       "Substance Designer · Lena Schibany",
          desc:      "Fish skin material by Lena Schibany.",
          labelTitle: "2",
          labelDesc: "Fish skin material by Lena Schibany.",
        },
        {
          src:       "./img/bts/PaintingGreys_bts_9.webp",
          title:     "Wood Floor Material",
          sub:       "Substance Designer · Lena Schibany",
          desc:      "Wood floor material by Lena Schibany.",
          labelTitle: "3",
          labelDesc: "Wood floor material by Lena Schibany.",
        },
      ],
    },

    // Sub-section: FMX
    {
      type:     "subsection",
      heading:  "§ FMX 2025",
      subTitle: "Stuttgart · Presented at Conference",
      body: `FH Salzburg gave us the opportunity to present this project at FMX in Stuttgart in 2025.
             We are not as calm as we look — 240 bpm heart rate until it was over. Despite that,
             it turned out pretty well.`,
    },

    // Third gallery — FMX
    {
      type: "gallery",
      cols: 3,
      items: [
        {
          src:      "./img/Photo0.webp",
          title:    "FMX 2025 — Stuttgart",
          sub:      "FMX · Presentation",
          desc:     "Photo taken from the crowd by Gregor Jakob during our FMX presentation in Stuttgart, 2025.",
          labelDesc: "Photo taken from the crowd by Gregor Jakob. We are not as chill as we look.",
        },
      ],
    },


    /* ══ 03 LEARNINGS ══ */
    {
      type:     "text",
      id:       "learnings",
      navLabel: "Learnings",
      eyebrow:  "03 — Takeaways",
      title:    "Learnings",
      body:     "Key technical and creative skills developed over the course of this year-long project.",
    },

    {
      type: "learnings",
      blocks: [
        {
          label: "Houdini",
          tag:   "FX · Rendering",
          items: [
            "KineFX cleanup & retargetting",
            "First time working with USD",
            "Rendering with KarmaXPU",
            "Volumetric lighting for dreamy looks",
            "Camera shutter / motion blur control",
            "Simulation pass layering",
          ],
        },
        {
          label: "Pipeline & Workflow",
          tag:   "Workflow · Management",
          items: [
            "Stick to your goals",
            "Don't overscope",
            "Shot-based division of labour",
            "Managing a multi-discipline team",
            "R&D for first large Houdini project",
            "Iterating quickly after a full concept reset",
          ],
        },
      ],
    },


    /* ══ 04 MUSIC ══ */
    {
      type:     "text",
      id:       "music",
      navLabel: "Music",
      eyebrow:  "04 — The Track",
      title:    "Music",
      body:     "Painting Greys by Emmit Fenn — the track that started it all. Available on all major streaming platforms.",
    },

    {
      type:     "spotify",
      embedUrl: "https://open.spotify.com/embed/track/2Eh0J9SM2SzKnw5spcHJ1B?utm_source=generator&theme=0",
    },

  ],
};