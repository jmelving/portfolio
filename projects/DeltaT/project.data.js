/* Content for the DELTA-T project page. Rendered by js/project-page.js.
   See tools/PROJECT_DATA.md for every field. */
window.PROJECT = {
  "title": "DELTA-T",
  "meta": "Short · Experimental · 2026",
  "heading": "Delta-T.",
  "tagline": "Some wars are fought on the inside.",
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
      "value": "Houdini, APEX, Karma"
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
              "p": "<em>DELTA-T</em> is a narrative-driven project that explores how a child’s environment shapes their personality over time."
            },
            {
              "p": "The project addresses serious themes such as bullying, broken relationships, and emotional isolation, portraying how repeated experiences gradually accumulate and manifest as an internal conflict. As time progresses, this growing pressure is represented as an escalating “war” within the child’s mind."
            },
            {
              "p": "The focus was on visual storytelling and atmosphere, using symbolic imagery and progression to communicate psychological states rather than explicit events. Through controlled pacing, staging, and transformation of elements, the project emphasizes the long-term impact of environmental influences and unresolved trauma."
            }
          ],
          "work": [
            {
              "media": [
                {
                  "type": "image",
                  "src": "./img/Still_01.webp",
                  "title": "Still 01",
                  "sub": "Houdini · Karma",
                  "desc": ""
                },
                {
                  "type": "image",
                  "src": "./img/Still_02.webp",
                  "title": "Still 02",
                  "sub": "Houdini · Karma",
                  "desc": ""
                },
                {
                  "type": "image",
                  "src": "./img/Still_03.webp",
                  "title": "Still 03",
                  "sub": "Houdini · Karma",
                  "desc": ""
                },
                {
                  "type": "image",
                  "src": "./img/Still_04.webp",
                  "title": "Still 04",
                  "sub": "Houdini · Karma",
                  "desc": ""
                },
                {
                  "type": "image",
                  "src": "./img/Still_05.webp",
                  "title": "Still 05",
                  "sub": "Houdini · Karma",
                  "desc": ""
                },
                {
                  "type": "image",
                  "src": "./img/Still_06.webp",
                  "title": "Still 06",
                  "sub": "Houdini · Karma",
                  "desc": ""
                },
                {
                  "type": "image",
                  "src": "./img/Still_07.webp",
                  "title": "Still 07",
                  "sub": "Houdini · Karma",
                  "desc": ""
                },
                {
                  "type": "image",
                  "src": "./img/Still_08.webp",
                  "title": "Still 08",
                  "sub": "Houdini · Karma",
                  "desc": ""
                },
                {
                  "type": "image",
                  "src": "./img/Still_09.webp",
                  "title": "Still 09",
                  "sub": "Houdini · Karma",
                  "desc": ""
                },
                {
                  "type": "image",
                  "src": "./img/Still_10.webp",
                  "title": "Still 10",
                  "sub": "Houdini · Karma",
                  "desc": ""
                },
                {
                  "type": "image",
                  "src": "./img/Still_11.webp",
                  "title": "Still 11",
                  "sub": "Houdini · Karma",
                  "desc": ""
                },
                {
                  "type": "image",
                  "src": "./img/Still_12.webp",
                  "title": "Still 12",
                  "sub": "Houdini · Karma",
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
      "title": "Rigging,<br/><em>Grooms &amp; Volumes</em>",
      "rows": [
        {
          "words": [
            {
              "p": "The focus was on managing a complex, multi-shot pipeline with a strong emphasis on deformation, rigging, volumetrics, and environmental detail."
            },
            {
              "p": "An APEX rig was developed for both the character and its underlying skeleton, enabling consistent and flexible deformation across animation and shot variations. The project involved deforming groomed assets, maintaining rig stability, and integrating character motion with volumetric elements."
            },
            {
              "p": "In addition, extensive work was done on volumes and atmospheric effects, including layered dust and fine detail across a large number of shots. A key challenge was ensuring visual continuity and performance while handling the overall scope of the project, with an emphasis on scalable, production-ready workflows."
            }
          ],
          "work": [
            {
              "media": [
                {
                  "type": "video",
                  "src": "./vid/BTS_Clock.mp4",
                  "title": "Clock",
                  "sub": "Houdini",
                  "desc": ""
                },
                {
                  "type": "video",
                  "src": "./vid/BTS_Skeleton_Deer.mp4",
                  "title": "Deer Skeleton Rig",
                  "sub": "Houdini · APEX",
                  "desc": ""
                },
                {
                  "type": "video",
                  "src": "./vid/BTS_Teddy.mp4",
                  "title": "Teddy Groom",
                  "sub": "Houdini · Grooming",
                  "desc": ""
                }
              ],
              "ratio": "5/4"
            }
          ]
        }
      ]
    }
  ],
  "hero": {
    "slides": [
      "./img/Still_07.webp",
      "./img/Still_05.webp",
      "./img/Still_04.webp",
      "./img/Still_11.webp"
    ],
    "loop": "./vid/BTS_MainVid.mp4",
    "video": {
      "id": "./vid/DeltaT_Film.mp4",
      "platform": "file"
    }
  },
  "next": {
    "href": "../WellThatHappened/",
    "title": "Well That Happened"
  },
  "back": "../"
};
