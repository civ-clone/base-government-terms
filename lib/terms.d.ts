import Government from '@civ-clone/core-government/Government';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
/** Martial law under a government: the most units that keep it, and how many citizens each makes content. */
export type MartialLawTerms = {
  maximumUnits: number;
  perUnit: number;
};
/** War weariness under a government: the citizens each aggressive unit makes unhappy, after the first `free` units. */
export type MilitaryUnhappinessTerms = {
  perUnit: number;
  free: number;
};
/** A square giving more than `threshold` of a yield gives `amount` less. */
export type TilePenaltyTerms = {
  threshold: number;
  amount: number;
};
/** Corruption: the share of a city's trade lost for each square it is from the capital, or at a fixed distance. */
export type CorruptionTerms = {
  perDistance: number;
  fixedDistance: number | null;
};
/**
 * What a government does, as a ruleset numbers it. Every term is optional: a ruleset answers those it has, and a
 * reader takes its own default for the rest.
 */
export type Terms = {
  /** How many units a city of `citySize` supports for nothing. */
  freeUnits: (citySize: number) => number;
  /** The shields each unit past the free ones costs its city. */
  unitSupportCost: number;
  /** Martial law (`maximumUnits` 0: none). */
  martialLaw: MartialLawTerms;
  /** War weariness (`perUnit` 0: none). */
  militaryUnhappiness: MilitaryUnhappinessTerms;
  /** What each square that gives any trade gives more. */
  tradeBonus: number;
  /** A penalty on squares giving a lot of one yield, or `null` for none. */
  tilePenalty: TilePenaltyTerms | null;
  /** Corruption of trade. */
  corruption: CorruptionTerms;
  /** Whether no citizen is ever unhappy. */
  noUnhappiness: boolean;
  /** The share of research that counts (1 for all of it). */
  science: number;
};
/**
 * The terms the ruleset's `GovernmentTerms` rules give `GovernmentType`, merged in the order the rules run (a later
 * answer replaces an earlier one's term), or `null` when none answers: no ruleset numbers its governments this way,
 * so a reader falls back to its own.
 */
export declare const governmentTerms: (
  ruleRegistry: RuleRegistry,
  GovernmentType: typeof Government
) => Partial<Terms> | null;
/** The term `key` of `GovernmentType`, or `undefined` when no rule gives it (`null` is a term's own "none"). */
export declare const governmentTerm: <K extends keyof Terms>(
  ruleRegistry: RuleRegistry,
  GovernmentType: typeof Government,
  key: K
) => Terms[K] | undefined;
/** The government `playerGovernment` has now, or `null` with none. */
export declare const currentGovernment: (playerGovernment: {
  current(): Government | null;
}) => typeof Government | null;
export default governmentTerms;
