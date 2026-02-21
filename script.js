/* =============================================
   CURSOR
   ============================================= */
const cursorDot = document.createElement('div');
cursorDot.className = 'cursor-dot';
const cursorRing = document.createElement('div');
cursorRing.className = 'cursor-ring';
document.body.appendChild(cursorDot);
document.body.appendChild(cursorRing);

let mouseX = -100, mouseY = -100;
let ringX = -100, ringY = -100;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
  // Only hide native cursor once we've confirmed mouse is moving
  if (!document.body.classList.contains('cursor-ready')) {
    document.body.classList.add('cursor-ready');
  }
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

/* =============================================
   MARQUEE STRIP
   ============================================= */
function buildMarquee() {
  const strip = document.querySelector('.marquee-strip-inner');
  if (!strip) return;
  const items = [
    'Vibe Coding', '✦', 'IML 300', '✦', 'Media Arts + Practice', '✦',
    'USC', '✦', 'Fall 2025', '✦', 'Generative Art', '✦', 'Surveillance',
    '✦', 'Glitch', '✦', 'Digital Decolonization', '✦', 'Critical Access',
    '✦', 'Machine Oppression', '✦', 'Algorithmic Resistance', '✦',
  ];
  // Duplicate for seamless loop
  const doubled = [...items, ...items];
  strip.innerHTML = doubled.map(t =>
    t === '✦' ? `<span class="sep">✦</span>` : `<span>${t}</span>`
  ).join('');
}
buildMarquee();

/* =============================================
   STUDENT NAME FORMATTER
   ============================================= */
function formatStudentName(fullName) {
  const parts = fullName.trim().split(' ');
  if (parts.length < 2) return fullName;
  const firstName = parts[0];
  const lastInitial = parts[parts.length - 1][0];
  return `${firstName} ${lastInitial}.`;
}

/* =============================================
   SCREENSHOT / PREVIEW IMAGE MAPPING
   We use a microlink/screenshotone-style service via open APIs.
   Falling back to colorful gradient placeholders if none available.
   ============================================= */
function getCardImage(url) {
  // Use a public screenshot API - microlink.io provides free screenshots
  try {
    const encoded = encodeURIComponent(url);
    return `https://api.microlink.io?url=${encoded}&screenshot=true&meta=false&embed=screenshot.url`;
  } catch {
    return null;
  }
}

// Fallback gradient palettes per experiment theme
const THEME_GRADIENTS = [
  'linear-gradient(135deg, #1a0533 0%, #2d1b69 50%, #11998e 100%)',  // 1 Generative
  'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',  // 2 Interface
  'linear-gradient(135deg, #000428 0%, #004e92 100%)',               // 3 Hello Internet
  'linear-gradient(135deg, #1c1c1c 0%, #3a1c71 50%, #d76d77 100%)', // 4 Surveillance
  'linear-gradient(135deg, #12100e 0%, #2b4162 50%, #12100e 100%)',  // 5 Glitch
  'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)', // 6 Machine
  'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',               // 7 Data Heal
  'linear-gradient(135deg, #373b44 0%, #4286f4 100%)',               // 8 Critical Access
  'linear-gradient(135deg, #360033 0%, #0b8793 100%)',               // 9 Algorithmic
  'linear-gradient(135deg, #1f4037 0%, #99f2c8 100%)',               // 10 Live Coding
];

/* =============================================
   DATA
   ============================================= */
