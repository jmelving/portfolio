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
    number: "14",          // ghost number top-right — update when you add projects
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
        { src: "../projects/DontPushMyButtons/img/Still_5.webp", depth: "../projects/DontPushMyButtons/img/Still_5_depth.webp", alt: "DPMB 1" },
        { src: "../projects/DontPushMyButtons/img/Still_2.webp", alt: "DPMB 2" },
        { src: "../projects/DontPushMyButtons/img/Still_3.webp", alt: "DPMB 3" },
      ],
    },
    {
      href:     "../projects/Echoes/",
      category: "short",
      pill:     "Short",
      title:    "Echoes",
      desc:     "Short · Master Project 1",
      images: [
        { src: "../projects/Echoes/img/ECHOES_4.webp", depth: "../projects/Echoes/img/ECHOES_4_depth.webp", alt: "Echoes" },
        { src: "../projects/Echoes/img/ECHOES_3.webp", alt: "Echoes 2" },
        { src: "../projects/Echoes/img/ECHOES_5.webp", alt: "Echoes 3" },
      ],
    },
    {
      href:     "../projects/DeltaT/",
      category: "short",
      pill:     "Short",
      title:    "DELTA-T",
      desc:     "Short · CrossDot Studio",
      images: [
        { src: "../projects/DeltaT/img/Still_07.webp", depth: "../projects/DeltaT/img/Still_07_depth.webp", alt: "DELTA-T 1" },
        { src: "../projects/DeltaT/img/Still_05.webp", alt: "DELTA-T 2" },
        { src: "../projects/DeltaT/img/Still_04.webp", alt: "DELTA-T 3" },
      ],
    },
    {
      href:     "../projects/WellThatHappened/",
      category: "short ad",
      pill:     "Short",
      title:    "Well That Happened",
      desc:     "Short Ad · CrossDot Studio",
      images: [
        { src: "../projects/WellThatHappened/img/Still_1.webp", depth: "../projects/WellThatHappened/img/Still_1_depth.webp", alt: "Well That Happened 1" },
        { src: "../projects/WellThatHappened/img/Still_2.webp", alt: "Well That Happened 2" },
        { src: "../projects/WellThatHappened/img/Still_0.webp", alt: "Well That Happened 3" },
      ],
    },
    {
      href:     "../projects/DecadesAhead/",
      category: "short ad",
      pill:     "Short",
      title:    "Decades Ahead",
      desc:     "Short Ad · CrossDot Studio",
      images: [
        { src: "../projects/DecadesAhead/img/Still_2.webp", depth: "../projects/DecadesAhead/img/Still_2_depth.webp", alt: "Decades Ahead 1" },
        { src: "../projects/DecadesAhead/img/Still_1.webp", alt: "Decades Ahead 2" },
        { src: "../projects/DecadesAhead/img/Still_0.webp", alt: "Decades Ahead 3" },
      ],
    },
    {
      href:     "../projects/Zoom/",
      category: "musicvideo",
      pill:     "Music Video",
      title:    "Zoom",
      desc:     "Music Video · CrossDot Studio",
      images: [
        { src: "../projects/Zoom/img/Still_1.webp", depth: "../projects/Zoom/img/Still_1_depth.webp", alt: "Zoom 1" },
        { src: "../projects/Zoom/img/Still_0.webp", alt: "Zoom 2" },
        { src: "../projects/Zoom/img/Still_2.webp", alt: "Zoom 3" },
      ],
    },
    {
      href:     "../projects/PaintingGreys/",
      category: "musicvideo",
      pill:     "Music Video",
      title:    "Painting Greys",
      desc:     "Multimedia Music Video · Bachelor Project 3",
      images: [
        { src: "../projects/PaintingGreys/img/Thumbnail.webp", depth: "../projects/PaintingGreys/img/Thumbnail_depth.webp",        alt: "Painting Greys" },
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
        { src: "../projects/Tinnitus/img/Still_16.webp", depth: "../projects/Tinnitus/img/Still_16_depth.webp", depthFocus: 0.5, alt: "Tinnitus" },
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
        { src: "../projects/TheUSBParadox/img/thumbnail.webp", depth: "../projects/TheUSBParadox/img/thumbnail_depth.webp", alt: "USB Paradox" },
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
        { src: "../projects/WithoutYou/img/Still_4.webp", depth: "../projects/WithoutYou/img/Still_4_depth.webp", alt: "Without You" },
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
        { src: "../projects/NoNeedToRushLife/img/NO_NEED_TO_RUSH_LIFE_1.webp", depth: "../projects/NoNeedToRushLife/img/NO_NEED_TO_RUSH_LIFE_1_depth.webp", alt: "NNTRL" },
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
        { src: "../projects/Deviant/img/Thumbnail.webp", depth: "../projects/Deviant/img/Thumbnail_depth.webp", alt: "Deviant" },
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
        { src: "../projects/WheelofSuffering/img/Thumbnail.webp", depth: "../projects/WheelofSuffering/img/Thumbnail_depth.webp", alt: "Wheel of Suffering" },
        { src: "../projects/WheelofSuffering/img/WOS_0.webp",     alt: "WOS 2" },
        { src: "../projects/WheelofSuffering/img/WOS_1.webp",     alt: "WOS 3" },
      ],
    },
    {
      href:     "../projects/Vestige/",
      category: "misc",
      pill:     "Environment",
      title:    "Vestige",
      desc:     "Realtime Environment · UE5",
      images: [
        { src: "../projects/Vestige/img/Thumbnail.webp", depth: "../projects/Vestige/img/Thumbnail_depth.webp",   alt: "Vestige" },
        { src: "../projects/Vestige/img/Vestiege_03.webp", alt: "Vestige 2" },
        { src: "../projects/Vestige/img/Vestiege_01.webp", alt: "Vestige 3" },
      ],
    },
    {
      href:     "../projects/Neglect/",
      category: "misc",
      pill:     "Data Viz",
      title:    "Neglect",
      desc:     "Data Visualisation · Houdini",
      images: [
        { src: "../projects/Neglect/img/Thumbnail.webp", depth: "../projects/Neglect/img/Thumbnail_depth.webp",        alt: "Neglect" },
        { src: "../projects/Neglect/img/Neglect_Germany.webp",  alt: "Neglect 2" },
        { src: "../projects/Neglect/img/Neglect_Overflow.webp", alt: "Neglect 3" },
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
      src:   "../img/lab/Houdini_MTLXXRAY_Shader.mp4",
      preview: "../img/lab/Houdini_MTLXXRAY_Shader_prev.mp4",
      poster:  "../img/lab/Houdini_MTLXXRAY_Shader_poster.webp",
      title: "MTL X-Ray Shader",
      sub:   "Houdini · Karma · Shading",
      desc:  "Development of a custom MTLX X-Ray Shader just for fun.",
    },    

        {
      type:  "video",
      src:   "../img/lab/Dispersion_HoudiniRender_WhiteBackground.mp4",
      preview: "../img/lab/Dispersion_HoudiniRender_WhiteBackground_prev.mp4",
      poster:  "../img/lab/Dispersion_HoudiniRender_WhiteBackground_poster.webp",
      title: "Dispersion Test",
      sub:   "Houdini · Rendering",
      desc:  "Wanted to test out a dispersion render look and combined it with a fun animation",
    },    

    {
      type:  "video",
      src:   "../projects/WellThatHappened/vid/Penguin_BTS.mp4",
      preview: "../img/lab/Penguin_BTS_prev.mp4",
      poster:  "../img/lab/Penguin_BTS_poster.webp",
      title: "Stylized Penguin",
      sub:   "Houdini · Character FX",
      desc:  "Behind the scenes of a stylized penguin character built and rigged in Houdini.",
    },
    {
      type:  "video",
      src:   "../img/lab/BallRoomInstallationPlan.mp4",
      preview: "../img/lab/BallRoomInstallationPlan_prev.mp4",
      poster:  "../img/lab/BallRoomInstallationPlan_poster.webp",
      title: "IKEA Ballroom Installation",
      sub:   "Houdini · Installation",
      desc:  "We should develop a full installation concept arround a small space, I decided creating a room inspired by IKEA kids corner.",
    },       
    {
      type:  "video",
      src:   "../projects/WellThatHappened/vid/StylizedTexture_workflow.mp4",
      preview: "../img/lab/StylizedTexture_workflow_prev.mp4",
      poster:  "../img/lab/StylizedTexture_workflow_poster.webp",
      title: "Stylized Texture Workflow",
      sub:   "Houdini · COPs",
      desc:  "A procedural texture workflow built entirely inside Houdini's COPs context.",
    },
    {
      type:  "video",
      src:   "../img/lab/Dailies_ColorfulHair_small.mp4",
      preview: "../img/lab/Dailies_ColorfulHair_small_prev.mp4",
      poster:  "../img/lab/Dailies_ColorfulHair_small_poster.webp",
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
      src:   "../img/lab/GROBE_Jona_Melvin_CameraAnimationSequence_LightAndMotionAssignment_Small.mp4",
      preview: "../img/lab/GROBE_Jona_Melvin_CameraAnimationSequence_LightAndMotionAssignment_Small_prev.mp4",
      poster:  "../img/lab/GROBE_Jona_Melvin_CameraAnimationSequence_LightAndMotionAssignment_Small_poster.webp",
      title: "Creepy Animation Sequence",
      sub:   "Light and Motion · Assignment",
      desc:  "Assignment for Light and Motion class, creating a creepy animation sequence with a focus on camera and Lighting inside Unreal Engine.",
    },
 
    {
      type:  "video",
      src:   "../img/lab/GROBE_Jona_Melvin_FedToTheRats_HoudiniCrowds.mp4",
      preview: "../img/lab/GROBE_Jona_Melvin_FedToTheRats_HoudiniCrowds_prev.mp4",
      poster:  "../img/lab/GROBE_Jona_Melvin_FedToTheRats_HoudiniCrowds_poster.webp",
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
      src:   "../img/lab/GROBE_Jona_Melvin_Retargeting_Assignment.mp4",
      preview: "../img/lab/GROBE_Jona_Melvin_Retargeting_Assignment_prev.mp4",
      poster:  "../img/lab/GROBE_Jona_Melvin_Retargeting_Assignment_poster.webp",
      title: "Retargeting",
      sub:   "KineFX · Animation",
      desc:  "Recorded some motion capture data and retargeted it to a simple rig in Houdini using KineFX & APEX and putting it into scene.",
    },
    {
      type:  "video",
      src:   "../img/lab/Cloudscape_turntable_v01.mp4",
      preview: "../img/lab/Cloudscape_turntable_v01_prev.mp4",
      poster:  "../img/lab/Cloudscape_turntable_v01_poster.webp",
      title: "Cloudscape",
      sub:   "Houdini · VFX · Clouds",
      desc:  "",
    },    
    {
      type:  "video",
      src:   "../img/lab/GROBE_Jona_Melvin_Unreal_Engine_Render_Whoop_Whoop.mp4",
      preview: "../img/lab/GROBE_Jona_Melvin_Unreal_Engine_Render_Whoop_Whoop_prev.mp4",
      poster:  "../img/lab/GROBE_Jona_Melvin_Unreal_Engine_Render_Whoop_Whoop_poster.webp",
      title: "Whoop Whoop",
      sub:   "Unreal Engine · Rendering",
      desc:  "Unreal Rendering Short Muisc Animation, just for an assignment where I was bored with the initial assignment critera and decided to make a fun little music video out of it.",
    },
    {
      type:  "video",
      src:   "../img/lab/GROBE_Jona_Music_UE5_TentacleMusicVisualizer_Final_Effect_Small.mp4",
      preview: "../img/lab/GROBE_Jona_Music_UE5_TentacleMusicVisualizer_Final_Effect_Small_prev.mp4",
      poster:  "../img/lab/GROBE_Jona_Music_UE5_TentacleMusicVisualizer_Final_Effect_Small_poster.webp",
      title: "Tentacle Music Visualizer",
      sub:   "UE5 · Audio · Procedural",
      desc:  "",
    },
    {
      type:  "image",
      src:   "../img/lab/GROBE_RAMPITSCH_Houdini_Procedural_Environment.webp",
      preview: "../img/lab/GROBE_RAMPITSCH_Houdini_Procedural_Environment_prev.webp",
      title: "Procedural Environment",
      sub:   "Houdini · Environment · Collab",
      desc:  "Procedural environment created in collaboration with Hannah Rampitsch, using Houdini's procedural modelling and scattering tools.",
    },
    {
      type:  "image",
      src:   "../img/lab/GROBE_Jona_Melvin_Houdini_Heightfields.webp",
      preview: "../img/lab/GROBE_Jona_Melvin_Houdini_Heightfields_prev.webp",
      title: "Heightfields",
      sub:   "Houdini · Terrain",
      desc:  "",
    },    
    {
      type:  "image",
      src:   "../img/lab/Houdini_TreeTest_Houdini.webp",
      preview: "../img/lab/Houdini_TreeTest_Houdini_prev.webp",
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
      src:   "../img/lab/MaterialBlending_Houdini_ExtraMesh.mp4",
      preview: "../img/lab/MaterialBlending_Houdini_ExtraMesh_prev.mp4",
      poster:  "../img/lab/MaterialBlending_Houdini_ExtraMesh_poster.webp",
      title: "Material Blending",
      sub:   "Houdini · Materials",
      desc:  "",
    },
    {
      type:  "video",
      src:   "../img/lab/MaterialBlending_Houdini_COPs.mp4",
      preview: "../img/lab/MaterialBlending_Houdini_COPs_prev.mp4",
      poster:  "../img/lab/MaterialBlending_Houdini_COPs_poster.webp",
      title: "Material Blending, COPs",
      sub:   "Houdini · COPs",
      desc:  "",
    },
    {
      type:  "video",
      src:   "../img/lab/Neglect_JonaMelvinGrobe_FinalCreativeProject_API_DATAvisualiszation_Houdini_Small.mp4",
      preview: "../img/lab/Neglect_JonaMelvinGrobe_FinalCreativeProject_API_DATAvisualiszation_Houdini_Small_prev.mp4",
      poster:  "../img/lab/Neglect_JonaMelvinGrobe_FinalCreativeProject_API_DATAvisualiszation_Houdini_Small_poster.webp",
      title: "Neglect",
      sub:   "Houdini · Data Visualisation · Short Film",
      desc:  "Tempered with the World Health Organization's API to create a data visualisation short film about drinking and driving related deaths.",
    },
    {
      type:  "video",
      src:   "../img/lab/Just_some_ragdolltest_Houdiniv01.mp4",
      preview: "../img/lab/Just_some_ragdolltest_Houdiniv01_prev.mp4",
      poster:  "../img/lab/Just_some_ragdolltest_Houdiniv01_poster.webp",
      title: "Ragdoll",
      sub:   "Houdini · Physics",
      desc:  "Testing ragdoll simulation on a mixamo character, setting limits and constraints to get a more realistic look.",
    },
    {
      type:  "video",
      src:   "../img/lab/Houdini_Random_CrowdActorfollow.mp4",
      preview: "../img/lab/Houdini_Random_CrowdActorfollow_prev.mp4",
      poster:  "../img/lab/Houdini_Random_CrowdActorfollow_poster.webp",
      title: "Crowd Actor Follow",
      sub:   "Houdini · Crowds",
      desc:  "",
    },
    {
      type:  "video",
      src:   "../img/lab/Houdini_SmallClouds_turntable_v01.mp4",
      preview: "../img/lab/Houdini_SmallClouds_turntable_v01_prev.mp4",
      poster:  "../img/lab/Houdini_SmallClouds_turntable_v01_poster.webp",
      title: "Small Clouds",
      sub:   "Houdini · VFX · Clouds",
      desc:  "Turntable of some small clouds I created using Houdini's cloud tools.",
    },
    {
      type:  "video",
      src:   "../img/lab/Houdini_Automated_Turntable_Tool_Broken_Statuette_ugtkfevhw.mp4",
      preview: "../img/lab/Houdini_Automated_Turntable_Tool_Broken_Statuette_ugtkfevhw_prev.mp4",
      poster:  "../img/lab/Houdini_Automated_Turntable_Tool_Broken_Statuette_ugtkfevhw_poster.webp",
      title: "Broken Statuette",
      sub:   "Houdini · Modelling",
      desc:  "",
    },
    {
      type:  "video",
      src:   "../img/lab/Houdini_BreakdownTool_SortingSolver.mp4",
      preview: "../img/lab/Houdini_BreakdownTool_SortingSolver_prev.mp4",
      poster:  "../img/lab/Houdini_BreakdownTool_SortingSolver_poster.webp",
      title: "Sorting Solver",
      sub:   "Houdini · Breakdown Tool",
      desc:  "",
    },
    {
      type:  "video",
      src:   "../img/lab/Houdini_Wheatfield_InstanceSystem.mp4",
      preview: "../img/lab/Houdini_Wheatfield_InstanceSystem_prev.mp4",
      poster:  "../img/lab/Houdini_Wheatfield_InstanceSystem_poster.webp",
      title: "Wheatfield, Instances",
      sub:   "Houdini · Instancing",
      desc:  "",
    },
    {
      type:  "video",
      src:   "../img/lab/Houdini_Wheatfield_Noise_Approach.mp4",
      preview: "../img/lab/Houdini_Wheatfield_Noise_Approach_prev.mp4",
      poster:  "../img/lab/Houdini_Wheatfield_Noise_Approach_poster.webp",
      title: "Wheatfield, Noise",
      sub:   "Houdini · Procedural",
      desc:  "",
    },
    {
      type:  "image",
      src:   "../img/lab/Houdini_HexagonBIOME.webp",
      preview: "../img/lab/Houdini_HexagonBIOME_prev.webp",
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
      preview: "../img/lab/ConceptArtCreature_prev.webp",
      title: "Concept Art Creature",
      sub:   "Photoshop · Concept Art",
      desc:  "Concept art sketch exploring creature design.",
    },        
  ],

};