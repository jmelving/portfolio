/* Content for the Don't Push My Buttons project page. Rendered by js/project-page.js.
   See tools/PROJECT_DATA.md for every field. */
window.PROJECT = {
  "title": "Don't Push My Buttons",
  "meta": "Experimental · 2025",
  "heading": "Don't Push<br/>My Buttons.",
  "tagline": "…okay, maybe just one.",
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
      "label": "Collaborators",
      "value": [
        {
          "label": "Hannah Rampitsch",
          "href": "https://rampitschhannah.com/"
        }
      ]
    },
    {
      "label": "Year",
      "value": "2025"
    },
    {
      "label": "Tools",
      "value": "Houdini"
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
              "p": "<em>Don't Push My Buttons</em> is an experimental conceptual project exploring emotional boundaries and personal triggers through a button metaphor. It was the first project made together with Hannah Rampitsch, my now business partner at CrossDot Studio, and was completed across the month of December under considerable time pressure. The work visualises how external stimuli - stress, conflict, or social pressure - activate emotional responses, and investigates the tension between reaction and restraint."
            },
            {
              "h3": "My role",
              "small": "Across the whole film"
            },
            {
              "p": "This was a two-person project from the start: Hannah and I developed the concept together, then split the work shot by shot, and sometimes within a shot. On some, one of us did the modelling and the other the lighting; others one of us took all the way from modelling to rendering. Hannah did some really fancy shots, like the one with the cables slinging together, and also the MPM simulation of the bird poop hitting the button. I mostly worked on the layout and scene building, did most of the compositing, and put the film together with the edit and the sound design. Hannah was part of every step: she always said what she liked and what she didn't, and the film is better for it."
            }
          ],
          "work": [
            {
              "media": [
                {
                  "type": "image",
                  "src": "./img/Still_5.webp",
                  "title": "Still 1",
                  "sub": "Don't Push My Buttons · 2025",
                  "desc": "I worked on the modelling, texturing, scene build-up, compositing and rendering, and made a lighting reference for Hannah Rampitsch, who lit the shot."
                },
                {
                  "type": "image",
                  "src": "./img/Still_3.webp",
                  "title": "Still 2",
                  "sub": "Don't Push My Buttons · 2025",
                  "desc": "I worked on most of this one. The simulation, the lighting and parts of the button model weren't mine, and the textures are from Quixel."
                },
                {
                  "type": "image",
                  "src": "./img/Still_1.webp",
                  "title": "Still 3",
                  "sub": "Don't Push My Buttons · 2025",
                  "desc": "I worked on most of this one. The assets are from Quixel."
                },
                {
                  "type": "image",
                  "src": "./img/Still_2.webp",
                  "title": "Still 4",
                  "sub": "Don't Push My Buttons · 2025",
                  "desc": "I worked on most of this one. The lighting wasn't mine, and the textures are from Quixel."
                },
                {
                  "type": "image",
                  "src": "./img/Still_4.webp",
                  "title": "Still 5",
                  "sub": "Don't Push My Buttons · 2025",
                  "desc": "This one is all Hannah Rampitsch."
                },
                {
                  "type": "image",
                  "src": "./img/Still_6.webp",
                  "title": "Still 6",
                  "sub": "Don't Push My Buttons · 2025",
                  "desc": "I did the lighting on this one."
                },
                {
                  "type": "image",
                  "src": "./img/Still_7.webp",
                  "title": "Still 7",
                  "sub": "Don't Push My Buttons · 2025",
                  "desc": "I modelled the DJ desk, the safe and the acoustic foam panels, and worked on the layout and camera, the materials and the compositing."
                },
                {
                  "type": "image",
                  "src": "./img/Still_8.webp",
                  "title": "Still 8",
                  "sub": "Don't Push My Buttons · 2025",
                  "desc": "I prepped the chair asset and did the lighting, guided by Hannah Rampitsch, who had a clear vision for the shot and did everything else in it."
                },
                {
                  "type": "image",
                  "src": "./img/Still_9.webp",
                  "title": "Still 9",
                  "sub": "Don't Push My Buttons · 2025",
                  "desc": "I worked on most of this one. The lighting wasn't mine, and neither were the Quixel, human and car assets."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "process",
      "eyebrow": "Technical process",
      "title": "Process",
      "rows": [
        {
          "words": [
            {
              "p": "The core challenge of this project was establishing a <em>USD Micropipeline</em> for a two-person team, allowing Hannah and I to split work cleanly across lighting, modelling, and materials without stepping on each other. My focus was on modelling, layout, shading, and camera movements, as well as getting USD to behave exactly the way we needed it to. Sound design and editing rounded out my contributions on the post side."
            },
            {
              "h3": "USD Micropipeline",
              "small": "Building a Two-Person Pipeline from Scratch"
            },
            {
              "p": "Setting up a <em>USD-based pipeline</em> for two people meant defining clear asset structures, layer composition, and handoff points so that Hannah could work on lighting independently while I handled geometry, shading, and camera without conflicts. Getting this to actually work smoothly, especially within the time constraints of a single December month, was the most technically demanding and rewarding part of the project."
            }
          ],
          "work": [
            {
              "media": [
                {
                  "type": "video",
                  "src": "./vid/BTS_1.mp4",
                  "title": "Entry Shot Breakdown",
                  "sub": "Jona Melvin Grobe · 2025",
                  "desc": "Complete layout scene with clouds and an interactive lighting breakdown.  Responsable for all aspects except Quixel Rocks."
                },
                {
                  "type": "video",
                  "src": "./vid/BTS_2.mp4",
                  "title": "Pinball Scene breakdown.",
                  "sub": "Jona Melvin Grobe · Hannah Rampitsch · 2025",
                  "desc": "Pinball Shot breakdown. Responsable for all aspects except Lighting."
                },
                {
                  "type": "video",
                  "src": "./vid/BTS_3.mp4",
                  "title": "Bird Shit Simulation",
                  "sub": "Hannah Rampitsch · 2025",
                  "desc": "Hannah's MPM simulation for the Birdshit falling onto the button that was prepped and partly modelled by me."
                },
                {
                  "type": "video",
                  "src": "./vid/BTS_4.mp4",
                  "title": "Impact Detection System",
                  "sub": "Hannah Rampitsch · 2025",
                  "desc": "Hannah's impact detection system driving a long transition shot."
                }
              ],
              "layout": "grid2"
            }
          ]
        }
      ]
    },
    {
      "id": "learnings",
      "eyebrow": "Takeaways",
      "title": "Learnings",
      "rows": [
        {
          "words": [
            {
              "p": "Key skills developed and deepened over the course of the project."
            }
          ],
          "work": [
            {
              "learn": [
                {
                  "label": "USD Pipeline",
                  "tag": "Pipeline · Team",
                  "items": [
                    "Setting up a USD micropipeline for a 2-person team",
                    "Splitting work across lighting, modelling, and materials",
                    "Asset referencing and layer composition in practice",
                    "Non-destructive handoff between collaborators"
                  ]
                },
                {
                  "label": "Production",
                  "tag": "3D · Post",
                  "items": [
                    "Modelling and scene layout",
                    "Shading and look development",
                    "Camera animation and framing",
                    "Sound design and editing"
                  ]
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
      "./img/Still_5.webp",
      "./img/Still_2.webp",
      "./img/Still_3.webp",
      "./img/Still_4.webp"
    ],
    "video": {
      "id": "rn-6YX8egKU",
      "platform": "youtube"
    }
  },
  "next": {
    "href": "../DecadesAhead/",
    "title": "Decades Ahead"
  },
  "back": "../"
};
