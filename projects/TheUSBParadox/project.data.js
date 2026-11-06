/* Content for the The USB Paradox project page. Rendered by js/project-page.js.
   See tools/PROJECT_DATA.md for every field. */
window.PROJECT = {
  "title": "The USB Paradox",
  "meta": "Advertisement · R&D · 2024",
  "heading": "The USB<br/>Paradox.",
  "tagline": "…it’s always the wrong side first.",
  "facts": [
    {
      "label": "Role",
      "value": "3D Generalist, R&amp;D"
    },
    {
      "label": "Collaborators",
      "value": [
        {
          "label": "Felix Foltas",
          "href": "https://www.linkedin.com/in/felixfoltas/"
        },
        {
          "label": "Rosemarie Haider",
          "href": "https://www.linkedin.com/in/rosemarie-haider-b279a72a4/"
        },
        {
          "label": "Philipp John",
          "href": "https://www.linkedin.com/in/philipp-john-0ba89b223/"
        },
        {
          "label": "Marco Mittendorfer",
          "href": "https://www.linkedin.com/in/marco-mittendorfer/"
        },
        {
          "label": "Renato Nunes",
          "href": "https://www.linkedin.com/in/rntovfx/"
        },
        {
          "label": "Jonas Perkmann",
          "href": "https://www.linkedin.com/in/jonas-perkmann-aab577254/"
        },
        {
          "label": "Jan Pscheidt",
          "href": "https://www.linkedin.com/in/jan-pscheidt-332a6a304/"
        },
        {
          "label": "Bernhard Riedl",
          "href": "https://bernhardriedl.net/"
        },
        {
          "label": "Nico Urthaler",
          "href": "https://www.linkedin.com/in/nico-urthale/"
        },
        {
          "label": "Clemens Willberger",
          "href": "https://www.linkedin.com/in/clemenswilberger/"
        }
      ]
    },
    {
      "label": "Duration",
      "value": "2 Months",
      "secondary": "2024"
    },
    {
      "label": "Tools",
      "value": "Houdini, Nuke"
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
              "p": "I was approached by Clemens Willberger to assist during the Research &amp; Development phase. My work focused on creating and refining key visual effects — lightning strikes, water droplets, and volumetric lighting — giving the compositing team a versatile toolkit to work with."
            }
          ],
          "work": [
            {
              "media": [
                {
                  "type": "image",
                  "src": "./img/USB_0.webp",
                  "title": "Film Still 1",
                  "sub": "USB Paradox · 2024",
                  "desc": ""
                },
                {
                  "type": "image",
                  "src": "./img/USB_1.webp",
                  "title": "Film Still 2",
                  "sub": "USB Paradox · 2024",
                  "desc": ""
                },
                {
                  "type": "image",
                  "src": "./img/USB_2.webp",
                  "title": "Film Still 3",
                  "sub": "USB Paradox · 2024",
                  "desc": ""
                },
                {
                  "type": "image",
                  "src": "./img/USB_3.webp",
                  "title": "Film Still 4",
                  "sub": "USB Paradox · 2024",
                  "desc": ""
                },
                {
                  "type": "image",
                  "src": "./img/USB_4.webp",
                  "title": "Film Still 5",
                  "sub": "USB Paradox · 2024",
                  "desc": ""
                },
                {
                  "type": "image",
                  "src": "./img/USB_5.webp",
                  "title": "Film Still 6",
                  "sub": "R&D · Compositing",
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
              "p": "My role was not to create the final image but to build efficient workflows and reusable assets that could accelerate production — spanning water droplet rendering, lightning generation, volumetric dome lighting, HDRIs and cloud assets."
            },
            {
              "h3": "Waterdroplets",
              "small": "Sliding Water on Surfaces"
            },
            {
              "p": "Starting with a fully rendered approach in KarmaXPU, I discovered that simulating it in Nuke via displacement offered significantly more control — and near-realtime feedback."
            }
          ],
          "work": [
            {
              "media": [
                {
                  "type": "video",
                  "src": "./vid/HydroGlide_Glass_Test.mp4",
                  "title": "First Render Test on a Glass Dome",
                  "sub": "KarmaXPU · Render",
                  "desc": "Initial render-based approach to simulate water sliding down a glass dome using texture based displacement."
                }
              ]
            },
            {
              "media": [
                {
                  "type": "video",
                  "src": "./vid/Inverted_Waterdrops_v3.mp4",
                  "title": "Waterdrop Test v3",
                  "sub": "KarmaXPU · Simulation",
                  "desc": "Refined simulation pass using a flip fluid approach in Houdini, with improved interaction and more visually interesting droplet shapes. All fully rendered. But kinda slow for iterative work."
                },
                {
                  "type": "video",
                  "src": "./vid/InvertedHydroglide_v02.mp4",
                  "title": "Hydroglide with added Set Pieces",
                  "sub": "Houdini · Compositing",
                  "desc": "Simulating water sliding down the actual set pieces in Houdini, using a flip fluid approach with added forces to create a more dynamic and visually interesting flow."
                },
                {
                  "type": "video",
                  "src": "./vid/Hydroglide_v5 1.mp4",
                  "title": "Nuke ST-Map Displacement v5",
                  "sub": "Nuke · Near-Realtime",
                  "desc": "Final Nuke-based approach using ST-Map displacement, allowing for near-realtime feedback and greater control over the water droplet animation."
                }
              ],
              "layout": "row3",
              "ratio": "16/9"
            }
          ]
        },
        {
          "words": [
            {
              "h3": "Lightning",
              "small": "Strikes, Branches & Flicker"
            },
            {
              "p": "Starting from a point cloud architecture, I progressively added branching, twitching, and multi-path switching — delivering over 40 variations to the team."
            }
          ],
          "work": [
            {
              "media": [
                {
                  "type": "image",
                  "src": "./img/bts/BTS_2.webp",
                  "title": "Point Cloud & Shortest Path",
                  "sub": "Houdini · R&D",
                  "desc": "Lightning forms when electrical discharge follows the path of least resistance through the air. Using a shortest-path algorithm allows multiple lightning branches to rapidly propagate between regions of high voltage, creating the characteristic streaking patterns."
                },
                {
                  "type": "image",
                  "src": "./img/bts/BTS_4.webp",
                  "title": "Geometry Light Test",
                  "sub": "KarmaXPU · R&D",
                  "desc": "Early test to see if we could render the lightning geometry as a geometry light. This resolved very slow though and in subsequent tests I switched to rendering the lightning with instanced pointlights."
                },
                {
                  "type": "image",
                  "src": "./img/bts/BTS_3.webp",
                  "title": "Instanced Point Light Render",
                  "sub": "Karma · R&D",
                  "desc": "Early test to see if we could render the lightning geometry as a geometry light. This resolved very slow though and in subsequent tests I switched to rendering the lightning with instanced pointlights."
                },
                {
                  "type": "video",
                  "src": "./vid/LightningStrikes_Inverted_V1.mp4",
                  "title": "Lightning Strikes V1",
                  "sub": "KarmaXPU · Animation",
                  "desc": "First animated output of the lightning strikes achieved by carving the shortest path links and changing the end point seed slightly. Rendered with instanced point lights in KarmaXPU."
                },
                {
                  "type": "video",
                  "src": "./vid/Lightning_Inverted_v03.mp4",
                  "title": "Branching & Flicker",
                  "sub": "Houdini · FX",
                  "desc": "I added more visual interest to the lightning by introducing more branching and flickering. Branching was achieved by randomly splitting the shortest path links at certain intervals. Flickering was implemented by randomly varying the intensity of the instanced point lights over time."
                },
                {
                  "type": "video",
                  "src": "./vid/Lighting Comp Makeoff.mp4",
                  "title": "Volume + Light AOV Separation",
                  "sub": "KarmaXPU · Compositing",
                  "desc": "To give the compositing team more control over the lightning, I separated the volume and light AOVs in render. This way, they could adjust the intensity and color of the lightning in post without affecting the volumetric lighting."
                }
              ]
            },
            {
              "media": [
                {
                  "type": "video",
                  "src": "./vid/INV_S02_Lightning_V012.mp4",
                  "title": "Full Composite Reference S02",
                  "sub": "KarmaXPU + Nuke",
                  "desc": "I put together a quick experiment to show how these effects could be combined. I added some spaceship materials and used both volumetric rendering for the close clouds and cards I rendered out from Houdini in compositing for the background. Spaceship by Jan Pscheidt."
                }
              ]
            }
          ]
        },
        {
          "words": [
            {
              "h3": "Lighting",
              "small": "Spot Lights, Uniform Sampling & Variance"
            },
            {
              "p": "A rather small but important part was to figure out how to get the spotlights in front of the spaceship to light the clouds and environment without causing too much noise in render. I experimented with different sampling techniques and found that using uniform sampling for the direct lighting of the volumetric environment, gave me the best results in terms of quality and performance. Of course rendering this out as an additional AOV pass would yield the biggest benefit for the compositing"
            }
          ],
          "work": [
            {
              "media": [
                {
                  "type": "video",
                  "src": "./vid/InvertedDomelight_v01.mp4",
                  "title": "Spot Light AOV Breakdown",
                  "sub": "KarmaXPU · Passes",
                  "desc": "All render passes getting combined into the final result."
                },
                {
                  "type": "video",
                  "src": "./vid/InvertedLightDome_Test_v04.mp4",
                  "title": "Dome Light Test v04",
                  "sub": "KarmaXPU · Volumetrics",
                  "desc": "Rendering of a test scene with the spotlight setup and uniform sampling to reduce noise for the spotlight pass. This gives really cool dynamic results, when the lights face the camera and ignite the volume surrounding it."
                }
              ]
            }
          ]
        },
        {
          "words": [
            {
              "h3": "HDRIs & Clouds",
              "small": "360° Environment Library"
            },
            {
              "p": "I built a set of clouds and HDRIs &amp; HDR Images deployable at any angle to serve all the different shots. More organic foreground clouds were sourced from the VRAY library."
            }
          ],
          "work": [
            {
              "media": [
                {
                  "type": "image",
                  "src": "./img/bts/BTS_5.webp",
                  "title": "HDRI Setup",
                  "sub": "Houdini · Environment",
                  "desc": ""
                },
                {
                  "type": "image",
                  "src": "./img/bts/BTS_6.webp",
                  "title": "HDR Still 2",
                  "sub": "Houdini · VDB",
                  "desc": ""
                },
                {
                  "type": "image",
                  "src": "./img/bts/BTS_7.webp",
                  "title": "HDRI Bright Top Light",
                  "sub": "Houdini · Render",
                  "desc": ""
                },
                {
                  "type": "image",
                  "src": "./img/bts/BTS_8.webp",
                  "title": "HDRI Dark Stormy Environment",
                  "sub": "KarmaXPU · Lookdev",
                  "desc": ""
                }
              ]
            },
            {
              "media": [
                {
                  "type": "video",
                  "src": "./vid/Inverted_Environment_HDRI_Showoff.mp4",
                  "title": "HDRI Realtime Preview",
                  "sub": "Houdini Vulkan",
                  "desc": ""
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "breakdown",
      "eyebrow": "Full production breakdown",
      "title": "Complete<br/><em>Breakdown</em>",
      "rows": [
        {
          "words": [
            {
              "p": "The complete breakdown covers the full scope of production — rendering, compositing, lighting, modeling and the combined effort of the entire team."
            }
          ],
          "work": [
            {
              "video": {
                "id": "1075776466",
                "platform": "vimeo",
                "label": "The USB Paradox — Complete Breakdown"
              }
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
              "p": "Key technical skills developed and deepened over the course of the R&amp;D process."
            }
          ],
          "work": [
            {
              "learn": [
                {
                  "label": "Nuke",
                  "tag": "Compositing",
                  "items": [
                    "Nuke 3D System",
                    "3D Cards & HDRIs",
                    "ST-Map displacement for water simulation",
                    "Various distortion methods",
                    "Layer separation & compositing passes",
                    "Realtime-proxy workflow for fast iteration"
                  ]
                },
                {
                  "label": "Houdini",
                  "tag": "FX · Rendering",
                  "items": [
                    "360° rendering in KarmaXPU",
                    "Volumetric & cloud rendering",
                    "Water effects on geometry",
                    "Procedural lightning generation",
                    "Uniform vs variance sampling in Karma",
                    "Dome light rendering & isolation passes",
                    "Point cloud path-finding for FX",
                    "HDRI & environment asset creation"
                  ]
                },
                {
                  "label": "Pipeline",
                  "tag": "Workflow · R&D",
                  "items": [
                    "R&D asset handoff workflow",
                    "Rendering elements separately for compositing control",
                    "Building reusable FX libraries",
                    "Communicating technical constraints to directors"
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
      "./img/USB_3.webp",
      "./img/USB_4.webp",
      "./img/USB_1.webp",
      "./img/thumbnail.webp"
    ],
    "video": {
      "id": "1066698349",
      "platform": "vimeo"
    }
  },
  "next": {
    "href": "../WithoutYou/",
    "title": "Without You"
  },
  "back": "../"
};
