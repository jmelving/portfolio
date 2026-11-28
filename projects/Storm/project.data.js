/* Content for the STORM project page. Rendered by js/project-page.js.
   See tools/PROJECT_DATA.md for every field. */
window.PROJECT = {
  "title": "STORM",
  "meta": "Short · Personal Project · 2025",
  "heading": "STORM.",
  "tagline": "The crowd comes at you like rain.",
  "facts": [
    {
      "label": "Role",
      "value": "Everything except the character model: rigging, shading, FX, lighting, comp, sound design &amp; voice"
    },
    {
      "label": "Year",
      "value": "2025"
    },
    {
      "label": "Tools",
      "value": "Houdini, Karma, Nuke"
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
              "p": "The brief was simple: make something with rain. <em>STORM</em> turns it into the view of a riot police officer at a protest. The rain stands for the people coming towards you, and the work is to hold your shield up against them, as if it were only weather."
            },
            {
              "p": "It began as a single shot, a rain simulation, and then escalated a bit. More shots came around it, then sound design and a voice in the background, and in the end it had turned into a complete short of its own."
            },
            {
              "p": "Most of the work went into the last shot, the rain. The shots before it were rendered under time pressure and are rougher than I would like; the rain shot is where the time went."
            }
          ],
          "work": [
            {
              "media": [
                { "type": "image", "src": "./img/Still_1.webp", "title": "Shield", "sub": "Houdini · Karma", "desc": "" },
                { "type": "image", "src": "./img/Still_2.webp", "title": "Red", "sub": "Houdini · Karma", "desc": "" },
                { "type": "image", "src": "./img/Still_4.webp", "title": "Fire", "sub": "Houdini · Karma", "desc": "" },
                { "type": "image", "src": "./img/Still_5.webp", "title": "From above", "sub": "Houdini · Karma", "desc": "" },
                { "type": "image", "src": "./img/Still_6.webp", "title": "Rain, close", "sub": "Houdini · Karma", "desc": "" }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "rain",
      "eyebrow": "The shot it started with",
      "title": "The<br/><em>rain</em>",
      "rows": [
        {
          "words": [
            {
              "p": "The rain shot is the one the whole project grew out of, and the one that got most of the time: an officer behind his shield, close up, the rain driving against him like a crowd pushing forward."
            },
            {
              "p": "The drops don't just fall past the surfaces, they land on them. With point cloud lookups in the Karma shader, every drop that hits the officer or his shield leaves its mark in the material, right where it struck."
            },
            {
              "p": "The officer himself is an existing character model. It came without a rig or materials, so the rigging and the complete shader setup were mine, along with everything else in the film."
            },
            {
              "p": "Everything was simulated and rendered in Houdini with Karma, and composited in Nuke."
            }
          ],
          "work": [
            {
              "media": [
                { "type": "video", "src": "./vid/Rain_Shot.mp4", "title": "Rain shot", "sub": "Houdini · Karma · Nuke", "desc": "" }
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
      "./img/Still_2.webp"
    ],
    "video": {
      "id": "./vid/Storm_Film.mp4",
      "platform": "file"
    }
  },
  "next": {
    "href": "../DontPushMyButtons/",
    "title": "Don't Push My Buttons"
  },
  "back": "../"
};
