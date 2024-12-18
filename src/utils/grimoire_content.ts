export interface Section {
  id: string;
  title: string;
  content: string;
  imageSrc?: string;
  symbolSrc?: string;
}

export const LORE_SECTIONS: Section[] = [
  {
    id: "prophecy",
    title: "Twisted Prophecy",
    content: 
`Seven centuries before the Abyss first stirred beneath Shelloria’s soil, Pope Lucifer VI, eyes alight with ember-flames, whispered his final prophecy beneath stained-glass constellations. He spoke of a future drenched in darkness, of a tide of teeth and blood crawling from the world’s secret belly to devour all hope. 

Yet in that wretched silence, he promised one last spark. From the ruin and the rot would rise a champion—shell fractured, soul tempered—wielding the powers of [REDACTED]. This hero’s trials would be etched into the marrow of the ages: to surpass the very limit of the soul, to unearth the blasphemous secret of the Abyss, and to wrest free from the iron grasp of fate itself.`
    ,
    imageSrc: "/assets/lore/prophecy.webp",
    symbolSrc: "/assets/lore/prophecy.webp"
  },
  {
    id: "invasion",
    title: "Invasion of Shelloria",
    content: 
`As if prying open a malignant wound in the earth, the Abyss shuddered upward, vomiting forth horrors shaped from nightmares’ deepest pits. Their shrieks echoed across dying fields, and within mere hours, cities fell to gnashing maws and quivering tendrils. Over a million souls—once lovers, dreamers, and children—were devoured or corrupted in a single dawn.

Muted legends hinted that nameless powers, older than gods and madder than demons, guided this living darkness. Frantic whispers and ragged pleas shattered the hush of once-holy halls, yet no plea was answered. In desperation, some tried to appease their new masters, but their efforts [REDACTED] left only insanity and a chorus of screams. Alliances formed in secret corners, trembling as they faced the hungry void—its maw of silence wide open, its soul-swallowing power unchecked.`
    ,
    imageSrc: "/assets/background.webp",
    symbolSrc: "/assets/background.webp"
  },
  {
    id: "defense",
    title: "Defense of Shelloria",
    content: 
`In that dire age, the alliance forged its last, trembling line in the dust—a fragile cordon known as the Three Point Perimeter. Three fortified positions stood between the survivors and the howling dusk beyond. Within these bastions, weary defenders clung to the ragged edges of survival, blades notched and shields soaked in ichor. 

It was the best they could achieve: to halt, not to reclaim. Beyond the perimeter’s meager lantern glow, twisted abominations prowled unending nights, blotting out what remained of the stars. Hope was a rumor, faith a withered husk. The Gods, their altars long silent, offered no comfort. The defenders knew only this thin line and the silent hum of despair that pressed in like suffocating smoke.`
    ,
    imageSrc: "/assets/lore/invasion.webp",
    symbolSrc: "/assets/lore/invasion.webp"
  },
  {
    id: "summons",
    title: "Earthling Summons",
    content: 
`When all seemed lost, the heart of Shelloria pulsed with impossible light. The Central Temple flared like a molten dawn, tearing the clotted clouds apart. Through shimmering radiance, six figures descended its marble steps. They bore forms both strange and regal, each adorned with a pristine, gleaming shell on their backs—a promise of otherworldly favor.

The survivors gasped as these "Earthlings" revealed impossible blessings: flickers of wrathful flame dancing at their fingertips, swiftness and cunning sharper than mortal ken. With measured steps, the six strode into the waiting maw of the Abyss, each promise a defiance against the looming end. They moved with grim purpose, forging a fragile, trembling hope that perhaps the silence of the Gods had not been ignorance, but careful, measured intent.`
    ,
    imageSrc: "/assets/lore/summons.webp",
    symbolSrc: "/assets/lore/summons.webp"
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
  intro: `Within the unborn corridors of Shelloria’s dusk, cryptic tongues whisper of destinies etched in umbral ink. The Gods have summoned heroes and granted them an eternal shell, forging a bulwark against death’s jaws. The Abyss festers below, its spawn legion and formless. SUS, distilled from black intent, courses through these nightmare veins. Let these passages guide you, if you dare.`,
  loreSections: LORE_SECTIONS,
  tokenomicsSections: TOKENOMICS_SECTIONS
};