const experiments = [
  {
    title: "Vibe Coding Experiment #1: Generative Art/Code",
    references: [
      { url: "https://en.wikipedia.org/wiki/Vibe_coding", title: "Vibe Coding - Wikipedia" },
      { url: "https://mashable.com/article/vibe-coding-explained", title: "Vibe Coding Explained" },
      { url: "https://www.thewayofcode.com/", title: "The Way of Code" },
      { url: "http://www.vam.ac.uk/content/journals/research-journal/issue-no.-6-summer-2014/cataloguing-change-women,-art-and-technology/", title: "Cataloguing Change: Women, Art and Technology" },
      { url: "https://dam.org/museum/artists/phase_1/", title: "DAM Artists - Phase 1" },
      { url: "https://spalterdigital.com/artworks/", title: "Spalter Digital Artworks" },
      { url: "https://collections.vam.ac.uk/search/?id_category=THES49037", title: "V&A Collections" },
    ],
    projects: [
      { student: "Chip Bailey", url: "https://claude.ai/public/artifacts/51fc7d0e-5eb5-4fb3-9a79-0877bd8a24f3", title: "Generative Art" },
      { student: "Kelly Cao", url: "https://v0-victorian-joke-website.vercel.app/", title: "Victorian Joke Website" },
      { student: "Manuel Chavez", url: "https://claude.ai/public/artifacts/f35abb6c-8e20-4bab-9b21-d7b930f9b983", title: "Generative Art" },
      { student: "Lam Chung", url: "https://claude.ai/public/artifacts/2e002c37-5adc-44ec-aa12-904b59dc97a7", title: "Generative Art" },
      { student: "Margaret Danenhauer", url: "https://claude.ai/public/artifacts/8f881d20-5ea2-4179-ad2e-d645b9187b42", title: "Generative Art" },
      { student: "Davia Ferree", url: "https://claude.ai/public/artifacts/e3c17f30-7da2-4045-a30f-b4b86c2cc0a8", title: "Generative Art" },
      { student: "Isabel Fowlkes", url: "https://claude.ai/public/artifacts/7a18ca32-b5c7-4340-90b8-6698d8774076", title: "Generative Art" },
      { student: "Sean Guzman", url: "https://claude.ai/public/artifacts/1be172dd-b182-443e-8d43-d269c3e94801", title: "Generative Art" },
      { student: "Josie Jensen", url: "https://claude.ai/public/artifacts/9dbe81e8-8eba-4795-a766-905c6093bc69", title: "Generative Art" },
      { student: "Jinglin Jingan", url: "https://claude.ai/public/artifacts/9dd16351-6b40-486f-b8f9-2f32723d8ff7", title: "Generative Art" },
      { student: "Astghik Kalashyan", url: "https://claude.ai/public/artifacts/fdc9105c-8327-4318-8a40-1ee740b69053", title: "Generative Art" },
      { student: "Jiwoo Kim", url: "https://claude.ai/public/artifacts/ceea8595-a371-4f38-9358-e40e2757f542", title: "Generative Art" },
      { student: "Zoe Leung", url: "https://claude.ai/public/artifacts/65656971-d9d0-4a04-b3ba-9ab12dc39afc", title: "Generative Art" },
      { student: "Milan McIntosh", url: "https://claude.ai/chat/ccc00a75-b234-445d-8e0f-8c590dfb68c7", title: "Generative Art" },
      { student: "Akasa Mei", url: "https://claude.ai/public/artifacts/18309b59-f812-4d6f-9b5d-e4f49af3cba4", title: "Generative Art" },
      { student: "Ben Regev", url: "https://claude.ai/public/artifacts/abb31721-9016-492d-819d-b1d8acf71e5b", title: "Generative Art" },
      { student: "Jason Rui", url: "https://claude.ai/public/artifacts/c546f8ef-44d3-4b6a-bb75-c350e9689bf2", title: "Generative Art" },
      { student: "Jonas Sansone", url: "https://claude.ai/public/artifacts/d3996de6-84c6-487b-910e-4905afaea2d5?fullscreen=false", title: "Generative Art" },
      { student: "Robynn Shen", url: "https://claude.ai/public/artifacts/782a7230-f758-4591-8aa1-6c3a84772dad", title: "Generative Art" },
      { student: "Claire Smith", url: "https://claude.ai/share/db4952aa-0ceb-46f2-8712-377d5a23b1a2", title: "Generative Art" },
    ],
  },
  {
    title: "Vibe Coding Experiment #2: Interface",
    references: [
      { url: "https://static1.squarespace.com/static/59238d36d2b8575d127794a4/t/5a60bdecf9619a7f881b02a0/1516289526013/UNBAG_2_AmericanArtist.pdf", title: "American Artist - UNBAG" },
      { url: "https://yhsong.com/", title: "YH Song" },
      { url: "https://www.youtube.com/watch?v=rVYqt6BbwSM&ab_channel=cmudesign", title: "CMU Design" },
      { url: "http://contemporary-home-computing.org/RUE/", title: "RUE" },
      { url: "https://frankchimero.com/blog/2013/what-screens-want/", title: "What Screens Want" },
    ],
    projects: [
      { student: "Chip Bailey", url: "https://v0.app/chat/my-space-aesthetic-website-nrIA8WFGOdb", title: "MySpace Aesthetic Website" },
      { student: "Kelly Cao", url: "https://claude.ai/public/artifacts/eff256d5-a125-4dba-8385-6466a84538d3", title: "Interface" },
      { student: "Manuel Chavez", url: "https://web-echoes-of-soul.lovable.app/", title: "Web Echoes of Soul" },
      { student: "Margaret Danenhauer", url: "https://claude.ai/public/artifacts/cf5a028d-1916-4dd5-9ece-c2e5d27af74d", title: "Interface" },
      { student: "Davia Ferree", url: "https://claude.ai/public/artifacts/2a71b343-8a2d-4423-8c40-266c88c828d6", title: "Interface" },
      { student: "Sean Guzman", url: "https://claude.ai/public/artifacts/7ff2c719-4dd8-4106-9843-c934723e1727", title: "Interface" },
      { student: "Jinglin Jingan", url: "https://claude.ai/public/artifacts/ce6eddb3-f1b8-448e-bae6-d858e27b51b1", title: "Interface" },
      { student: "Astghik Kalashyan", url: "https://v0-depeche-mode-website.vercel.app/", title: "Depeche Mode Website" },
      { student: "Jiwoo Kim", url: "https://claude.ai/public/artifacts/7e497709-6db4-4858-8bdf-b6b71e4ae15a", title: "Interface" },
      { student: "Zoe Leung", url: "https://claude.ai/public/artifacts/65efb397-a7fc-4b52-afef-3f2d054b2fb0", title: "Interface" },
      { student: "Akasa Mei", url: "https://claude.ai/public/artifacts/04cdb701-48ac-4eba-9f3c-90fc9095111c", title: "Interface" },
      { student: "Ben Regev", url: "https://claude.ai/public/artifacts/6d82ae85-f511-4b95-a58a-65d2367dc547", title: "Interface" },
      { student: "Jason Rui", url: "https://claude.ai/public/artifacts/7973a9b7-94ca-4335-b7f5-9ee196b0e58d", title: "Interface" },
      { student: "Jonas Sansone", url: "https://claude.ai/public/artifacts/04bab274-f5cf-4d52-af6a-598680b19456", title: "Interface" },
      { student: "Robynn Shen", url: "https://claude.ai/public/artifacts/9c88c680-4a25-4891-9b0e-77274794852a", title: "Interface" },
      { student: "Claire Smith", url: "https://claude.ai/public/artifacts/6edae114-9dd4-4e5e-b893-7b7921cefae9", title: "Interface" },
    ],
  },
  {
    title: "Vibe Coding Experiment #3: Hello Internet",
    references: [
      { url: "https://youtu.be/Bq1FFbprnt4", title: "Hello Internet" },
      { url: "https://mayaontheinter.net/", title: "Maya on the Internet" },
      { url: "https://www.youtube.com/watch?v=Q8QknqgEalo&ab_channel=TheConference%2FMediaEvolution", title: "The Conference" },
      { url: "https://thecreativeindependent.com/essays/laurel-schwulst-my-website-is-a-shifting-house-next-to-a-river-of-knowledge-what-could-yours-be/", title: "My Website is a Shifting House" },
    ],
    projects: [
      { student: "Chip Bailey", url: "https://claude.ai/public/artifacts/105976b1-52b9-4801-972a-42b5c91689c4", title: "Hello Internet" },
      { student: "Kelly Cao", url: "https://replit.com/@kmcao/AdaTerminal", title: "Ada Terminal" },
      { student: "Margaret Danenhauer", url: "https://my-web-crib.lovable.app/", title: "My Web Crib" },
      { student: "Davia Ferree", url: "https://web-women-whos-who.lovable.app/", title: "Women Whos Who" },
      { student: "Isabel Fowlkes", url: "https://digital-dilemma-dance.lovable.app/", title: "Digital Dilemma Dance" },
      { student: "Sean Guzman", url: "https://riverhouse-growth-game.lovable.app/", title: "Riverhouse Growth Game" },
      { student: "Jinglin Jingan", url: "https://claude.ai/public/artifacts/8e1b40f1-c20a-49f4-ab2b-04da1a2148d4", title: "Hello Internet" },
      { student: "Astghik Kalashyan", url: "https://swiss-design-haven.lovable.app/", title: "Swiss Design Haven" },
      { student: "Jiwoo Kim", url: "https://petal-predict-play.lovable.app/", title: "Petal Predict Play" },
      { student: "Zoe Leung", url: "https://neural-journey-path.lovable.app/", title: "Neural Journey Path" },
      { student: "Milan McIntosh", url: "https://lovable.dev/projects/d0621f15-17ff-4d21-8f53-65111a43a545", title: "Hello Internet" },
      { student: "Akasa Mei", url: "https://chronos-codes-unfold.lovable.app/", title: "Chronos Codes Unfold" },
      { student: "Ben Regev", url: "https://fiber-sight-globe.lovable.app/", title: "Fiber Sight Globe" },
      { student: "Jason Rui", url: "https://web-explorer-lab.lovable.app/", title: "Web Explorer Lab" },
      { student: "Jonas Sansone", url: "https://arpanet-gremlin-dash.lovable.app/", title: "Arpanet Gremlin Dash" },
      { student: "Robynn Shen", url: "https://flashback-recap.lovable.app/", title: "Flashback Recap" },
      { student: "Claire Smith", url: "https://v0.app/chat/matrix-spider-game-n7RGXjM0xgq", title: "Matrix Spider Game" },
    ],
  },
  {
    title: "Vibe Coding Experiment #4: Surveillance & Identity",
    references: [
      { url: "https://get-lauren.net/", title: "Get Lauren" },
      { url: "https://www.youtube.com/watch?v=q2GhOmfxGd8", title: "Surveillance & Identity" },
      { url: "https://vimeo.com/354276402", title: "Vimeo" },
      { url: "https://mollysoda.exposed/", title: "Molly Soda Exposed" },
      { url: "https://www.youtube.com/watch?v=8tHXNXaIxg0", title: "YouTube" },
      { url: "https://modelviewculture.com/pieces/everyone-watches-nobody-sees-how-black-women-disrupt-surveillance-theory", title: "How Black Women Disrupt Surveillance Theory" },
    ],
    projects: [
      { student: "Chip Bailey", url: "https://v0.app/chat/interactive-portraits-nDMcpMu0DQb?b=v0-preview-b_TXcb0dAuRLE&f=1&path=%2F", title: "Interactive Portraits" },
      { student: "Kelly Cao", url: "https://performative-authenticity.lovable.app/", title: "Performative Authenticity" },
      { student: "Margaret Danenhauer", url: "https://rise-and-shine-prod.lovable.app/", title: "Rise and Shine" },
      { student: "Davia Ferree", url: "https://claude.ai/public/artifacts/c4bc2813-69ad-43e5-9bad-e03ba333210b", title: "Surveillance & Identity" },
      { student: "Sean Guzman", url: "https://claude.ai/public/artifacts/26a2924b-26af-4b67-b567-a85887caa058", title: "Surveillance & Identity" },
      { student: "Jinglin Jingan", url: "https://claude.ai/public/artifacts/f2ab6ed8-d593-419f-ae3b-9c6d58790d54", title: "Surveillance & Identity" },
      { student: "Astghik Kalashyan", url: "https://stellar-canvas-worlds.lovable.app/", title: "Stellar Canvas Worlds" },
      { student: "Jiwoo Kim", url: "https://social-meter-receipts.lovable.app/", title: "Social Meter Receipts" },
      { student: "Milan McIntosh", url: "https://lovable.dev/projects/afd480ed-8b27-4957-821e-cfd5625646bf", title: "Surveillance & Identity" },
      { student: "Akasa Mei", url: "https://lovable.dev/projects/8037d437-238e-428f-9a4d-669afa17dc16", title: "Surveillance & Identity" },
      { student: "Ben Regev", url: "https://claude.ai/public/artifacts/8db14537-d0ac-43c7-9db1-4b21fa80ca58", title: "Surveillance & Identity" },
      { student: "Jason Rui", url: "https://lovable.dev/projects/f32b9bd0-da88-49b0-ac2b-8acd772a8943", title: "Surveillance & Identity" },
      { student: "Jonas Sansone", url: "https://claude.ai/public/artifacts/b69fec27-8982-4a50-a9b1-7afde5033ab8", title: "Surveillance & Identity" },
      { student: "Robynn Shen", url: "https://abode-analyzer-app.lovable.app/", title: "Abode Analyzer" },
      { student: "Claire Smith", url: "https://v0.app/chat/third-person-security-game-iO9hcijPXHz", title: "Third Person Security Game" },
    ],
  },
  {
    title: "Vibe Coding Experiment #5: Glitch & Poor Image",
    references: [
      { url: "http://thecomposingrooms.com/research/reading/2013/e-flux_Hito%20Steyerl_15.pdf", title: "In Defense of the Poor Image - Hito Steyerl" },
      { url: "https://movingimage.org/event/auriea-harvey/", title: "Auriea Harvey" },
      { url: "https://www.youtube.com/watch?v=tO5Y03PmZZU", title: "YouTube" },
      { url: "http://amodern.net/wp-content/uploads/2016/05/2010_Original_Rosa-Menkman-Glitch-Studies-Manifesto.pdf", title: "Glitch Studies Manifesto" },
      { url: "https://www.siusoon.net/projects/unerasablecharacters-iii", title: "Unerasable Characters III" },
    ],
    projects: [
      { student: "Chip Bailey", url: "https://claude.ai/public/artifacts/45d6a6db-eca6-4f5c-9b0b-cdd15c78ec0e", title: "Glitch & Poor Image" },
      { student: "Kelly Cao", url: "https://glitch-truth-shaper.lovable.app/", title: "Glitch Truth Shaper" },
      { student: "Manuel Chavez", url: "https://claude.ai/public/artifacts/57c16cd3-e17b-4ecd-8177-23d69abd95fa", title: "Glitch & Poor Image" },
      { student: "Margaret Danenhauer", url: "https://morphing-ui.lovable.app/", title: "Morphing UI" },
      { student: "Davia Ferree", url: "https://glitch-text-artist.lovable.app/", title: "Glitch Text Artist" },
      { student: "Isabel Fowlkes", url: "https://v0-computer-paradox-website.vercel.app/", title: "Computer Paradox Website" },
      { student: "Sean Guzman", url: "https://claude.ai/public/artifacts/dec36591-b7f1-4cc1-a084-802ae0e1b814", title: "Glitch & Poor Image" },
      { student: "Jinglin Jingan", url: "https://claude.ai/public/artifacts/96f4547f-3ec4-4bc8-a590-5d2a08d9d36f", title: "Glitch & Poor Image" },
      { student: "Astghik Kalashyan", url: "https://v0.app/chat/glitch-poetry-website-gLSw3EVxiH4?b=b_aoaa0qed48R&f=1", title: "Glitch Poetry Website" },
      { student: "Jiwoo Kim", url: "https://memory-fragments-unmade.lovable.app/", title: "Memory Fragments Unmade" },
      { student: "Akasa Mei", url: "https://comment-storm-visualizer.lovable.app/", title: "Comment Storm Visualizer" },
      { student: "Ben Regev", url: "https://claude.ai/public/artifacts/ee0a74ca-824a-487c-9837-5612d50b8581", title: "Glitch & Poor Image" },
      { student: "Jason Rui", url: "https://book-to-web-craft.lovable.app/", title: "Book to Web Craft" },
      { student: "Jonas Sansone", url: "https://v0-mythology-creature-generator.vercel.app/", title: "Mythology Creature Generator" },
      { student: "Robynn Shen", url: "https://infer-the-gap.lovable.app/", title: "Infer the Gap" },
      { student: "Claire Smith", url: "https://v0.app/chat/ruined-art-gallery-gqekpNFqc9u", title: "Ruined Art Gallery" },
    ],
  },
  {
    title: "Vibe Code Experiment #6: Machine Oppression",
    references: [
      { url: "https://www.youtube.com/watch?v=UG_X_7g63rY", title: "Machine Oppression" },
      { url: "https://www.noemamag.com/afro-now-ism/", title: "Afro-Now-Ism" },
      { url: "https://vimeo.com/233011125", title: "Vimeo" },
      { url: "https://www.youtube.com/watch?v=oqelqdDIDSs", title: "YouTube" },
    ],
    projects: [
      { student: "Chip Bailey", url: "https://claude.ai/public/artifacts/2080efe9-4bc1-44c9-b587-a5c00062caee", title: "Machine Oppression" },
      { student: "Kelly Cao", url: "https://v0-face-analysis-app-ten.vercel.app/", title: "Face Analysis App" },
      { student: "Margaret Danenhauer", url: "https://mind-warp-detective.lovable.app/", title: "Mind Warp Detective" },
      { student: "Davia Ferree", url: "https://v0.app/chat/justice-league-website-sNzDVf12qkl", title: "Justice League Website" },
      { student: "Isabel Fowlkes", url: "https://inner-verse-shift.lovable.app/", title: "Inner Verse Shift" },
      { student: "Sean Guzman", url: "https://cynic-to-sunshine.lovable.app/", title: "Cynic to Sunshine" },
      { student: "Jinglin Jingan", url: "https://claude.ai/public/artifacts/e54f17b8-59ed-4336-975a-024d46af1749", title: "Machine Oppression" },
      { student: "Astghik Kalashyan", url: "https://v0.app/chat/glitch-poetry-website-gLSw3EVxiH4?b=b_aoaa0qed48R&f=1", title: "Glitch Poetry Website" },
      { student: "Jiwoo Kim", url: "https://daenggi-remembrance-play.lovable.app/", title: "Daenggi Remembrance Play" },
      { student: "Ben Regev", url: "https://claude.ai/public/artifacts/b7277196-b02e-4567-bbb0-4b00b7301e2d", title: "Machine Oppression" },
      { student: "Jason Rui", url: "https://emoji-bias-blaster.lovable.app/", title: "Emoji Bias Blaster" },
      { student: "Jonas Sansone", url: "https://v0-ai-mad-libs-game.vercel.app/", title: "AI Mad Libs Game" },
      { student: "Claire Smith", url: "https://lovable.dev/projects/650710dd-94ac-4934-ae0f-4e53b08c8d95?permissionView=main", title: "Machine Oppression" },
    ],
  },
  {
    title: "Vibe Coding Experiment #7: Data Heal & Digital Decolonization",
    references: [
      { url: "https://docs.google.com/presentation/d/19xxc2zWWdFMAQjT6tRdN5ZU13vAKSwM7jojaC2U4F6Q/edit?usp=sharing", title: "Slides" },
      { url: "https://www.youtube.com/watch?v=D9Ihs241zeg", title: "YouTube" },
      { url: "https://vimeo.com/233683682", title: "Vimeo" },
      { url: "https://chia.design/", title: "Chia Design" },
      { url: "https://www.youtube.com/watch?v=TkslRzO5lUo", title: "YouTube" },
      { url: "https://yaa-addae.net/writing", title: "Yaa Addae" },
    ],
    projects: [
      { student: "Chip Bailey", url: "https://v0-article-to-website.vercel.app/", title: "Article to Website" },
      { student: "Kelly Cao", url: "https://silent-stream-bot.lovable.app/", title: "Silent Stream Bot" },
      { student: "Manuel Chavez", url: "https://claude.ai/public/artifacts/4580feec-c65a-4301-848c-42c657a67f16", title: "Data Heal" },
      { student: "Margaret Danenhauer", url: "https://stand-tall-online.lovable.app/", title: "Stand Tall Online" },
      { student: "Davia Ferree", url: "https://claude.ai/public/artifacts/2960135b-4d3e-486d-b719-a782b2aff8b2", title: "Data Heal" },
      { student: "Jinglin Jingan", url: "https://claude.ai/public/artifacts/d6dc1e86-7e20-4991-9658-befa549cedfc", title: "Data Heal" },
      { student: "Astghik Kalashyan", url: "https://claude.ai/public/artifacts/427dd130-64aa-4f93-9be1-5cb7fe9993ba?fullscreen=false", title: "Data Heal" },
      { student: "Jiwoo Kim", url: "https://claude.ai/public/artifacts/4eddf82b-2bb2-403e-a7cd-73ba8cead14e", title: "Data Heal" },
      { student: "Milan McIntosh", url: "https://lovable.dev/projects/1bfc88a1-abfb-47fc-a48e-1137267ae9ad", title: "Data Heal" },
      { student: "Ben Regev", url: "https://claude.ai/public/artifacts/ebabce2d-0737-4ebc-afd6-d55b3de6e7a9", title: "Data Heal" },
      { student: "Jason Rui", url: "https://emoji-bias-blaster.lovable.app/", title: "Emoji Bias Blaster" },
      { student: "Jonas Sansone", url: "https://v0-songwriting-website.vercel.app/", title: "Songwriting Website" },
    ],
  },
  {
    title: "Vibe Code Experiment #8: Critical Access",
    references: [
      { url: "https://www.youtube.com/watch?v=2Euof4PnjDk", title: "Critical Access" },
      { url: "https://alt-text-as-poetry.net/index.html", title: "Alt Text as Poetry" },
      { url: "https://alistapart.com/article/designing-for-cognitive-differences/", title: "Designing for Cognitive Differences" },
      { url: "https://www.youtube.com/watch?v=OFS8SpwioZ4&ab_channel=Netflix", title: "Netflix" },
      { url: "https://99percentinvisible.org/episode/curb-cuts/", title: "Curb Cuts" },
    ],
    projects: [
      { student: "Chip Bailey", url: "https://v0-orange-peel-sketch.vercel.app/", title: "Orange Peel Sketch" },
      { student: "Kelly Cao", url: "https://editor.p5js.org/kelmcao/sketches/HvPHXdJS_", title: "p5.js Sketch" },
      { student: "Manuel Chavez", url: "https://alt-verse-weaver.lovable.app/", title: "Alt Verse Weaver" },
      { student: "Margaret Danenhauer", url: "https://fero-femme-forge.lovable.app/", title: "Fero Femme Forge" },
      { student: "Davia Ferree", url: "https://lived-experience-hub.lovable.app/", title: "Lived Experience Hub" },
      { student: "Sean Guzman", url: "https://claude.ai/public/artifacts/c65dd655-d5a7-4892-896e-c331e778fd7f", title: "Critical Access" },
      { student: "Jinglin Jingan", url: "https://claude.ai/public/artifacts/efca12d0-0e2a-45a9-b71e-c52bfe99890d", title: "Critical Access" },
      { student: "Astghik Kalashyan", url: "https://claude.ai/public/artifacts/b81d1b1a-801c-4f09-bc66-5aa24d79b61a", title: "Critical Access" },
      { student: "Jiwoo Kim", url: "https://jot-your-thought.lovable.app/?utm_source=lovable-editor", title: "Jot Your Thought" },
      { student: "Akasa Mei", url: "https://moonlight-sonata-canvas.lovable.app", title: "Moonlight Sonata Canvas" },
      { student: "Ben Regev", url: "https://claude.ai/public/artifacts/e4a39f18-195a-4ea8-bd7e-7af622c2a5a3", title: "Critical Access" },
      { student: "Jason Rui", url: "https://conscious-code-guide.lovable.app/", title: "Conscious Code Guide" },
      { student: "Robynn Shen", url: "https://tactile-echo.lovable.app/", title: "Tactile Echo" },
      { student: "Claire Smith", url: "https://v0.app/chat/text-to-poem-t8krb1O1ISm?utm_source=cesmith-8401&utm_medium=referral&utm_campaign=share_chat&ref=U8HFBA", title: "Text to Poem" },
    ],
  },
  {
    title: "Vibe Code Experiment #9: Algorithmic Resistance",
    references: [
      { url: "https://cyberfeminismindex.com/", title: "Cyberfeminism Index" },
      { url: "https://xinliu.art/", title: "Xin Liu Art" },
      { url: "https://www.youtube.com/watch?v=raZf_2tcUo0&ab_channel=AriCiano", title: "YouTube" },
      { url: "https://www.technologyreview.com/2020/06/05/1002709/the-activist-dismantling-racist-police-algorithms/", title: "Dismantling Racist Police Algorithms" },
    ],
    projects: [
      { student: "Chip Bailey", url: "https://claude.ai/public/artifacts/54968249-f844-44bd-92b4-51694ae01865", title: "Algorithmic Resistance" },
      { student: "Kelly Cao", url: "https://claude.ai/public/artifacts/ea5c644c-7545-4b08-8b47-0a5f68b87018", title: "Algorithmic Resistance" },
      { student: "Manuel Chavez", url: "https://watchtower-usa-sim.lovable.app/", title: "Watchtower USA Sim" },
      { student: "Margaret Danenhauer", url: "https://interro-genius.lovable.app/", title: "Interro Genius" },
      { student: "Davia Ferree", url: "https://www.are.na/block/7977381", title: "Are.na Block" },
      { student: "Jiwoo Kim", url: "https://tear-tracker-tale.lovable.app/", title: "Tear Tracker Tale" },
      { student: "Akasa Mei", url: "https://space-diary-friends.lovable.app/", title: "Space Diary Friends" },
      { student: "Ben Regev", url: "https://claude.ai/public/artifacts/cabacea9-c60d-4135-9759-607acfd2a5cd", title: "Algorithmic Resistance" },
      { student: "Jonas Sansone", url: "http://project.cyberpunk.ru/idb//genre_and_gender_in_cyberpunk_fiction.html", title: "Cyberpunk Fiction" },
    ],
  },
  {
    title: "Vibe Code Experiment #10: Live Coding & Performance",
    references: [
      { url: "https://www.instagram.com/reel/DJ-JYGLz2WN/", title: "Instagram Reel" },
      { url: "https://www.youtube.com/watch?v=uJFNnLeDJf8", title: "Live Coding" },
      { url: "https://ojack.xyz/", title: "Olivia Jack" },
    ],
    projects: [
      { student: "Kelly Cao", url: "https://claude.ai/public/artifacts/0116efc6-5423-44de-a3a2-ebdb42137b08", title: "Live Coding" },
      { student: "Davia Ferree", url: "https://synth-from-script.lovable.app/", title: "Synth from Script" },
      { student: "Jiwoo Kim", url: "https://generative-dance.lovable.app/", title: "Generative Dance" },
      { student: "Jason Rui", url: "https://digital-bloom-play.lovable.app/", title: "Digital Bloom Play" },
    ],
  },
];

