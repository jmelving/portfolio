/* Content for the Echoes project page. Rendered by js/project-page.js.
   See tools/PROJECT_DATA.md for every field.
   Hand-tuned (texts shortened for the split layout) — the extractor leaves this file alone. */
window.PROJECT = {
  "title": "Echoes",
  "meta": "Short Film · Master Project 1 · 2024–2025",
  "heading": "Echoes.",
  "tagline": "Everyday life, until it isn’t.",
  "hero": {
    "slides": [
      "./img/ECHOES_3.webp",
      "./img/ECHOES_4.webp",
      "./img/ECHOES_1.webp",
      "./img/ECHOES_Hero.webp",
      "./img/ECHOES_2.webp",
      "./img/ECHOES_5.webp"
    ],
    "video": {
      "id": "KgtF4-e7J_Q",
      "platform": "youtube"
    }
  },
  "facts": [
    {
      "label": "Role",
      "value": "3D Generalist"
    },
    {
      "label": "Collaborators",
      "value": [
        {
          "label": "Hannah Rampitsch",
          "href": "https://rampitschhannah.com/",
          "photo": ""
        },
        {
          "label": "Christopher Raschke",
          "href": "https://christopherraschke.com/",
          "photo": ""
        },
        {
          "label": "Sina Anders",
          "href": "https://sinaistanders.myportfolio.com/",
          "photo": ""
        }
      ]
    },
    {
      "label": "Duration",
      "value": "4 months, 2024–2025"
    },
    {
      "label": "Tools",
      "value": "Houdini, Nuke, DaVinci Resolve"
    }
  ],
  "sections": [
    {
      "id": "overview",
      "eyebrow": "Project description",
      "title": "Overview",
      "words": [
        {
          "p": "Echoes explores realistic everyday scenarios gradually disrupted by an effect distorting the surrounding environment — a symbol of the destruction caused by war. Each scenario represents an essential aspect of human life that is lost in conflict: education, community, art, and safety."
        },
        {
          "p": "In the film's final moments, the distortion is revealed as the foreshadowing of a missile heading for a civilian building, and the last shot captures the full extent of the devastation."
        }
      ],
      "work": [
        {
          "media": [
            {
              "type": "image",
              "src": "./img/ECHOES_4.webp",
              "title": "Missile Through Window",
              "sub": "Jona Melvin Grobe"
            },
            {
              "type": "image",
              "src": "./img/ECHOES_3.webp",
              "title": "Library",
              "sub": "Jona Melvin Grobe"
            },
            {
              "type": "image",
              "src": "./img/ECHOES_1.webp",
              "title": "Scale",
              "sub": "Sina Anders"
            },
            {
              "type": "image",
              "src": "./img/ECHOES_2.webp",
              "title": "Table",
              "sub": "Hannah Rampitsch"
            },
            {
              "type": "image",
              "src": "./img/ECHOES_Hero.webp",
              "title": "Dice",
              "sub": "Hannah Rampitsch"
            },
            {
              "type": "image",
              "src": "./img/ECHOES_5.webp",
              "title": "Burning Building",
              "sub": "Hannah Rampitsch"
            }
          ]
        }
      ]
    },
    {
      "id": "process",
      "eyebrow": "Behind the scenes",
      "title": "Process",
      "words": [
        {
          "p": "The project began with storyboarding to synchronise the narrative with the emotional rhythm of everyday life being disrupted. Effects were developed in Houdini, rendered in Houdini's rendering systems, graded in DaVinci Resolve, and composited in Nuke."
        },
        {
          "h3": "Displacement effect",
          "small": "A shared tool across all shots"
        },
        {
          "p": "Besides handling three shots, I built a Houdini Digital Asset that gave the whole film one consistent displacement effect, intensifying as the video progresses. It starts from a user-controlled 0–1 gradient along a curve, and lets artists set direction, rotation, speed and falloffs — with live guides, so changes preview without recomputing the full effect."
        }
      ],
      "work": [
        {
          "media": [
            {
              "type": "video",
              "src": "./vid/Echoes_vid_bts_01.mp4",
              "title": "Displacement tool v1",
              "sub": "Extrudes along a custom user curve"
            },
            {
              "type": "video",
              "src": "./vid/Echoes_vid_bts_02.mp4",
              "title": "Displacement HDA",
              "sub": "The animated, evolving effect used across all shots"
            }
          ]
        }
      ]
    },
    {
      "id": "making-of",
      "eyebrow": "Making of",
      "title": "The whole<br>production",
      "words": [
        {
          "p": "A full walkthrough — environments, VFX, rendering, compositing, and the combined effort of the entire team."
        }
      ],
      "work": [
        {
          "video": {
            "id": "LC3t8ViJ4eU",
            "platform": "youtube",
            "label": "Making of",
            "poster": "./img/ECHOES_3.webp"
          }
        }
      ]
    },
    {
      "id": "learnings",
      "eyebrow": "Takeaways",
      "title": "Learnings",
      "words": [
        {
          "p": "Skills developed and deepened over the four months of production."
        }
      ],
      "work": [
        {
          "learn": [
            {
              "label": "Project",
              "tag": "Planning",
              "items": [
                "Stick to your goals",
                "Don't overscope"
              ]
            },
            {
              "label": "Houdini",
              "tag": "FX · Pipeline",
              "items": [
                "Wood destruction workflow",
                "Expanded USD pipeline, collaborating with others",
                "Creating tools tailored to others' way of thinking",
                "Digital Assets for shared FX across a team"
              ]
            }
          ]
        }
      ]
    }
  ],
  "next": {
    "href": "../PaintingGreys/",
    "title": "Painting Greys"
  },
  "back": "../"
};
