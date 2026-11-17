import React from 'react';
import { VersusLab } from './VersusLab';
import { VERSUS, type VersusKey } from '../../data/versusContent';

/** Thin wrapper so pages only need a slug to get the full interactive lab. */
export const VersusSection: React.FC<{ slug: VersusKey; id?: string }> = ({ slug, id }) => (
  <VersusLab {...VERSUS[slug]} id={id} />
);