/* =============================================
   RENDER NAV
   ============================================= */
const navList = document.getElementById('nav-list');
experiments.forEach((exp, idx) => {
  const num = String(idx + 1).padStart(2, '0');
  const sectionId = `experiment-${idx + 1}`;
  const shortTitle = exp.title.replace(/Vibe Cod(e|ing) Experiment #\d+:\s*/i, '');
  const li = document.createElement('li');
  li.innerHTML = `<a href="#${sectionId}"><span class="experiment-number">${num}</span>${shortTitle}</a>`;
  navList.appendChild(li);
});

/* =============================================
   RENDER EXPERIMENTS
   ============================================= */
const experimentsContainer = document.getElementById('experiments');

experiments.forEach((exp, idx) => {
  const sectionId = `experiment-${idx + 1}`;
  const num = String(idx + 1).padStart(2, '0');
  const shortTitle = exp.title.replace(/Vibe Cod(e|ing) Experiment #\d+:\s*/i, '');
  const gradient = THEME_GRADIENTS[idx] || THEME_GRADIENTS[0];

  let referencesHTML = '';
  if (exp.references?.length) {
    referencesHTML = `
      <div class="references">
        <p>Reading Materials</p>
        <ul>${exp.references.map(r => `
          <li><a href="${r.url}" target="_blank" rel="noopener noreferrer">${r.title}</a></li>
        `).join('')}</ul>
      </div>`;
  }
  

  let projectsHTML = '';
  if (exp.projects?.length) {
    projectsHTML = `
      <div class="section-meta">
        <span class="meta-chip">${exp.projects.length} projects</span>
      </div>
      <div class="projects-grid">
        ${exp.projects.map(p => `
          <div class="project-card"
            data-url="${p.url}"
            data-student="${p.student}"
            data-title="${p.title}"
            data-gradient="${gradient}"
            role="button" tabindex="0"
            aria-label="Open ${p.title} by ${p.student}">
            <div class="card">
              <div class="card-img-bg" style="background: ${gradient};"></div>
              <div class="card-content">
                <p class="student-name">${formatStudentName(p.student)}</p>
                <p class="project-title">${p.title}</p>
                <p class="open-hint">Click to preview ↗</p>
              </div>
            </div>
          </div>`).join('')}
      </div>`;
  }

  const section = document.createElement('section');
  section.id = sectionId;
  section.innerHTML = `
    <span class="experiment-num-badge">Experiment ${num}</span>
    <h2>${shortTitle}</h2>
    ${referencesHTML}
    ${projectsHTML}`;
  experimentsContainer.appendChild(section);
});

/* =============================================
   SCREENSHOT PREVIEW on card hover
   We lazy-load screenshot previews via microlink API.
   Cards fall back to gradient if it fails or is slow.
   ============================================= */
function attachScreenshotPreviews() {
  const imageCache = new Map();

  document.getElementById('experiments').addEventListener('mouseenter', (e) => {
    const card = e.target.closest('.project-card');
    if (!card) return;

    const url = card.dataset.url;
    const imgBg = card.querySelector('.card-img-bg');
    if (!imgBg || imgBg.dataset.loaded) return;

    if (imageCache.has(url)) {
      const cached = imageCache.get(url);
      if (cached) {
        imgBg.style.backgroundImage = `url(${cached})`;
        imgBg.dataset.loaded = '1';
      }
      return;
    }

    // Use microlink screenshot API
    const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;

    fetch(apiUrl)
      .then(r => r.json())
      .then(data => {
        const screenshotUrl = data?.data?.screenshot?.url;
        if (screenshotUrl) {
          imageCache.set(url, screenshotUrl);
          // Pre-load
          const img = new Image();
          img.onload = () => {
            imgBg.style.backgroundImage = `url(${screenshotUrl})`;
            imgBg.dataset.loaded = '1';
          };
          img.src = screenshotUrl;
        } else {
          imageCache.set(url, null); // mark as failed
        }
      })
      .catch(() => {
        imageCache.set(url, null);
      });
  }, true);
}

attachScreenshotPreviews();

/* =============================================
   MODAL LOGIC
   ============================================= */
const modal          = document.getElementById('modal');
const modalIframe    = document.getElementById('modal-iframe');
const modalClose     = document.getElementById('modal-close');
const modalStudent   = document.getElementById('modal-student');
const modalTitleText = document.getElementById('modal-title-text');
const modalExternal  = document.getElementById('modal-external');
const modalLoading   = document.getElementById('modal-loading');
const modalBlocked   = document.getElementById('modal-blocked');
const modalBlockedLink = document.getElementById('modal-blocked-link');

function toEmbedUrl(originalUrl) {
  try {
    const u = new URL(originalUrl);
    const host = u.hostname.toLowerCase();
    if (host.includes('youtube.com') && u.searchParams.has('v')) {
      return `https://www.youtube.com/embed/${u.searchParams.get('v')}`;
    }
    if (host === 'youtu.be') {
      const id = u.pathname.slice(1);
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    if (host.includes('vimeo.com') && /^\/\d+/.test(u.pathname)) {
      const id = u.pathname.split('/').filter(Boolean)[0];
      return `https://player.vimeo.com/video/${id}`;
    }
    return originalUrl;
  } catch { return originalUrl; }
}

function openModal(url, student, title) {
  modalStudent.textContent   = student;
  modalTitleText.textContent = title;
  modalExternal.href         = url;
  modalBlockedLink.href      = url;
  modalLoading.style.display = 'flex';
  modalBlocked.classList.remove('show');
  modalIframe.src = '';
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  const tryUrl = toEmbedUrl(url);
  modalIframe.src = tryUrl;
  modalIframe.onload = null;
  modalIframe.onerror = null;

  const loadTimer = setTimeout(() => {
    modalLoading.style.display = 'none';
    if (!modalIframe.dataset.loaded) modalBlocked.classList.add('show');
  }, 8000);

  modalIframe.onload = () => {
    clearTimeout(loadTimer);
    modalLoading.style.display = 'none';
    modalIframe.dataset.loaded = '1';
    modalBlocked.classList.remove('show');
  };

  modalIframe.onerror = () => {
    clearTimeout(loadTimer);
    modalLoading.style.display = 'none';
    modalBlocked.classList.add('show');
  };
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
  setTimeout(() => {
    try {
      modalIframe.src = 'about:blank';
      delete modalIframe.dataset.loaded;
    } catch {}
  }, 300);
}

document.getElementById('experiments').addEventListener('click', (e) => {
  const card = e.target.closest('.project-card');
  if (card) openModal(card.dataset.url, card.dataset.student, card.dataset.title);
});

document.getElementById('experiments').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    const card = e.target.closest('.project-card');
    if (card) { e.preventDefault(); openModal(card.dataset.url, card.dataset.student, card.dataset.title); }
  }
});

if (modalClose) modalClose.addEventListener('click', closeModal);
if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

/* =============================================
   SMOOTH SCROLL ARROW
   ============================================= */
const scrollArrow = document.querySelector('.scroll-arrow');
if (scrollArrow) {
  scrollArrow.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
  });
}

/* =============================================
   SECTION REVEAL ON SCROLL
   ============================================= */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('section').forEach(sec => {
  sec.style.opacity = '0';
  sec.style.transform = 'translateY(24px)';
  sec.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  revealObserver.observe(sec);
});