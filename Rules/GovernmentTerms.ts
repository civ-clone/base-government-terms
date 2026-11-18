import Government from '@civ-clone/core-government/Government';
import Rule from '@civ-clone/core-rule/Rule';
import { Terms } from '../lib/terms';

// What a government does, as data (`lib/terms`): a ruleset registers one or more for each of its governments, each
//  answering the terms it knows, so a player (or its AI) can compare governments without asking the rules that apply
//  them. Asked with the government's class, not a player's, so a government the player doesn't have can be weighed too.
export class GovernmentTerms extends Rule<
  [typeof Government],
  Partial<Terms>
> {}

export default GovernmentTerms;
