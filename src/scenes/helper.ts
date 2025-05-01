
export function getScreenSize(width: number, height: number) {
    let scaleFactorX, scaleFactorY;

        // Portrait
        if (width < 600 && height >= 800) {
            scaleFactorX = 0.32;
            scaleFactorY = 0.5;
        } else if (width >= 600 && width < 768 && height >= 800) {
            scaleFactorX = 0.55;
            scaleFactorY = 0.5;
        } else if (width >= 600 && width < 768 && height < 800) {
            scaleFactorX = 0.6;
            scaleFactorY = 0.55;
        } else if (width >= 768 && width < 950 && height >= 800) {
            scaleFactorX = 0.6;
            scaleFactorY = 0.5;
        } 
        // Landscape
        else if (width < 1050 && height < 800) {
            scaleFactorX = 0.5;
            scaleFactorY = 0.45;
        } else if (width >= 1050 && width < 1150 && height < 1000) {
            scaleFactorX = 0.5;
            scaleFactorY = 0.48;
        } else if (width >= 1150 && width < 1250 && height < 1000) {
            scaleFactorX = 0.7;
            scaleFactorY = 0.65;
        } else if (width >= 1250 && width < 1350 && height < 1000) {
            scaleFactorX = 0.75;
            scaleFactorY = 0.65;
        } else if (width >= 1350 && width < 1550 && height < 1100) {
            scaleFactorX = 0.8;
            scaleFactorY = 0.75;
        } else if (width >= 1550 && width < 1650 && height < 1100) {
            scaleFactorX = 0.85;
            scaleFactorY = 0.8;
        } else if (width >= 1650 && width < 2200 && height < 1100) {
            scaleFactorX = 0.9;
            scaleFactorY = 0.85;
        } else {
            scaleFactorX = 1;
            scaleFactorY = 0.9;
        }

        return { scaleFactorX, scaleFactorY };
}

export const animals = [
    // Farm animals
    "🐄",
    "🐖",
    "🐑",
    "🐓",
    "🐎",
    "🐐",
    "🦃",
    "🦆",
    "🐇",
    "🐕",
    "🐈",
    // Wild animals
    "🦁",
    "🐘",
    "🦒",
    "🦓",
    "🦏",
    "🐅",
    "🐆",
    "🦬",
    "🦘",
    // Forest animals
    "🦊",
    "🐿️",
    "🦔",
    "🦡",
    "🦝",
    "🐺",
    "🦌",
    // Sea creatures
    "🐬",
    "🐳",
    "🦭",
    "🐙",
    "🦑",
    "🦐",
    "🦞",
    "🐠",
    "🐡",
    "🦈",
    // Insects
    "🦋",
    "🐝",
    "🐞",
    "🦗",
    "🐜",
]

export const objects = [
    // Vehicles & Transport
    "🚗",
    "🚕",
    "🚙", 
    "🚌",
    "🚎",
    "🚓",
    "🚑",
    "🚒",
    "🚂",
    "🚆",
    "✈️",
    "🚁",
    "🚢",
    // Buildings & Places
    "🏠",
    "🏡",
    "🏢",
    "🏫",
    "🏥",
    "🏛️",
    "🏰",
    "⛩️",
];

export const everydayObjects = [
    // Tools & Devices
    "🔧",
    "🔨",
    "🪛",
    "🪚",
    "💻",
    "🖥️",
    "📱",
    "📷",
    // Everyday Objects
    "🕰️",
    "🔑",
    "🗝️",
    "📦",
    "📚",
    "🎒",
    "🧸",
    "🃏",
    "🧩",
    "🎮",
    // Miscellaneous
    "🛏️",
    "🚽",
    "🚪",
    "🪞",
    "🖼️",
    "🧯",
    "🛒",
    "📮",
]

export const food = [
    // Food & Drink
    "🍏",
    "🍎",
    "🍐",
    "🍊",
    "🍋",
    "🍌",
    "🍉",
    "🍇",
    "🍓",
    "🫐",
    "🍈",
    "🍒",
    "🥭",
    "🍍",
    "🥥",
    "🥝",
    // Nature & Weather
    "🌳",
    "🌲",
    "🌴",
    "🌵",
    "🌾",
    "🌻",
    "🌼",
];

export const sports = [
    // Sports & Activities
    "⚽",
    "🏀",
    "🏈",
    "⚾",
    "🎾",
    "🏐",
    "🏉",
    "🏏",
    "🏑",   
    "🏓",
    "🏸",
    "🥋",
    "🥊",
    "🥅",    
    "⛷️",
    "🏂",
    "🏌️"
];