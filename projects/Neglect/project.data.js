/* Content for the Neglect project page. Rendered by js/project-page.js.
   See tools/PROJECT_DATA.md for every field. Hand-written. */
window.PROJECT = {
  "title": "Neglect",
  "meta": "Data Visualisation · Short Film",
  "heading": "Neglect.",
  "tagline": "Real numbers, poured into a glass.",
  "hero": {
    "slides": [
      "./img/Neglect_USA.webp",
      "./img/Neglect_Germany.webp",
      "./img/Neglect_Austria.webp",
      "./img/Neglect_Glass.webp",
      "./img/Neglect_Overflow.webp"
    ]
  },
  "facts": [
    {
      "label": "Role",
      "value": "Data, simulation, rendering"
    },
    {
      "label": "Data",
      "value": "World Health Organization API"
    },
    {
      "label": "Length",
      "value": "1 minute"
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
      "words": [
        {
          "p": "<em>Neglect</em> is a one-minute data visualisation film about road accidents related to drinking alcohol. The numbers come straight from the World Health Organization: I pulled them through the WHO's data API, compared Germany, Austria and the United States, and turned each country's figure into a rigid body simulation in Houdini."
        },
        {
          "p": "Cars pour into a beer glass above a city, and the amount of cars roughly follows the data. For the United States the glass fills to the top. The film ends on one line: all of these accidents could have been prevented."
        }
      ],
      "work": [
        {
          "media": [
            {
              "type": "image",
              "src": "./img/Neglect_Glass.webp",
              "title": "The glass",
              "sub": "Houdini"
            },
            {
              "type": "image",
              "src": "./img/Neglect_Germany.webp",
              "title": "Germany",
              "sub": "Per 10 million in population"
            },
            {
              "type": "image",
              "src": "./img/Neglect_Overflow.webp",
              "title": "Overflow",
              "sub": "RBD simulation"
            }
          ]
        }
      ]
    },
    {
      "id": "data",
      "eyebrow": "From data to simulation",
      "title": "The data",
      "words": [
        {
          "p": "The WHO publishes its health statistics through a public API. I queried it for one specific indicator, road accidents related to drinking alcohol, and read out the figures for the three countries."
        },
        {
          "p": "To make them comparable, every value is shown per 10 million in population. Those values then set the simulation: the higher a country's count, the more cars fall into the glass, while the counter on screen climbs with them."
        },
        {
          "h3": "Cars instead of points",
          "small": "Rigid bodies, not a chart"
        },
        {
          "p": "Each accident stays a physical object instead of a dot on a graph. Cars pile up, collide and spill, so the difference between the countries is something you see filling up rather than read off an axis."
        }
      ],
      "work": [
        {
          "media": [
            {
              "type": "video",
              "src": "./vid/Neglect_Germany.mp4",
              "title": "Germany",
              "sub": "Counting up to 20,000"
            },
            {
              "type": "video",
              "src": "./vid/Neglect_Austria.mp4",
              "title": "Austria",
              "sub": "Counting up to 26,100"
            },
            {
              "type": "video",
              "src": "./vid/Neglect_USA.mp4",
              "title": "United States",
              "sub": "Counting up to 63,800"
            }
          ]
        }
      ]
    },
    {
      "id": "film",
      "eyebrow": "The film",
      "title": "Neglect",
      "words": [
        {
          "p": "The full film. Open it for sound."
        }
      ],
      "work": [
        {
          "media": [
            {
              "type": "video",
              "src": "./vid/Neglect_Film.mp4",
              "title": "Neglect",
              "sub": "Full film · 1 min"
            }
          ]
        }
      ]
    }
  ],
  "next": {
    "href": "../DontPushMyButtons/",
    "title": "Don't Push My Buttons"
  },
  "back": "../"
};
