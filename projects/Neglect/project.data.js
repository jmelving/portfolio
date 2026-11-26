/* Content for the Neglect project page. Rendered by js/project-page.js.
   See tools/PROJECT_DATA.md for every field. Hand-written from the project documentation:
   like the PDF, every process image sits in its own row with its explanation right next to it. */
(() => {
const img = (src, title, sub) => ({ type: "image", src, title, sub });
const one = m => [{ layout: "stack", media: [m] }];

window.PROJECT = {
  title:   "Neglect",
  meta:    "Data Visualisation Test · Personal Project · 2024",
  heading: "Neglect.",
  tagline: "A small first test in data visualisation.",
  hero: {
    slides: [
      "./img/Neglect_USA.webp",
      "./img/Neglect_Germany.webp",
      "./img/Neglect_Austria.webp",
      "./img/Neglect_Glass.webp",
      "./img/Neglect_Overflow.webp"
    ],
    video: { id: "./vid/Neglect_Film.mp4", platform: "file" }
  },
  facts: [
    { label: "Role",   value: "Data, FX, rendering" },
    { label: "Data",   value: "WHO Global Health Observatory API" },
    { label: "Year",   value: "2024" },
    { label: "Tools",  value: "Python, Houdini, Nuke, DaVinci Resolve" }
  ],

  sections: [
    {
      id: "overview",
      eyebrow: "Project description",
      title: "Overview",
      words: [
        { p: "This was a quick personal experiment: my first try at pulling real data from an API and visualising it in Houdini. The focus was on the workflow, from request to render, not on a polished final film." },
        { p: "<em>Neglect</em> is a one-minute data visualisation film about road accidents related to drinking alcohol. The numbers come straight from the World Health Organization's public API. I compared Germany, Austria and the United States and turned each country's figure into a rigid body simulation in Houdini." },
        { p: "Instead of a graph, cars pour into a beer glass above a city, one glass per country, and the amount of cars follows the data. The film ends on one line: all of these accidents could have been prevented." },
        { p: "Below is the whole workflow, from the first API request to the final comp." }
      ],
      work: [{
        ratio: "16/9",
        media: [
          img("./img/Neglect_Glass.webp",    "The glass", "Houdini"),
          img("./img/Neglect_Germany.webp",  "Germany",   "Counter driven by the data"),
          img("./img/Neglect_Overflow.webp", "Overflow",  "RBD simulation")
        ]
      }]
    },

    /* ── Step 1: the API ── */
    {
      id: "api",
      eyebrow: "Step 1 · The API",
      title: "Finding<br>the data",
      rows: [
        {
          words: [
            { h3: "Exploring the WHO API", small: "Indicators, dimensions, filters" },
            { p: "The WHO publishes its health statistics through the Global Health Observatory, an OData API with its own system of indicators and dimensions. I didn't know it, so I explored it step by step." },
            { p: "First I listed every indicator, then filtered for names containing “Alcohol”, then “Alcohol” and “harm”. Each step narrowed it down until I found the one I wanted: alcohol-related road traffic accidents per 100,000 people (<em>SA_0000001470</em>)." },
            { p: "I kept every URL I tried as a comment at the top of the script, so the search stays traceable." }
          ],
          work: one(img("./img/process/code_resources.webp", "The search", "Every request kept as a note"))
        },
        {
          words: [
            { h3: "Request and save", small: "Python · requests, json" },
            { p: "The request itself is a small block I reused for every URL: send a GET request, check that the status code is 200, and write the answer to a JSON file. Otherwise it prints the error code." },
            { p: "Writing the JSON with an indent of four spaces keeps the long files readable, which helped a lot while working out the structure." },
            { p: "The final request filters the indicator down to three countries by their <em>SpatialDim</em> code: AUT, DEU and USA." }
          ],
          work: one(img("./img/process/code_request.webp", "The request", "Filtered to AUT, DEU and USA"))
        }
      ]
    },

    /* ── Step 2: a first chart ── */
    {
      id: "first-chart",
      eyebrow: "Step 2 · A first chart",
      title: "Germany,<br>1991–2010",
      rows: [
        {
          words: [
            { h3: "JSON into Houdini", small: "Python SOP" },
            { p: "Before building anything big, I plotted one country as a plain line chart. The whole code sits in a Python SOP: it loads the JSON, then runs over every entry." },
            { p: "For each entry it reads the year (<em>TimeDim</em>) and the value, and creates a point with the year on x and the value on y." }
          ],
          work: one(img("./img/process/code_loop.webp", "One point per year", "x = year, y = value"))
        },
        {
          words: [
            { h3: "A procedural axis", small: "Rebuilds when the data changes" },
            { p: "Around the points I built a procedural axis, with a label next to every data point. When the data changes, the chart follows; only small things like the start year need touching." }
          ],
          work: one(img("./img/process/net_graph.webp", "Chart setup", "Points, axis and labels"))
        },
        {
          words: [
            { h3: "The result", small: "Accidents per 100,000, Germany" },
            { p: "The rendered chart shows a steep drop for Germany: from 52.4 accidents per 100,000 people in 1991 to 20.0 in 2010." },
            { p: "It works, but it's a chart like any other. For the final project I wanted the same data to hit harder." }
          ],
          work: one(img("./img/process/graph_germany.webp", "Accidents per 100,000", "Germany · Houdini render"))
        }
      ]
    },

    /* ── Step 3: making it comparable ── */
    {
      id: "scale",
      eyebrow: "Step 3 · Making it comparable",
      title: "Choosing<br>the scale",
      rows: [
        {
          words: [
            { h3: "Latest value per country", small: "Starting at minus infinity" },
            { p: "The WHO doesn't have a value for every year, and some entries are decades old. So for each country the script keeps only its most recent entry." },
            { p: "Every country starts at minus infinity, so the first year it sees is always newer. Whenever a later year comes through, the value is replaced. I also renamed the country codes to readable names on the way." },
            { p: "That leaves Germany at 20.0 (2010), Austria at 26.1 (2015) and the United States at 63.8 (2005), all per 100,000 people." }
          ],
          work: one(img("./img/process/code_latest.webp", "Latest year per country", "Python SOP"))
        },
        {
          words: [
            { h3: "One point per country", small: "Country, crashes, year" },
            { p: "Each country then becomes a single point carrying three attributes: its name, its value and the year it comes from. A quick print checks that exactly three countries come out." },
            { p: "From here on, everything in the scene reads its numbers from these three points." }
          ],
          work: one(img("./img/process/code_points.webp", "Point attributes", "Python SOP"))
        },
        {
          words: [
            { h3: "Rates, not totals", small: "Same factor for every country" },
            { p: "Per 100,000 is hard to picture, and few countries are anywhere near that size. So I scaled every rate up by the same factor, which turns it into tens of thousands of cars. Since the factor is the same for all three countries, the ratios between the glasses stay true." },
            { p: "On the left branch I also tried multiplying by each country's real population. It looked dramatic but wasn't fair: bigger countries simply have more of everything, so the US would win by size alone. I dropped it." },
            { p: "The result goes into a null called <em>OUT_Data</em>. Every parameter that depends on the data, from the scatter count to the counter, references that one node." }
          ],
          work: one(img("./img/process/net_data.webp", "Data extraction", "Scaling and OUT_Data"))
        },
        {
          words: [
            { h3: "Counter in COPs", small: "Font node · RGBA out" },
            { p: "The number on screen isn't typed in. A COP network fetches the values from the Python SOP, draws them with a Font node and converts the result to RGBA, ready for compositing." },
            { p: "It counts up while the cars fall, so the number and the glass fill together." }
          ],
          work: one(img("./img/process/counter.webp", "Counter", "COPs"))
        }
      ]
    },

    /* ── Step 4: data to cars ── */
    {
      id: "simulation",
      eyebrow: "Step 4 · Data to cars",
      title: "Cars instead<br>of points",
      rows: [
        {
          words: [
            { h3: "Scatter from the data", small: "Count read from OUT_Data" },
            { p: "The cars start as points inside a box. Converted to a volume, the box is filled throughout rather than only on its surface." },
            { p: "One scatter per country reads its count straight from <em>OUT_Data</em>, so the number of cars is the number in the data. Random orientation and a variant number go on every point." }
          ],
          work: one(img("./img/process/net_scatter.webp", "Scatter count", "Expression referencing OUT_Data"))
        },
        {
          words: [
            { h3: "Cars, variants, simulation", small: "Copy to points · DOPs · USD" },
            { p: "The car model comes in three colours, red, black and silver, each packed so the simulation stays light. The variant number on each point picks one at random." },
            { p: "Copy to points puts a car on every point, which made around 60,000 cars in the scene. A DOP network simulates the pour, and the result is exported as USD for rendering." },
            { p: "A TOP network runs all three countries in one go, so after a change to the data it's one button to export everything again." }
          ],
          work: one(img("./img/process/net_cars.webp", "Car setup", "Variants, copy to points, DOPs, USD"))
        },
        {
          words: [
            { h3: "Three countries, three shots", small: "Germany · Austria · United States" },
            { p: "Three simulations shown one after another, with only the amount of cars changing, would have made a dull film. So each country gets its own part of the simulation and its own camera: from above for Germany, close on the glass for Austria, and the full glass against the skyline for the US." }
          ],
          work: [{
            layout: "row3",
            ratio: "16/9",
            media: [
              { type: "video", src: "./vid/Neglect_Germany.mp4", title: "Germany",       sub: "From above" },
              { type: "video", src: "./vid/Neglect_Austria.mp4", title: "Austria",       sub: "Close on the glass" },
              { type: "video", src: "./vid/Neglect_USA.mp4",     title: "United States", sub: "The full glass" }
            ]
          }]
        }
      ]
    },

    /* ── Step 5: counter and comp ── */
    {
      id: "render",
      eyebrow: "Step 5 · Render and comp",
      title: "Render<br>and comp",
      rows: [
        {
          words: [
            { h3: "Shots and lighting", small: "USD · TOPs · Nuke · Resolve" },
            { p: "For the shots I brought in the cars as USD next to a beer mug model, gave both materials, lit the scene and set up the cameras. Another TOP network took care of repetitive tasks." },
            { p: "Compositing happened in Nuke, the edit in DaVinci Resolve." }
          ],
          work: one(img("./img/process/net_render.webp", "Render setup", "USD, lighting, TOPs"))
        }
      ]
    },

    {
      id: "learnings",
      eyebrow: "Takeaways",
      title: "Learnings",
      words: [
        { p: "What this project taught me about turning a dataset into an image." }
      ],
      work: [{
        learn: [
          { label: "Data", tag: "API · Comparison", items: [
            "A count alone doesn't get the scale across, the image has to show it",
            "Be accurate in the amount and true to the real scale",
            "Build a reusable process that reads an API out automatically",
            "The best data isn't always in plain sight"
          ] },
          { label: "Houdini", tag: "Python · Pipeline", items: [
            "Bring external data in with a Python SOP",
            "Drive every parameter from one data node",
            "Automate repeated exports with TOPs"
          ] }
        ]
      }]
    }
  ],

  next: { href: "../DontPushMyButtons/", title: "Don't Push My Buttons" },
  back: "../"
};
})();
