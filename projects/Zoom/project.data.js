/* Content for the Zoom project page. Rendered by js/project-page.js.
   See tools/PROJECT_DATA.md for every field. */
window.PROJECT = {
  "title": "Zoom",
  "meta": "Music Video · Research · 2026",
  "heading": "Zoom.",
  "tagline": "Built to move on the beat.",
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
      "value": "Houdini, USD, APEX, MetaHuman"
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
              "p": "<em>Zoom</em> explores motion and style to match the rhythm and energy of a cyberpunk hip-hop music video."
            },
            {
              "p": "Rather than following a linear narrative, the project was shaped around mood, pacing, and visual contrast, allowing individual shots to function as expressive moments that respond directly to the music. The creative process was highly iterative, starting with loose visual ideas and gradually refining them through timing, animation, and material exploration."
            },
            {
              "p": "Visual motifs and mechanical elements were introduced to support the music’s structure, with repetition and variation used to reinforce rhythm and progression. The back-spine system, for example, was designed to roll and unfold in sync with movement and beats, acting as both a visual accent and a structural element."
            }
          ],
          "work": [
            {
              "media": [
                {
                  "type": "image",
                  "src": "./img/Still_0.webp",
                  "title": "Still 01",
                  "sub": "Houdini · USD",
                  "desc": ""
                },
                {
                  "type": "image",
                  "src": "./img/Still_1.webp",
                  "title": "Still 02",
                  "sub": "Houdini · USD",
                  "desc": ""
                },
                {
                  "type": "image",
                  "src": "./img/Still_2.webp",
                  "title": "Still 03",
                  "sub": "Houdini · USD",
                  "desc": ""
                },
                {
                  "type": "image",
                  "src": "./img/Still_3.webp",
                  "title": "Still 04",
                  "sub": "Houdini · USD",
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
      "title": "USD,<br/><em>Rigs &amp; Grooms</em>",
      "rows": [
        {
          "words": [
            {
              "p": "The focus was on integrating complex character and asset workflows into a USD-based pipeline. This included bringing MetaHuman facial animation into Houdini, developing groom setups for hair, and converting a wide range of assets and materials to function consistently within USD."
            },
            {
              "p": "The project also explored APEX-based animation for a mechanical system, featuring articulated back spines that roll and unfold over time. Material variations were animated across frames to support visual progression and rhythm."
            },
            {
              "p": "Character performance, mechanical motion, hair grooms and materials all stayed adjustable throughout production. This made it possible to respond quickly to changes in timing, framing, and musical emphasis as the edit evolved."
            }
          ],
          "work": [
            {
              "media": [
                {
                  "type": "video",
                  "src": "./vid/Spine_Roll.mp4",
                  "title": "Back Spine",
                  "sub": "Houdini · APEX",
                  "desc": ""
                },
                {
                  "type": "video",
                  "src": "./vid/Leg_Rig.mp4",
                  "title": "Leg Rig",
                  "sub": "Houdini · APEX",
                  "desc": ""
                },
                {
                  "type": "image",
                  "src": "./img/Spine_Unfolded.webp",
                  "title": "Spine, unfolded",
                  "sub": "Houdini",
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
      "./img/Still_0.webp",
      "./img/Still_1.webp",
      "./img/Still_2.webp",
      "./img/Still_3.webp"
    ],
    "video": {
      "id": "./vid/Zoom_Film.mp4",
      "platform": "file"
    }
  },
  "next": {
    "href": "../DeltaT/",
    "title": "DELTA-T"
  },
  "back": "../"
};
