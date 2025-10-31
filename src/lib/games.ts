export interface Game {
  id: string;
  title: string;
  image: string;
  tags: string[];
  category: string;
  href: string;
  popular?: boolean;
  trending?: boolean;
  featured?: boolean;
}

export const games: Game[] = [
  // Most Played Games
  {
    id: "shell-shockers",
    title: "Shell Shockers",
    image: "https://ext.same-assets.com/54244373/219849240.jpeg",
    tags: ["io", "mmorpg", "gun"],
    category: "io",
    href: "/play/shell-shockers",
    popular: true,
    featured: true
  },
  {
    id: "dogeminer",
    title: "Dogeminer",
    image: "https://ext.same-assets.com/54244373/2893940060.jpeg",
    tags: ["arcade", "mining", "idle"],
    category: "clicker",
    href: "/play/dogeminer",
    popular: true
  },
  {
    id: "smash-karts",
    title: "Smash Karts",
    image: "https://ext.same-assets.com/54244373/2183238829.jpeg",
    tags: ["io", "car", "fun"],
    category: "car",
    href: "/play/smash-karts",
    popular: true,
    featured: true
  },
  {
    id: "funny-battle-simulator-2",
    title: "Funny Battle Simulator 2",
    image: "https://ext.same-assets.com/54244373/1042457567.jpeg",
    tags: ["action", "war", "battle"],
    category: "action",
    href: "/play/funny-battle-simulator-2",
    popular: true
  },
  {
    id: "body-drop-3d",
    title: "Body Drop 3d",
    image: "https://ext.same-assets.com/54244373/1856055637.jpeg",
    tags: ["action", "cool", "adventure"],
    category: "action",
    href: "/play/body-drop-3d",
    popular: true
  },
  {
    id: "10x10",
    title: "10x10!",
    image: "https://ext.same-assets.com/54244373/1687410133.jpeg",
    tags: ["tetris", "brain", "block"],
    category: "puzzle",
    href: "/play/10x10",
    popular: true
  },
  {
    id: "ultimate-hero-clash-2",
    title: "Ultimate Hero Clash 2",
    image: "https://ext.same-assets.com/54244373/1016626221.jpeg",
    tags: ["fighting", "anime", "battle"],
    category: "fighting",
    href: "/play/ultimate-hero-clash-2",
    popular: true
  },

  // Recommended Games
  {
    id: "the-quest-arena",
    title: "The Quest Arena",
    image: "https://ext.same-assets.com/54244373/3081551207.jpeg",
    tags: ["battle royale", "pixel", "mobile"],
    category: "action",
    href: "/play/the-quest-arena-multiplayer",
    featured: true
  },
  {
    id: "krunker",
    title: "Krunker",
    image: "https://ext.same-assets.com/54244373/1962848743.jpeg",
    tags: ["io", "mmorpg", "gun"],
    category: "io",
    href: "/play/krunker",
    featured: true
  },
  {
    id: "looking-for-aliens",
    title: "Looking For Aliens Collector's Edition",
    image: "https://ext.same-assets.com/54244373/379524022.jpeg",
    tags: ["hidden object", "puzzle", "addictive"],
    category: "puzzle",
    href: "/play/looking-for-aliens-collector-s-edition",
    featured: true
  },
  {
    id: "ragdolf",
    title: "Ragdolf",
    image: "https://ext.same-assets.com/54244373/2734038897.jpeg",
    tags: ["golf", "fun", "platformer"],
    category: "sports",
    href: "/play/ragdolf",
    featured: true
  },

  // Trending Games
  {
    id: "insect-legends",
    title: "Insect Legends",
    image: "https://ext.same-assets.com/54244373/2548720828.jpeg",
    tags: ["casual", "idle", "money"],
    category: "casual",
    href: "/play/insect-legends",
    trending: true
  },
  {
    id: "thung-thung-sahur-escape",
    title: "Thung Thung Sahur - Escape",
    image: "https://ext.same-assets.com/54244373/3182624086.jpeg",
    tags: ["scary", "escape", "horror"],
    category: "horror",
    href: "/play/thung-thung-sahur-escape-backrooms",
    trending: true
  },
  {
    id: "magic-finger-3d",
    title: "Magic Finger 3d",
    image: "https://ext.same-assets.com/54244373/3889633291.jpeg",
    tags: ["casual", "mobile", "battle"],
    category: "casual",
    href: "/play/magic-finger-3d",
    trending: true
  },
  {
    id: "hard-working-man",
    title: "Hard Working Man",
    image: "https://ext.same-assets.com/54244373/1603165416.jpeg",
    tags: ["adventure", "farming", "simulation"],
    category: "simulation",
    href: "/play/hard-working-man",
    trending: true
  },

  // IO Games
  {
    id: "knifeblades-io",
    title: "Knifeblades.io",
    image: "https://ext.same-assets.com/54244373/4196435507.jpeg",
    tags: ["io", "skill", "battle"],
    category: "io",
    href: "/play/knifeblades-io"
  },
  {
    id: "battledudes-io",
    title: "Battledudes.io",
    image: "https://ext.same-assets.com/54244373/1044581460.jpeg",
    tags: ["io", "gun", "battle"],
    category: "io",
    href: "/play/battledudes-io"
  },
  {
    id: "spinner-io",
    title: "Spinner.io",
    image: "https://ext.same-assets.com/54244373/329034618.jpeg",
    tags: ["io", "clicker", "spinner"],
    category: "io",
    href: "/play/spinner-io"
  },
  {
    id: "hole-io",
    title: "Hole.io",
    image: "https://ext.same-assets.com/54244373/1687911999.jpeg",
    tags: ["io", "building", "battle royale"],
    category: "io",
    href: "/play/hole-io"
  },
  {
    id: "paper-io-2",
    title: "Paper.io 2",
    image: "https://ext.same-assets.com/54244373/1778678504.jpeg",
    tags: ["io", "cool", "skill"],
    category: "io",
    href: "/play/paper-io-2"
  },

  // Casual Games
  {
    id: "breakit",
    title: "Breakit",
    image: "https://ext.same-assets.com/54244373/3948426802.jpeg",
    tags: ["casual", "block", "ball"],
    category: "casual",
    href: "/play/breakit"
  },
  {
    id: "drift-boss",
    title: "Drift Boss",
    image: "https://ext.same-assets.com/54244373/1274373130.jpeg",
    tags: ["racing", "drifting", "driving"],
    category: "racing",
    href: "/play/drift-boss"
  },
  {
    id: "golf-orbit",
    title: "Golf Orbit",
    image: "https://ext.same-assets.com/54244373/184932838.jpeg",
    tags: ["golf", "ball", "sports"],
    category: "sports",
    href: "/play/golf-orbit"
  },
  {
    id: "color-line",
    title: "Color Line",
    image: "https://ext.same-assets.com/54244373/947471547.jpeg",
    tags: ["arcade", "coloring", "skill"],
    category: "arcade",
    href: "/play/color-line"
  },

  // Action Games
  {
    id: "call-of-tanks",
    title: "Call Of Tanks",
    image: "https://ext.same-assets.com/54244373/2150668679.jpeg",
    tags: ["action", "tanks", "battle"],
    category: "action",
    href: "/play/call-of-tanks"
  },
  {
    id: "hero-3-flying-robot",
    title: "Hero 3: Flying Robot",
    image: "https://ext.same-assets.com/54244373/208860408.jpeg",
    tags: ["action", "robots", "flight"],
    category: "action",
    href: "/play/hero-3-flying-robot"
  },
  {
    id: "stickman-warriors",
    title: "Stickman Warriors",
    image: "https://ext.same-assets.com/54244373/2510828694.jpeg",
    tags: ["fighting", "action", "stickman"],
    category: "action",
    href: "/play/stickman-warriors-1"
  },

  // Sports Games
  {
    id: "hoop-world",
    title: "Hoop World",
    image: "https://ext.same-assets.com/54244373/3117196110.jpeg",
    tags: ["basketball", "sports", "addictive"],
    category: "sports",
    href: "/play/hoop-world"
  },
  {
    id: "penalty-kick-wiz",
    title: "Penalty Kick Wiz",
    image: "https://ext.same-assets.com/54244373/795172679.jpeg",
    tags: ["sports", "ball", "soccer"],
    category: "sports",
    href: "/play/penalty-kick-wiz"
  },

  // Kids Games
  {
    id: "hellokids-color-by-number",
    title: "Hellokids Color By Number",
    image: "https://ext.same-assets.com/54244373/2869770498.jpeg",
    tags: ["kids", "coloring", "drawing"],
    category: "kids",
    href: "/play/hellokids-color-by-number"
  },
  {
    id: "teen-titans",
    title: "Teen Titans",
    image: "https://ext.same-assets.com/54244373/3429624477.jpeg",
    tags: ["kids", "two player", "battle"],
    category: "kids",
    href: "/play/teen-titans"
  }
];

export const gameCategories = [
  { id: "all", name: "All Games", icon: "🎮" },
  { id: "io", name: "IO Games", icon: "🌐" },
  { id: "action", name: "Action", icon: "⚔️" },
  { id: "casual", name: "Casual", icon: "🎲" },
  { id: "puzzle", name: "Puzzle", icon: "🧩" },
  { id: "racing", name: "Racing", icon: "🏎️" },
  { id: "sports", name: "Sports", icon: "⚽" },
  { id: "kids", name: "Kids", icon: "👶" },
  { id: "shooter", name: "Shooter", icon: "🔫" },
  { id: "clicker", name: "Clicker", icon: "👆" },
  { id: "car", name: "Car", icon: "🚗" },
  { id: "fighting", name: "Fighting", icon: "🥊" }
];

export const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Most played", href: "/most-played" },
  { name: "New", href: "/new" },
  { name: "Trending", href: "/trending" },
  { name: "Specials", href: "/specials" },
  { name: "Recently played", href: "/recently-played" }
];
