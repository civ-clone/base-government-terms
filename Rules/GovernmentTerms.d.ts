import Government from '@civ-clone/core-government/Government';
import Rule from '@civ-clone/core-rule/Rule';
import { Terms } from '../lib/terms';
export declare class GovernmentTerms extends Rule<
  [typeof Government],
  Partial<Terms>
> {}
export default GovernmentTerms;
