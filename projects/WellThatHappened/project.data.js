/* Content for the Well That Happened project page. Rendered by js/project-page.js.
   See tools/PROJECT_DATA.md for every field. */
window.PROJECT = {
  "title": "Well That Happened",
  "meta": "Short · Experimental · 2026",
  "heading": "Well That<br/>Happened.",
  "tagline": "It started with one penguin losing its balance.",
  "facts": [
    {
      "label": "Role",
      "value": "CG Generalist &amp; Technical Artist"
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
      "value": "Houdini, Karma XPU, COPs"
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
              "p": "<em>Well That Happened</em> explores the creation of stylized assets and character-focused workflows in Houdini. The initial concept centered on a group of penguins gradually losing balance, falling over, and ultimately leading to the sinking of the Titanic. This idea served as a narrative foundation to experiment with visual storytelling through motion, staging, and progression."
            },
            {
              "p": "Overall, the project functioned as both a technical and creative exploration, combining character design, fur workflows, and procedural techniques within a single cohesive setup."
            }
          ],
          "work": [
            {
              "media": [
                {
                  "type": "image",
                  "src": "./img/Still_0.webp",
                  "title": "Still 01",
                  "sub": "Houdini · Karma XPU",
                  "desc": ""
                },
                {
                  "type": "image",
                  "src": "./img/Still_1.webp",
                  "title": "Still 02",
                  "sub": "Houdini · Karma XPU",
                  "desc": ""
                },
                {
                  "type": "image",
                  "src": "./img/Still_2.webp",
                  "title": "Still 03",
                  "sub": "Houdini · Karma XPU",
                  "desc": ""
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "focus",
      "eyebrow": "Technical focus",
      "title": "Penguins,<br/><em>Fur &amp; Sculpting</em>",
      "rows": [
        {
          "words": [
            {
              "p": "The focus was on the creation of penguin characters, with particular attention given to fur generation and sculpting workflows in Houdini. A range of techniques was explored to develop stylized yet coherent character forms, from base modeling and procedural sculpting to the refinement of fur systems and surface details."
            },
            {
              "p": "Rendering was carried out using Karma XPU, allowing for efficient look development and iteration, while COPs was used for stylized asset generation and texture-driven sculpting. Together, these tools supported a flexible, procedural workflow that enabled rapid experimentation and consistent results across assets."
            }
          ],
          "work": [
            {
              "media": [
                {
                  "type": "video",
                  "src": "./vid/Penguin_Model.mp4",
                  "title": "Penguin Model",
                  "sub": "Houdini",
                  "desc": ""
                },
                {
                  "type": "video",
                  "src": "./vid/Penguin_Fur.mp4",
                  "title": "Fur",
                  "sub": "Houdini · Karma XPU",
                  "desc": ""
                },
                {
                  "type": "video",
                  "src": "./vid/Sculpt_COPs.mp4",
                  "title": "Procedural Sculpting",
                  "sub": "Houdini · COPs",
                  "desc": ""
                }
              ]
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
              "p": "Asset creation and iteration were driven procedurally, allowing for efficient exploration of variations."
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
              ]
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
    }
  },
  "next": {
    "href": "../Echoes/",
    "title": "Echoes"
  },
  "back": "../"
};
