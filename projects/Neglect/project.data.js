/* Content for the Neglect project page. Rendered by js/project-page.js.
   See tools/PROJECT_DATA.md for every field. Hand-written from the project documentation:
   like the PDF, every process image sits in its own row with its explanation right next to it. */
(() => {
const img = (src, title, sub) => ({ type: "image", src, title, sub });
const one = m => [{ layout: "stack", media: [m] }];
// code as text, coloured like the editor it was written in
const code = (title, sub, theme, text) => [{ code: { title, sub, theme, text } }];

window.PROJECT = {
  title:   "Neglect",
  meta:    "Data Visualisation Test · Personal Project · 2024",
  heading: "Neglect.",
  tagline: "A small first test in data visualisation.",
  staticMedia: true,          // the pictures explain the process: no hover zoom, no lightbox
  hero: {
    slides: [
      { src: "./img/Neglect_USA_clean.webp", focus: [0.25, 0.5] },   // the number painted out: just the glass
      { src: "./img/Neglect_Germany.webp",  focus: [0.33, 0.5]  },   // same: the glass on the city
      { src: "./img/Neglect_Overflow.webp", focus: [0.18, 0.3]   }
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
          img("./img/Neglect_Glass.webp",    "Still 1", ""),
          img("./img/Neglect_Germany.webp",  "Still 2", ""),
          img("./img/Neglect_Overflow.webp", "Still 3", "")
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
          work: code("The search", "api_request.py · every request kept as a note", "vscode", `
#Ressources
# https://www.who.int/data/gho/info/gho-odata-api using this to get all of this kinda new dictionary system
# https://ghoapi.azureedge.net/api/Indicator (searched here for alcohol, second find was close to other alcohol data)
# https://ghoapi.azureedge.net/api/Indicator?$filter=contains(IndicatorName,'Alcohol') filtering everything that contains alcohol
# https://ghoapi.azureedge.net/api/Indicator?$filter=contains(IndicatorName,'Alcohol') and contains(IndicatorName,'harm') filtering everything that contains alcohol and harm

#RS_208 Deaths realated to alc in Traffic
#https://ghoapi.azureedge.net/api/SA_0000001470_ARCHIVED Alcohol Related Accidents/100.000
#https://ghoapi.azureedge.net/api/SA_0000001470_ARCHIVED?$filter=SpatialDim eq 'AUT' or SpatialDim eq 'DEU' or SpatialDim eq 'USA'
`)
        },
        {
          words: [
            { h3: "Request and save", small: "Python · requests, json" },
            { p: "The request itself is a small block I reused for every URL: send a GET request, check that the status code is 200, and write the answer to a JSON file. Otherwise it prints the error code." },
            { p: "Writing the JSON with an indent of four spaces keeps the long files readable, which helped a lot while working out the structure." },
            { p: "The final request filters the indicator down to three countries by their <em>SpatialDim</em> code: AUT, DEU and USA." }
          ],
          work: code("The request", "datavis_final_project.py · filtered to AUT, DEU and USA", "vscode", `
import json
import requests

r=requests.get("https://ghoapi.azureedge.net/api/SA_0000001470_ARCHIVED?$filter=SpatialDim eq 'AUT' or SpatialDim eq 'DEU' or SpatialDim eq 'USA'")

print(r)

# check if the request was successful
if r.status_code == 200:
    data = r.json()

    # Save as Json
    with open("driving_under_influence_AUT_USA_GER.json","w") as json_file:
        json.dump(data,json_file, indent=4)                 #json file gets very long and hard to read, indent will clean this up a lot
    print("Data saved")

else:
    print(f"Failed to grab data from API. {r.status_code}")
`)
        },
        {
          words: [
            { h3: "What comes back", small: "The JSON the scene reads" },
            { p: "This is the answer, unedited: one entry per country and year, 18 in total, from 1991 to 2015. Most of each entry is bookkeeping." },
            { p: "The scene reads only three fields: the country (<em>SpatialDim</em>), the year (<em>TimeDim</em>) and the value (<em>NumericValue</em>). The three entries marked on the left are the ones that end up in the film, the most recent one for each country." }
          ],
          work: [{ data: {
            src: "./data/driving_under_influence_AUT_USA_GER.json",
            note: "WHO GHO API · 18 entries",
            fields: ["SpatialDim", "TimeDim", "NumericValue"],
            used: [
              { SpatialDim: "AUT", TimeDim: 2015 },
              { SpatialDim: "DEU", TimeDim: 2010 },
              { SpatialDim: "USA", TimeDim: 2005 }
            ],
            legend: ["Fields the scene reads", "Entries used in the film"]
          } }]
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
          work: code("One point per year", "Python SOP · x = year, y = value", "vscode", `
import json
import hou

# accessing current node geo
geo = hou.pwd().geometry()

# loading json
with open(hou.expandString('$HIP/json/harm_consequences_alc_traffic_germany.json'), 'r') as file:
    data = json.load(file)


#defining items list
items = data["value"]

for entry in items:
    time_dim = entry["TimeDim"]
    value = float(entry["Value"])

    # x = TimeDim and y = Value
    pos = (time_dim, value, 0)
    point = geo.createPoint()
    point.setPosition(pos)
`)
        },
        {
          words: [
            { h3: "A procedural axis", small: "Rebuilds when the data changes" },
            { p: "Around the points I built a procedural axis, with a label next to every data point. When the data changes, the chart follows; only small things like the start year need touching." }
          ],
          work: one(img("./img/process/net_graph.webp", "Chart setup", "Fully procedural: points, axis and labels follow the data"))
        },
        {
          words: [
            { h3: "The result", small: "Accidents per 100,000, Germany" },
            { p: "This is the procedural setup from above, rendered in Karma. The chart shows a steep drop for Germany: from 52.4 accidents per 100,000 people in 1991 to 20.0 in 2010." },
            { p: "It works, but it's a chart like any other. For the final project I wanted the same data to hit harder." }
          ],
          work: one(img("./img/process/graph_germany.webp", "Accidents per 100,000", "Germany · the procedural setup above, rendered in Karma"))
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
          work: code("Latest year per country", "Python SOP · Houdini", "houdini", `
#going over entries
for entry in items:
    country_dim = entry.get("SpatialDim", "not defined")  # Default to "not defined"

    # rename country value
    if country_dim == "DEU":
        country_dim = "Germany"
    elif country_dim == "AUT":
        country_dim = "Austria"
    else:
        country_dim = "America"

    # initialize country data if not present
    if country_dim not in country_data:
        country_data[country_dim] = {"max_time": -float("inf"), "value": 0.0}


    # update with the latest data if the entry is newer
    if entry["TimeDim"] > country_data[country_dim]["max_time"]:
        country_data[country_dim]["max_time"] = entry["TimeDim"]
        country_data[country_dim]["value"] = float(entry["Value"])
`)
        },
        {
          words: [
            { h3: "One point per country", small: "Country, crashes, year" },
            { p: "Each country then becomes a single point carrying three attributes: its name, its value and the year it comes from. A quick print checks that exactly three countries come out." },
            { p: "From here on, everything in the scene reads its numbers from these three points." }
          ],
          work: code("Point attributes", "Python SOP · Houdini", "houdini", `
# points for each country
for country, data in country_data.items():
    # point for each
    point = geo.createPoint()

    # assign values to attributes
    point.setAttribValue("Country", country)
    point.setAttribValue("Crashes", data["value"])
    point.setAttribValue("Date", data["max_time"])

# testing
#print(f"{len(country_data)} countries.")
`)
        },
        {
          words: [
            { h3: "Rates, not totals", small: "Same factor for every country" },
            { p: "Per 100,000 is hard to picture, and few countries are anywhere near that size. So I scaled every rate up by the same factor, which turns it into tens of thousands of cars. Since the factor is the same for all three countries, the ratios between the glasses stay true." },
            { p: "On the left branch I also tried multiplying by each country's real population. It looked dramatic but wasn't fair: bigger countries simply have more of everything, so the US would win by size alone. I dropped it." },
            { p: "The result goes into a null called <em>OUT_Data</em>. Every parameter that depends on the data, from the scatter count to the counter, references that one node." }
          ],
          work: one(img("./img/process/net_data.webp", "Data extraction", "Gets the data out for the scene and for the counter, which the COP network then builds on"))
        },
        {
          words: [
            { h3: "Counter in COPs", small: "Font node · RGBA out" },
            { p: "The number on screen isn't typed in. A COP network fetches the values from the Python SOP, draws them with a Font node and converts the result to RGBA, ready for compositing." },
            { p: "It counts up while the cars fall, so the number and the glass fill together." }
          ],
          work: one(img("./img/process/counter.webp", "COP setup", "Counter drawn from the data"))
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
          work: one(img("./img/process/net_scatter.webp", "Data-derived scatter count", "The count references the data in OUT_Data"))
        },
        {
          words: [
            { h3: "Cars, variants, simulation", small: "Copy to points · DOPs · USD" },
            { p: "The car model comes in three colours, red, black and silver, each packed so the simulation stays light. The variant number on each point picks one at random." },
            { p: "Copy to points puts a car on every point, so the number of cars comes straight from the dataset: around 60,000 in the scene. A rigid body (RBD) simulation in a DOP network then pours them into the glass, which is what makes the numbers visible, and the result is exported as USD for rendering." },
            { p: "A TOP network runs all three countries in one go, so after a change to the data it's one button to export everything again." }
          ],
          work: one(img("./img/process/net_cars.webp", "Car setup", "Cars spawned from the dataset, in random variants, then simulated as RBD"))
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
              { type: "video", src: "./vid/Neglect_Germany.mp4", title: "Germany",       sub: "20,000 accidents per 10 million in population" },
              { type: "video", src: "./vid/Neglect_Austria.mp4", title: "Austria",       sub: "26,100 accidents per 10 million in population" },
              { type: "video", src: "./vid/Neglect_USA.mp4",     title: "United States", sub: "63,800 accidents per 10 million in population" }
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
            { p: "For the shots I brought in the cars as USD next to a beer mug model, gave both materials, lit the scene and set up the cameras. Another TOP network takes the camera data and renders every shot automatically, so going from a change to finished frames stays as fast as possible." },
            { p: "Compositing happened in Nuke, the edit in DaVinci Resolve." }
          ],
          work: one(img("./img/process/net_render.webp", "Render setup", "TOPs take the camera data and render every shot automatically"))
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
