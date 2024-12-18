import { EncryptionItem } from './types';

export const MAX_ATTEMPTS = 6;

export const KEY_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

// Eldritch-themed words (5-6 letters). Updated with real words.
export const WORDS = [
  'CHAOS',   // original
  'WRAITH',  // original
  'MIASMA',  // original
  'AZOTH',   // original
  'DAGON',   // Lovecraftian deity
  'HASTUR',  // Lovecraftian entity
  'RLYEH',   // Sunken city in Lovecraftian lore
  'SLIME',   // Horror theme
  'BLOOD',   // Horror theme
  'RITUAL',  // Occult theme
  'CURSE',   // Horror/occult theme
  'SHADOW',  // Horror/eldritch theme
  'FEAR',    // Horror theme
  'DOOM',    // Horror theme
  'GRAVE',   // Horror theme
  'TOMB',    // Horror theme
  'CRYPT',   // Horror/eldritch theme
  'GHOUL',   // Horror theme
  'ETHER',   // Occult/eldritch theme
  'ABYSS',   // Horror/eldritch theme
  'VOID',    // Horror/eldritch theme
  'BLACK',   // Horror theme
  'WITCH',   // Occult/horror theme
  'DEATH',   // Horror theme
  'FRAIL',   // Eldritch feel
  'GRIM',    // Horror theme
  'HORROR',  // Horror theme
  'MADNESS', // Eldritch/Lovecraftian
  'NIGHT',   // Horror theme
  'PLAGUE',  // Horror/eldritch theme
  'EVIL',    // Horror theme
  'SPELL',   // Occult/eldritch theme
  'SHRINE',  // Eldritch/occult theme
  'ANGST',   // Horror theme
  'MOON',    // Horror/eldritch theme
  'FANGS',   // Horror theme
  'LYCAN',   // Horror theme (werewolf)
  'HOWL',    // Horror theme
  'SPIRIT',  // Occult/eldritch theme
  'PHASE',   // Eldritch feel
  'COVEN',   // Occult/horror theme
  'ALTAR',   // Occult/eldritch theme
  'ORACLE',  // Occult/eldritch theme
  'SERUM',   // Eldritch/horror theme
  'VIGIL',   // Occult/eldritch theme
  'RELIEF',  // Occult/horror theme
  'CREEP',   // Horror theme
  'MYTHOS',  // Lovecraftian
  'ELDER',   // Lovecraftian elder gods
  'TERROR',  // Horror theme
  'HARBOR',  // Eldritch feel
  'SHIVER'   // Horror/eldritch theme
];

// Separate logs arrays. Feel free to add more log sets.
const LOG_SETS = [
  [
    '> [INITIATING_FORBIDDEN_SEQUENCE]',
    'Status: [REALITY_BREACH_DETECTED]',
    '',
    '"That is not dead which can eternal lie,',
    ' And with strange aeons even death may die."',
    '',
    '[COGNITOHAZARD_WARNING]',
    'Reality Coherence: UNSTABLE',
    'Dimensional Resonance: CRITICAL',
    'Void Signature: ████████'
  ],
  [
    '> Accessing forbidden grimoire...',
    '[MEMETIC_HAZARD_DETECTED]',
    '',
    'Ancient text fragment recovered:',
    '└─ "The Old Ones were, the Old Ones are, and the Old Ones shall be again."',
    '',
    'Sanity Level: COMPROMISED',
    'Reality Anchor: FAILING',
    'Void Resonance: ∞',
    '[CONTAINMENT_PROTOCOLS_ACTIVATED]'
  ],
  [
    '> [DEEP_ONES_DETECTED]',
    'Status: [AQUATIC_ANOMALY]',
    '',
    'Recovered sea logs:',
    '"In his house at R\'lyeh,',
    ' dead Cthulhu waits dreaming."',
    '',
    'Ocean Depth: [IMPOSSIBLE]',
    'Pressure Reading: NULL',
    'Void Echo: RESONATING'
  ],
  [
    '> [FINAL_SEQUENCE_INITIATED]',
    'Status: [REALITY_DISSOLVING]',
    '',
    'Final warning:',
    '"The stars align, the gate opens,',
    ' What was sealed shall be unbound."',
    '',
    '[CONTAINMENT_FAILURE_IMMINENT]',
    'Reality Status: COLLAPSING',
    'Void Convergence: COMPLETE'
  ]
];

// Randomly select a word and a log set.
export const getRandomEncryptionItem = (): EncryptionItem => {
  const randomWordIndex = Math.floor(Math.random() * WORDS.length);
  const randomLogsIndex = Math.floor(Math.random() * LOG_SETS.length);

  const selectedWord = WORDS[randomWordIndex];
  const selectedLogs = LOG_SETS[randomLogsIndex];

  return {
    id: Math.floor(Math.random() * 1000),
    timestamp: '██.██.████ ██:██:██ [TEMPORAL_ANOMALY]',
    word: selectedWord,
    logs: selectedLogs
  };
};
