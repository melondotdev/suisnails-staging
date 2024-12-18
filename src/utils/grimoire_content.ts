export interface Section {
  id: string;
  title: string;
  content: string;
  imageSrc?: string;
  symbolSrc?: string;
}

export const LORE_SECTIONS: Section[] = [
  {
    id: "lore",
    title: "Lore of the Eternal Shell",
    content: `
Elder powers, known only by twisted murmurs—The Seven Sins—oversee this nightmare crucible. Each hero, bound to a blockchain soul, emerges brittle and uncertain at Tier 1. The Abyss now rises like a living cancer, its spawn a chattering chorus of shapeless intent.

- The eternal shell grants rebirth, cheating death’s hungry maw.
- By felling Abyssal husks, the hero draws in $SUS, black ichor of divine amusement.
- With $SUS, base metals transmute into relics that shine like glistening nightmares.

The heroes must unite to churn $SUS into a bulwark against the yawning dark, forging alliances in whispers and screams.
    `,
    imageSrc: "/assets/background.webp",
    symbolSrc: "/assets/background.webp"
  },
  {
    id: "heroes",
    title: "A Soul Anchored to a Wallet & The Nature of Heroes",
    content: `
Accounts anchor one’s presence—a soul encoded in cryptic ledgers. Each newborn hero crawls forth:

- Tier 1: A fragile spark in an endless black.
- With $5 USD or equivalent $SUS, ascend to Tier 2, where might and mystery multiply.

Attributes of each hero:
- A weapon of chthonic metal.
- A shell spun from cosmic sinew.
- Three accessories: ring, necklace, boots—fetters of subtle influence.
- 10 unspent stat points, a seed awaiting corruption.
- Levels (1 to 120) mark ascension into transcendent madness.
- Tiers (1 to 5) yield greater EXP and $POINTs, dark bribes from the Abyss itself.
    `,
    imageSrc: "/assets/heroes.png",
    symbolSrc: "/assets/symbol-heroes.png"
  },
  {
    id: "items",
    title: "Items: A Catalogue of Blasphemies",
    content: `
All items are keys to cryptic doors. Some locks demand minimum stats, arcane thresholds whispered by dormant runes:

- Weapons: Basic strikes mutate under esoteric triggers.
- Shells: Forbidden moves detonate when blood runs thin.
- Accessories: Quiet conductors of fate, twisting destiny’s numbers.

Only by meeting eldritch requirements do these dormant horrors bloom.
    `,
    imageSrc: "/assets/items.png",
    symbolSrc: "/assets/symbol-items.png"
  },
  {
    id: "depthlight",
    title: "The Depthlight Portal",
    content: `
A rent in comprehension’s fabric. Through it, heroes drift into frontier zones where an endless ballet of violence unfolds in eerie silence. Each victory yields EXP and $SUS—each foe slain a stepping stone into deeper madness.
    `,
    imageSrc: "/assets/depthlight.png",
    symbolSrc: "/assets/symbol-depthlight.png"
  },
  {
    id: "temple",
    title: "The Crystal Temple",
    content: `
Within prism-lit halls, $SUS is devoured to reforge iron into shrieking relics. Here, matter and meaning twist together, birthing impossible artifacts as silent custodians watch with hollow eyes.
    `,
    imageSrc: "/assets/temple.png",
    symbolSrc: "/assets/symbol-temple.png"
  },
  {
    id: "shellmart",
    title: "The Shellmart",
    content: `
A dim emporium where rare, epic, and legendary items shimmer and fade in cyclical rotations. Spend $SUS or traded spoils to grasp ephemeral wonders. Reselling yields half-value, as the Mart laughs in silent mockery.
    `,
    imageSrc: "/assets/shellmart.png",
    symbolSrc: "/assets/symbol-shellmart.png"
  },
  {
    id: "trading",
    title: "The Shelloria Trading Company",
    content: `
Hooded figures weave liquidity pools of void-thread. Stake tokens, reap $SUS and SUI. This is commerce on a razor’s edge, trust and terror intermingled.
    `,
    imageSrc: "/assets/trading.png",
    symbolSrc: "/assets/symbol-trading.png"
  },
  {
    id: "autobattle",
    title: "The Abyssal Dance of Autobattle",
    content: `
In turn-based crucibles, hero and foe trade violent verses. Specials emerge under cryptic conditions. Death triggers revival via eternal shell. Foes yield EXP and $SUS, heroes learn from each humiliating fall.

Base Stats:
- STR: Iron jaws crushing bone.
- END: Bulwark against shrieking oblivion.
- AGI: Quicksilver blood beneath starless skies.
- STA: Unending breath in choking gloom.
- MGK: Channels to cosmic abysses.
- LUK: Fate’s coin in silent spin.

From these seeds bloom derived stats: HP, MP, regenerations, speed, defenses—fungi thriving in corpse-lit soil.
    `,
    imageSrc: "/assets/autobattle.png",
    symbolSrc: "/assets/symbol-autobattle.png"
  }
];

export const TOKENOMICS_SECTIONS: Section[] = [
  {
    id: "tokenomics",
    title: "Tokenomics: The Black Ichor of Power",
    content: `
$SUS drips from the Abyss, a coin of night:
- Initial Emission: A measured flow to spark the dawn of madness.
- Supply Dynamics: As heroes harvest foe after foe, $SUS seeps forth but slows over epochs, maintaining scarcity’s blade at the throat of abundance.

Distribution:
- Adventurers’ Share: Most $SUS to those who plunge blades into horror.
- Stakers’ Tribute: Those who stake $SUS and SUI drink steady, dark rewards.
- Market Rotation: As Shellmart’s gears turn, $SUS cycles back into hidden hollows.

Deflationary Mechanisms:
- Forging at the Temple consumes $SUS, trapped in relics of shrieking design.
- Half-return on sales recovers currency into silent coffers.
- Over time, $SUS coils tighter, locking value behind grim rituals.

Long-Term Vision:
Perhaps one day, even revival shall demand $SUS, making death an economic equation. Thus, $SUS remains the black heart of Shelloria, pulsing fear and necessity into every vein.
    `,
    imageSrc: "/assets/tokenomics.png",
    symbolSrc: "/assets/symbol-tokenomics.png"
  },
  {
    id: "occultMetrics",
    title: "Occult Metrics",
    content: `
Peer into the void's statistics:

- Total $SUS Harvested: 66,666 (Essence of Abyss)
- Heroes Forged: 10,420 (Shell-bound Souls)
- Realms Explored: 7 (Frontiers of Night)
- Cycle Count: 120 (Levels of Madness)

In these numbers, fate reveals its cryptic patterns.
    `,
    imageSrc: "/assets/metrics.png",
    symbolSrc: "/assets/symbol-metrics.png"
  }
];

export const GRIMOIRE_CONTENT = {
  title: "The Codex: A Whispered Testament",
  subtitle: "In the silent recesses of the cosmic void—where nameless entities brood beneath starless skies.",
  intro: `Within the unborn corridors of Shelloria’s dusk, cryptic tongues whisper of destinies etched in umbral ink. The Original Gods have summoned heroes and granted them an eternal shell, forging a bulwark against death’s jaws. The Abyss festers below, its spawn legion and formless. SUS, distilled from black intent, courses through these nightmare veins. Let these passages guide you, if you dare.`,
  loreSections: LORE_SECTIONS,
  tokenomicsSections: TOKENOMICS_SECTIONS
};
