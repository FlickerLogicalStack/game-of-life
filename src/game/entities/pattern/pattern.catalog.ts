import { build_variants, parse_pattern, type Pattern, type PatternCategory, type PatternVariant } from './pattern';

type PatternSource = {
  id: string;
  name: string;
  category: PatternCategory;
  source: string;
};

// '#' is a live cell, space is dead. The parser strips the common indentation and normalizes
// the bounding box, so the shapes are written flush with the code indentation.
const SOURCES: PatternSource[] = [
  {
    id: 'glider',
    name: 'Glider',
    category: 'spaceship',
    source: `
      # 
       #
     ###
    `,
  },
  {
    id: 'lwss',
    name: 'Lightweight spaceship',
    category: 'spaceship',
    source: `
       #  #
      #
      #   #
      ####
    `,
  },
  {
    id: 'blinker',
    name: 'Blinker',
    category: 'oscillator',
    source: `
      ###
    `,
  },
  {
    id: 'toad',
    name: 'Toad',
    category: 'oscillator',
    source: `
       ###
      ###
    `,
  },
  {
    id: 'beacon',
    name: 'Beacon',
    category: 'oscillator',
    source: `
      ##
      ##
        ##
        ##
    `,
  },
  {
    id: 'pulsar',
    name: 'Pulsar',
    category: 'oscillator',
    source: `
        ###   ###

      #    # #    #
      #    # #    #
      #    # #    #
        ###   ###

        ###   ###
      #    # #    #
      #    # #    #
      #    # #    #

        ###   ###
    `,
  },
  {
    id: 'block',
    name: 'Block',
    category: 'still-life',
    source: `
      ##
      ##
    `,
  },
];

export const PATTERNS: Pattern[] = SOURCES.map(({ id, name, category, source }) => {
  const parsed = parse_pattern(source);

  return {
    id,
    name,
    category,
    width: parsed.width,
    height: parsed.height,
    cells: parsed.cells,
    variants: build_variants(parsed.cells, parsed.width, parsed.height),
  };
});

export const PATTERN_BY_ID = new Map<string, Pattern>(PATTERNS.map(pattern => [pattern.id, pattern]));

export const SPAWN_POOL: PatternVariant[] = PATTERNS.flatMap(pattern => pattern.variants);
