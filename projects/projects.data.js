/* ─────────────────────────────────────────────────────────
   projects.data.js  —  All content for the projects overview page

   Edit this file to:
     - Add / remove / reorder project cards
     - Add / remove / reorder lab items
     - Change filter categories
     - Update hero text, footer, etc.
   ───────────────────────────────────────────────────────── */

const PROJECTS_DATA = {

  /* ── Page meta ── */
  title:  "Projects — Jona Melvin Grobe",
  backUrl: "../",
  backLabel: "Back",

  /* ── Footer ── */
  footer: {
    copyright: "© Jona Melvin Grobe — 2025",
    tagline:   "Technical Artist · Germany - Bavaria",
  },

  /* ── Works hero ── */
  worksHero: {
    number: "12",           // ghost number top-right — update when you add projects
    title:  "Selected<br><em>Works.</em>",
    sub:    "VFX · Short Films · Music Videos",
  },

  /* ── Filter buttons ──
     value must match the data-category strings on project cards below.
     "all" is always the first button and is hardcoded — edit the rest freely.
  ── */
  filters: [
    { label: "Short",       value: "short" },
    { label: "Music Video", value: "musicvideo" },
    { label: "Ad",          value: "ad" },
    { label: "Misc",        value: "misc" },
  ],

  /* ── Project cards ──
     category: space-separated string, e.g. "short ad" — matches filter values above
     images:   first image is the default; rest cycle on hover
     pill:     label shown on hover (top-right badge)
  ── */
  projects: [
        {
      href:     "../projects/DontPushMyButtons/",
      category: "short",
      pill:     "Short",
      title:    "Don't Push My Buttons",
      desc:     "Short · CrossDot Studio",
      images: [
        { src: "../projects/DontPushMyButtons/img/Still_5.webp", alt: "DPMB 1" },
        { src: "../projects/DontPushMyButtons/img/Still_2.webp", alt: "DPMB 2" },
        { src: "../projects/DontPushMyButtons/img/Still_3.webp", alt: "DPMB 3" },
      ],
    },
            {
      href:     "../projects/DontPushMyButtons/",
      category: "short",
      pill:     "Short",
      title:    "Decades Ahead",
      desc:     "Short · CrossDot Studio",
      images: [
        { src: "../projects/DecadesAhead/img/Still_1.webp", alt: "DPMB 1" },
        { src: "../projects/DecadesAhead/img/Still_0.webp", alt: "DPMB 2" },
        { src: "../projects/DecadesAhead/img/Still_2.webp", alt: "DPMB 3" },
      ],
    },
    {
      href:     "../projects/Echoes/",
      category: "short",
      pill:     "Short",
      title:    "Echoes",
      desc:     "Short · Master Project 1",
      images: [
        { src: "../projects/Echoes/img/ECHOES_3.webp", alt: "Echoes" },
        { src: "../projects/Echoes/img/ECHOES_4.webp", alt: "Echoes 2" },
        { src: "../projects/Echoes/img/ECHOES_5.webp", alt: "Echoes 3" },
      ],
    },
    {
      href:     "../projects/PaintingGreys/",
      category: "musicvideo",
      pill:     "Music Video",
      title:    "Painting Greys",
      desc:     "Multimedia Music Video · Bachelor Project 3",
      images: [
        { src: "../projects/PaintingGreys/img/Thumbnail.webp",        alt: "Painting Greys" },
        { src: "../projects/PaintingGreys/img/PaintingGreys_11.webp",  alt: "PG 2" },
        { src: "../projects/PaintingGreys/img/PaintingGreys_4.webp",   alt: "PG 3" },
        { src: "../projects/PaintingGreys/img/PaintingGreys_8.webp",   alt: "PG 4" },
      ],
    },
    {
      href:     "../projects/Tinnitus/",
      category: "musicvideo",
      pill:     "Music Video",
      title:    "Tinnitus",
      desc:     "Music Video",
      images: [
        { src: "../projects/Tinnitus/img/Still_16.webp", alt: "Tinnitus" },
        { src: "../projects/Tinnitus/img/Still_7.webp",  alt: "Tinnitus 2" },
        { src: "../projects/Tinnitus/img/Still_15.webp", alt: "Tinnitus 3" },
      ],
    },
    {
      href:     "../projects/TheUSBParadox/",
      category: "short ad",
      pill:     "Short",
      title:    "The USB Paradox",
      desc:     "Advertisement",
      images: [
        { src: "../projects/TheUSBParadox/img/thumbnail.webp", alt: "USB Paradox" },
        { src: "../projects/TheUSBParadox/img/USB_3.webp",     alt: "USB 2" },
        { src: "../projects/TheUSBParadox/img/USB_1.webp",     alt: "USB 3" },
        { src: "../projects/TheUSBParadox/img/USB_5.webp",     alt: "USB 4" },
      ],
    },
    {
      href:     "../projects/WithoutYou/",
      category: "short",
      pill:     "Short",
      title:    "Without You",
      desc:     "Bachelor Project 2",
      images: [
        { src: "../projects/WithoutYou/img/Still_4.webp", alt: "Without You" },
        { src: "../projects/WithoutYou/img/Still_1.webp", alt: "WY 2" },
        { src: "../projects/WithoutYou/img/Still_0.webp", alt: "WY 3" },
      ],
    },
    {
      href:     "../projects/NoNeedToRushLife/",
      category: "short",
      pill:     "Short",
      title:    "No Need To Rush Life",
      desc:     "Bachelor Project 1",
      images: [
        { src: "../projects/NoNeedToRushLife/img/NO_NEED_TO_RUSH_LIFE_1.webp", alt: "NNTRL" },
        { src: "../projects/NoNeedToRushLife/img/NO_NEED_TO_RUSH_LIFE_3.webp", alt: "NNTRL 2" },
        { src: "../projects/NoNeedToRushLife/img/NO_NEED_TO_RUSH_LIFE_2.webp", alt: "NNTRL 3" },
      ],
    },
    {
      href:     "../projects/Deviant/",
      category: "musicvideo",
      pill:     "Music Video",
      title:    "Deviant",
      desc:     "Music Video Snippet",
      images: [
        { src: "../projects/Deviant/img/Thumbnail.webp", alt: "Deviant" },
        { src: "../projects/Deviant/img/Deviant_4.webp", alt: "Deviant 2" },
        { src: "../projects/Deviant/img/Deviant_1.webp", alt: "Deviant 3" },
      ],
    },
    {
      href:     "../projects/WheelofSuffering/",
      category: "misc",
      pill:     "Challenge",
      title:    "Wheel of Suffering",
      desc:     "Pwnisher Challenge · Top 100",
      images: [
        { src: "../projects/WheelofSuffering/img/Thumbnail.webp", alt: "Wheel of Suffering" },
        { src: "../projects/WheelofSuffering/img/WOS_0.webp",     alt: "WOS 2" },
        { src: "../projects/WheelofSuffering/img/WOS_1.webp",     alt: "WOS 3" },
      ],
    },
  ],

  /* ── Lab divider ── */
  labDivider: {
    title: "The<br><em>Lab.</em>",
    sub:   "Experiments · Sketches · Side Work",
  },

  /* ── Lab items ──
     type: "image" | "video"
     src:  path to the image or video file
     desc: optional longer description shown in the lightbox
  ── */
  lab: [

    {
      type:  "video",
      src:   "../img/random_for_lab/Houdini_MTLXXRAY Shader.mp4",
      title: "MTL X-Ray Shader",
      sub:   "Houdini · Karma · Shading",
      desc:  "Development of a custom MTLX X-Ray Shader just for fun.",
    },    

        {
      type:  "video",
      src:   "../img/random_for_lab/Dispersion_HoudiniRender_WhiteBackground.mp4",
      title: "Dispersion Test",
      sub:   "Houdini · Rendering",
      desc:  "Wanted to test out a dispersion render look and combined it with a fun animation",
    },    

    {
      type:  "video",
      src:   "../projects/WellThatHappened/vid/Penguin_BTS.mp4",
      title: "Stylized Penguin",
      sub:   "Houdini · Character FX",
      desc:  "Behind the scenes of a stylized penguin character built and rigged in Houdini.",
    },
    {
      type:  "video",
      src:   "../img/random_for_lab/BallRoomInstallationPlan.mp4",
      title: "IKEA Ballroom Installation",
      sub:   "Houdini · Installation",
      desc:  "We should develop a full installation concept arround a small space, I decided creating a room inspired by IKEA kids corner.",
    },       
    {
      type:  "video",
      src:   "../projects/WellThatHappened/vid/StylizedTexture_workflow.mp4",
      title: "Stylized Texture Workflow",
      sub:   "Houdini · COPs",
      desc:  "A procedural texture workflow built entirely inside Houdini's COPs context.",
    },
    {
      type:  "video",
      src:   "../img/random_for_lab/Dailies_ColorfulHair_Small.mp4",
      title: "Colorful Hair",
      sub:   "Houdini · Grooming · Daily",
      desc:  "Just a fun daily to test out some colorful hair looks using Houdini's grooming tools.",
    },
    /* ── random_for_lab ── */



    {
      type:  "image",
      src:   "../vid/MuscleStiff.webp",
      title: "Muscle Stiffness Test",
      sub:   "Houdini · Muscle Simulation",
      desc:  "Testing muscle stiffness parameters in Houdini's muscle solver.",
    },    


    {
      type:  "video",
      src:   "../img/random_for_lab/GROBE_Jona_Melvin_CameraAnimationSequence_LightAndMotionAssignment_Small.mp4",
      title: "Creepy Animation Sequence",
      sub:   "Light and Motion · Assignment",
      desc:  "Assignment for Light and Motion class, creating a creepy animation sequence with a focus on camera and Lighting inside Unreal Engine.",
    },
 
    {
      type:  "video",
      src:   "../img/random_for_lab/GROBE_Jona_Melvin_FedToTheRats_HoudiniCrowds.mp4",
      title: "Fed to the Rats",
      sub:   "Houdini · Crowds",
      desc:  "Crowds assignment for Andreas Gießen working at RISE with a fun little animation of a character being fed to a swarm of rats.",
    },

    /*
    {
      type:  "video",
      src:   "../img/random_for_lab/GROBE_Jona_Melvin_UnrealEngine_MaterialEffect.mp4",
      title: "Material Effect",
      sub:   "Unreal Engine · Materials",
      desc:  "",
    },*/
    {
      type:  "video",
      src:   "../img/random_for_lab/GROBE_Jona_Melvin_Retargeting_Assignment.mov",
      title: "Retargeting",
      sub:   "KineFX · Animation",
      desc:  "Recorded some motion capture data and retargeted it to a simple rig in Houdini using KineFX & APEX and putting it into scene.",
    },
    {
      type:  "video",
      src:   "../img/random_for_lab/Cloudscape_turntable_v01.mp4",
      title: "Cloudscape",
      sub:   "Houdini · VFX · Clouds",
      desc:  "",
    },    
    {
      type:  "video",
      src:   "../img/random_for_lab/GROBE_Jona_Melvin_Unreal Engine Render_Whoop_Whoop.mp4",
      title: "Whoop Whoop",
      sub:   "Unreal Engine · Rendering",
      desc:  "Unreal Rendering Short Muisc Animation, just for an assignment where I was bored with the initial assignment critera and decided to make a fun little music video out of it.",
    },
    {
      type:  "video",
      src:   "../img/random_for_lab/GROBE_Jona_Music_UE5_TentacleMusicVisualizer_Final_Effect_Small.mp4",
      title: "Tentacle Music Visualizer",
      sub:   "UE5 · Audio · Procedural",
      desc:  "",
    },
    {
      type:  "image",
      src:   "../img/random_for_lab/GROBE_RAMPITSCH__Houdini_Procedural_Environment.png",
      title: "Procedural Environment",
      sub:   "Houdini · Environment · Collab",
      desc:  "Procedural environment created in collaboration with Hannah Rampitsch, using Houdini's procedural modelling and scattering tools.",
    },
    {
      type:  "image",
      src:   "../img/random_for_lab/GROBE_Jona_Melvin_Houdini_Heightfields.png",
      title: "Heightfields",
      sub:   "Houdini · Terrain",
      desc:  "",
    },    
    {
      type:  "image",
      src:   "../img/random_for_lab/Houdini_TreeTest_Houdini.jpg",
      title: "Tree Test",
      sub:   "Houdini · Procedural",
      desc:  "",
    },
    /* {
      type:  "image",
      src:   "../img/random_for_lab/Jona_Melvin_GROBE_A_LightingAssignment_IndoorNight.png",
      title: "Indoor Night A",
      sub:   "Houdini · Lighting Assignment",
      desc:  "",
    },
    {
      type:  "image",
      src:   "../img/random_for_lab/Jona_Melvin_GROBE_LightingAssignment_IndoorNight_B.png",
      title: "Indoor Night B",
      sub:   "Houdini · Lighting Assignment",
      desc:  "",
    },
    {
      type:  "image",
      src:   "../img/random_for_lab/Jona_Melvin_GROBE_Day_A_LightingAssignment_Indoor.png",
      title: "Indoor Day A",
      sub:   "Houdini · Lighting Assignment",
      desc:  "",
    },
    {
      type:  "image",
      src:   "../img/random_for_lab/Jona_Melvin_GROBE_Day_BLightingAssignment_Indoor.png",
      title: "Indoor Day B",
      sub:   "Houdini · Lighting Assignment",
      desc:  "",
    }, */
    {
      type:  "video",
      src:   "../img/random_for_lab/MaterialBlending_Houdini_ExtraMesh.mp4",
      title: "Material Blending",
      sub:   "Houdini · Materials",
      desc:  "",
    },
    {
      type:  "image",
      src:   "../img/random_for_lab/MaterialBlending_Houdini_COPs.gif",
      title: "Material Blending, COPs",
      sub:   "Houdini · COPs",
      desc:  "",
    },
    {
      type:  "video",
      src:   "../img/random_for_lab/Neglect_JonaMelvinGrobe_FinalCreativeProject_API_DATAvisualiszation_Houdini_Small.mp4",
      title: "Neglect",
      sub:   "Houdini · Data Visualisation · Short Film",
      desc:  "Tempered with the World Health Organization's API to create a data visualisation short film about drinking and driving related deaths.",
    },
    {
      type:  "video",
      src:   "../img/random_for_lab/Just some ragdolltest_Houdiniv01.mp4",
      title: "Ragdoll",
      sub:   "Houdini · Physics",
      desc:  "Testing ragdoll simulation on a mixamo character, setting limits and constraints to get a more realistic look.",
    },
    {
      type:  "video",
      src:   "../img/random_for_lab/Houdini_Random_CrowdActorfollow.mp4",
      title: "Crowd Actor Follow",
      sub:   "Houdini · Crowds",
      desc:  "",
    },
    {
      type:  "video",
      src:   "../img/random_for_lab/Houdini_SmallClouds_turntable_v01.mp4",
      title: "Small Clouds",
      sub:   "Houdini · VFX · Clouds",
      desc:  "Turntable of some small clouds I created using Houdini's cloud tools.",
    },
    {
      type:  "video",
      src:   "../img/random_for_lab/Houdini_Automated_Turntable Tool_Broken_Statuette_ugtkfevhw.mp4",
      title: "Broken Statuette",
      sub:   "Houdini · Modelling",
      desc:  "",
    },
    {
      type:  "video",
      src:   "../img/random_for_lab/Houdini_BreakdownTool_SortingSolver.mp4",
      title: "Sorting Solver",
      sub:   "Houdini · Breakdown Tool",
      desc:  "",
    },
    {
      type:  "video",
      src:   "../img/random_for_lab/UE5_OutdoorEnv_MakingOff_Vestiege_Indoor_1.mp4",
      title: "Vestige, Indoor 01",
      sub:   "UE5 · Making Of",
      desc:  "",
    },
    {
      type:  "video",
      src:   "../img/random_for_lab/UE5_OutdoorEnv_MakingOff_Vestiege_Indoor_2.mp4",
      title: "Vestige, Indoor 02",
      sub:   "UE5 · Making Of",
      desc:  "",
    },
    {
      type:  "video",
      src:   "../img/random_for_lab/UE5_OutdoorEnv_MakingOff_Vestiege_Outdoor_1.mp4",
      title: "Vestige, Outdoor 01",
      sub:   "UE5 · Making Of",
      desc:  "",
    },
    {
      type:  "video",
      src:   "../img/random_for_lab/UE5_OutdoorEnv_MakingOff_Vestiege_Outdoor_2.mp4",
      title: "Vestige, Outdoor 02",
      sub:   "UE5 · Making Of",
      desc:  "",
    },
    {
      type:  "video",
      src:   "../img/random_for_lab/Houdini_Wheatfield_InstanceSystem.mp4",
      title: "Wheatfield, Instances",
      sub:   "Houdini · Instancing",
      desc:  "",
    },
    {
      type:  "video",
      src:   "../img/random_for_lab/Houdini_Wheatfield_Noise_Approach.mp4",
      title: "Wheatfield, Noise",
      sub:   "Houdini · Procedural",
      desc:  "",
    },
    {
      type:  "image",
      src:   "../img/random_for_lab/Houdini_HexagonBIOME.png",
      title: "Biome",
      sub:   "Houdini · Environment",
      desc:  "",
    },

    /* ── Lighting Study ── */
    /* {
      type:  "image",
      src:   "../img/random_for_lab/lighting study/Jona_Melvin_GROBE_BriefA/Jona_Melvin_GROBE_CamA.png",
      title: "Brief A, Cam A",
      sub:   "Houdini · Lighting Study",
      desc:  "",
    },
    {
      type:  "image",
      src:   "../img/random_for_lab/lighting study/Jona_Melvin_GROBE_BriefA/Jona_Melvin_GROBE_CamB.png",
      title: "Brief A, Cam B",
      sub:   "Houdini · Lighting Study",
      desc:  "",
    },
    {
      type:  "image",
      src:   "../img/random_for_lab/lighting study/Jona_Melvin_GROBE_BriefA/Jona_Melvin_GROBE_CamC.png",
      title: "Brief A, Cam C",
      sub:   "Houdini · Lighting Study",
      desc:  "",
    },
    {
      type:  "image",
      src:   "../img/random_for_lab/lighting study/Jona_Melvin_GROBE_BriefA/Jona_Melvin_GROBE_CamD.png",
      title: "Brief A, Cam D",
      sub:   "Houdini · Lighting Study",
      desc:  "",
    },
    {
      type:  "image",
      src:   "../img/random_for_lab/lighting study/Jona_Melvin_GROBE_BriefB/Jona_Melvin_GROBE_CamA.png",
      title: "Brief B, Cam A",
      sub:   "Houdini · Lighting Study",
      desc:  "",
    },
    {
      type:  "image",
      src:   "../img/random_for_lab/lighting study/Jona_Melvin_GROBE_BriefB/Jona_Melvin_GROBE_CamB.png",
      title: "Brief B, Cam B",
      sub:   "Houdini · Lighting Study",
      desc:  "",
    },
    {
      type:  "image",
      src:   "../img/random_for_lab/lighting study/Jona_Melvin_GROBE_BriefB/Jona_Melvin_GROBE_CamC.png",
      title: "Brief B, Cam C",
      sub:   "Houdini · Lighting Study",
      desc:  "",
    },
    {
      type:  "image",
      src:   "../img/random_for_lab/lighting study/Jona_Melvin_GROBE_BriefB/Jona_Melvin_GROBE_CamD.png",
      title: "Brief B, Cam D",
      sub:   "Houdini · Lighting Study",
      desc:  "",
    },
    {
      type:  "image",
      src:   "../img/random_for_lab/lighting study/Jona_Melvin_GROBE_BriefC/Jona_Melvin_GROBE_CamA.png",
      title: "Brief C, Cam A",
      sub:   "Houdini · Lighting Study",
      desc:  "",
    },
    {
      type:  "image",
      src:   "../img/random_for_lab/lighting study/Jona_Melvin_GROBE_BriefC/Jona_Melvin_GROBE_CamB.png",
      title: "Brief C, Cam B",
      sub:   "Houdini · Lighting Study",
      desc:  "",
    },
    {
      type:  "image",
      src:   "../img/random_for_lab/lighting study/Jona_Melvin_GROBE_BriefC/Jona_Melvin_GROBE_CamC.png",
      title: "Brief C, Cam C",
      sub:   "Houdini · Lighting Study",
      desc:  "",
    },
    {
      type:  "image",
      src:   "../img/random_for_lab/lighting study/Jona_Melvin_GROBE_BriefC/Jona_Melvin_GROBE_CamD.png",
      title: "Brief C, Cam D",
      sub:   "Houdini · Lighting Study",
      desc:  "",
    },
    {
      type:  "image",
      src:   "../img/random_for_lab/lighting study/Jona_Melvin_GROBE_BriefD/Jona_Melvin_GROBE_CamA.png",
      title: "Brief D, Cam A",
      sub:   "Houdini · Lighting Study",
      desc:  "",
    },
    {
      type:  "image",
      src:   "../img/random_for_lab/lighting study/Jona_Melvin_GROBE_BriefD/Jona_Melvin_GROBE_CamB.png",
      title: "Brief D, Cam B",
      sub:   "Houdini · Lighting Study",
      desc:  "",
    },
    {
      type:  "image",
      src:   "../img/random_for_lab/lighting study/Jona_Melvin_GROBE_BriefD/Jona_Melvin_GROBE_CamC.png",
      title: "Brief D, Cam C",
      sub:   "Houdini · Lighting Study",
      desc:  "",
    },
    {
      type:  "image",
      src:   "../img/random_for_lab/lighting study/Jona_Melvin_GROBE_BriefD/Jona_Melvin_GROBE_CamD.png",
      title: "Brief D, Cam D",
      sub:   "Houdini · Lighting Study",
      desc:  "",
    }, */

    {
      type:  "image",
      src:   "../img/curiosities/ConceptArtCreature.png",
      title: "Concept Art Creature",
      sub:   "Photoshop · Concept Art",
      desc:  "Concept art sketch exploring creature design.",
    },        
  ],

};