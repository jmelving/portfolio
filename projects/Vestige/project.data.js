/* Content for the Vestige project page. Rendered by js/project-page.js.
   See tools/PROJECT_DATA.md for every field. */
window.PROJECT = {
  "title": "Vestige",
  "meta": "Realtime Environment · University Project · 2025",
  "heading": "Vestige.",
  "tagline": "One week, two environments, a lot of brutalism.",
  "facts": [
    {
      "label": "Role",
      "value": "Environment Artist"
    },
    {
      "label": "Course",
      "value": "Realtime Environment, Salzburg University of Applied Sciences"
    },
    {
      "label": "Duration",
      "value": "1 week"
    },
    {
      "label": "Year",
      "value": "2025"
    },
    {
      "label": "Tools",
      "value": "Unreal Engine 5, Houdini"
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
              "p": "<em>Vestige</em> was a one-week assignment for the Realtime Environment course at Salzburg University of Applied Sciences. The brief: gather references, block out one indoor and one outdoor scene, show both in four shots, then swap the blockout for final models and re-render the same shots for comparison."
            },
            {
              "p": "I took a screenshot every day I worked on it, so the clips further down show each shot growing from grey boxes into the finished environment."
            }
          ],
          "work": [
            {
              "ratio": "16/9",
              "media": [
                {
                  "type": "image",
                  "src": "./img/Vestiege_01.webp",
                  "title": "Still 01",
                  "sub": "Unreal Engine 5",
                  "desc": ""
                },
                {
                  "type": "image",
                  "src": "./img/Vestiege_02.webp",
                  "title": "Still 02",
                  "sub": "Unreal Engine 5",
                  "desc": ""
                },
                {
                  "type": "image",
                  "src": "./img/Vestiege_03.webp",
                  "title": "Still 03",
                  "sub": "Unreal Engine 5",
                  "desc": ""
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "indoor",
      "eyebrow": "Blockout to final",
      "title": "Indoor",
      "rows": [
        {
          "words": [
            {
              "p": "The indoor scene is a ruined, overgrown interior with light falling in from above. Of the two environments, these are the shots I'm happiest with."
            }
          ],
          "work": [
            {
              "layout": "grid2",
              "ratio": "16/9",
              "media": [
                {
                  "type": "video",
                  "src": "./vid/Indoor_1.mp4",
                  "title": "Indoor 01",
                  "sub": "Day by day · UE5",
                  "desc": ""
                },
                {
                  "type": "video",
                  "src": "./vid/Indoor_2.mp4",
                  "title": "Indoor 02",
                  "sub": "Day by day · UE5",
                  "desc": ""
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "outdoor",
      "eyebrow": "Blockout to final",
      "title": "Outdoor",
      "rows": [
        {
          "words": [
            {
              "p": "For the outdoor scene I wanted brutalist buildings in the background. That turned into both a challenge and an opportunity: it was an Unreal assignment, but a good excuse to spend some time in Houdini modeling them. It also took a lot of time away from the rest of the environment."
            },
            {
              "p": "The one thing I'm still not happy with is the rocky entrance. With better-suited assets or a bit more work on my side, it could have looked far more organic."
            }
          ],
          "work": [
            {
              "layout": "grid2",
              "ratio": "16/9",
              "media": [
                {
                  "type": "video",
                  "src": "./vid/Outdoor_1.mp4",
                  "title": "Outdoor 01",
                  "sub": "Day by day · UE5",
                  "desc": ""
                },
                {
                  "type": "video",
                  "src": "./vid/Outdoor_2.mp4",
                  "title": "Outdoor 02",
                  "sub": "Day by day · UE5",
                  "desc": ""
                }
              ]
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
              "p": "What a week of Unreal (and a little Houdini) taught me."
            }
          ],
          "work": [
            {
              "learn": [
                {
                  "label": "Unreal Engine 5",
                  "tag": "Environment",
                  "items": [
                    "Decals are extremely useful",
                    "Unreal has bugs you simply learn to live with",
                    "Using Unreal's simulation features for realistic asset placement",
                    "Always turn off auto exposure"
                  ]
                },
                {
                  "label": "Houdini",
                  "tag": "Modeling · Pipeline",
                  "items": [
                    "Bringing models into Unreal with Houdini Engine, Live Sync and HDAs",
                    "Modeling practice on the brutalist buildings"
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
      "./img/Thumbnail.webp",
      "./img/Vestiege_03.webp",
      "./img/Vestiege_01.webp",
      "./img/Vestiege_02.webp"
    ],
    "video": {
      "id": "zH8ladtiEsE",
      "platform": "youtube"
    }
  },
  "next": {
    "href": "../DontPushMyButtons/",
    "title": "Don't Push My Buttons"
  },
  "back": "../"
};
