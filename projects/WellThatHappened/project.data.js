/* Content for the Well That Happened project page. Rendered by js/project-page.js.
   See tools/PROJECT_DATA.md for every field. */
window.PROJECT = {
  "title": "Well That Happened",
  "meta": "Short Ad · 2026",
  "heading": "Well That<br/>Happened.",
  "tagline": "All because one caught a cold.",
  "facts": [
    {
      "label": "Role",
      "value": "All aspects"
    },
    {
      "label": "Production",
      "value": [
        {
          "label": "CrossDot Studio",
          "href": "https://crossdot.studio/"
        }
      ]
    },
    {
      "label": "Year",
      "value": "2026"
    },
    {
      "label": "Tools",
      "value": "Houdini, Karma XPU, COPs, Nuke, DaVinci Resolve"
    }
  ],
  "sections": [
    {
      "id": "overview",
      "eyebrow": "Project description",
      "title": "Overview",
      "rows": [
        {
          "words": [
            {
              "p": "<em>Well That Happened</em> started out much bigger: a colony of penguins losing their balance one after another, until the chain reaction ends up sinking the Titanic. With a presentation due at the same time, that idea got a little too tight, so I rewrote it into a short ad and cut the longer original, cross-references and all."
            },
            {
              "p": "At its core it was a pipeline project: building a setup for stylized assets in Houdini that works as smoothly as possible for this kind of short, playful film, and a first proper go at fur generation. Add some snow, some ice and a look loosely inspired by <em>Ice Age</em>, and that was the style I had a lot of fun with."
            }
          ],
          "work": [
            {
              "media": [
                {
                  "type": "image",
                  "src": "./img/Still_1.webp",
                  "title": "Still 01",
                  "sub": "Houdini · Karma XPU",
                  "desc": ""
                },
                {
                  "type": "image",
                  "src": "./img/Still_2.webp",
                  "title": "Still 02",
                  "sub": "Houdini · Karma XPU",
                  "desc": ""
                },
                {
                  "type": "image",
                  "src": "./img/Still_0.webp",
                  "title": "Still 03",
                  "sub": "Houdini · Karma XPU",
                  "desc": ""
                }
              ],
              "ratio": "16/9"
            }
          ]
        }
      ]
    },
    {
      "id": "process",
      "eyebrow": "Behind the scenes",
      "title": "Process",
      "rows": [
        {
          "words": [
            {
              "p": "Almost everything happened in Houdini: modeling and procedural sculpting of the penguins, the fur, stylized textures and assets built in COPs, and look development and rendering in Karma XPU, which kept iterations fast. A little Nuke on top, and that was it."
            },
            {
              "p": "Asset creation stayed procedural throughout, so variations of penguins, snow and ice were quick to explore. The edit and the sound design were done in DaVinci Resolve, by me as well."
            }
          ],
          "work": [
            {
              "media": [
                {
                  "type": "video",
                  "src": "./vid/Penguin_BTS.mp4",
                  "title": "Stylized Penguin",
                  "sub": "Houdini · Character FX",
                  "desc": ""
                },
                {
                  "type": "video",
                  "src": "./vid/StylizedTexture_workflow.mp4",
                  "title": "Stylized Texture Workflow",
                  "sub": "Houdini · COPs",
                  "desc": ""
                }
              ],
              "layout": "row3",
              "ratio": "4/5"
            }
          ]
        }
      ]
    }
  ],
  "hero": {
    "slides": [
      "./img/Still_1.webp",
      "./img/Still_2.webp",
      "./img/Still_0.webp"
    ],
    "video": {
      "id": "./vid/WellThatHappened_Film.mp4",
      "platform": "file"
    },
    "loop": "./vid/Preview_Loop.mp4"
  },
  "next": {
    "href": "../Echoes/",
    "title": "Echoes"
  },
  "back": "../"
};
