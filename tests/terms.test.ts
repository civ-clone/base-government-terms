import governmentTerms, {
  currentGovernment,
  governmentTerm,
} from '../lib/terms';
import Criterion from '@civ-clone/core-rule/Criterion';
import Effect from '@civ-clone/core-rule/Effect';
import Government from '@civ-clone/core-government/Government';
import GovernmentTerms from '../Rules/GovernmentTerms';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import { expect } from 'chai';

class Monarchy extends Government {}
class Communism extends Government {}
class Republic extends Government {}

describe('governmentTerms', (): void => {
  it('is null when no rule answers, so a reader takes its own default', (): void => {
    const rules = new RuleRegistry();

    expect(governmentTerms(rules, Monarchy)).to.null;

    rules.register(
      new GovernmentTerms(
        new Criterion((GovernmentType) => GovernmentType === Communism),
        new Effect(() => ({ tradeBonus: 0 }))
      )
    );

    expect(governmentTerms(rules, Monarchy)).to.null;
    expect(governmentTerm(rules, Monarchy, 'tradeBonus')).to.undefined;
  });

  it('merges the answers in rule order, a later one replacing an earlier term', (): void => {
    const rules = new RuleRegistry();

    rules.register(
      new GovernmentTerms(
        new Effect((GovernmentType) => ({
          freeUnits: (): number => (GovernmentType === Monarchy ? 3 : 0),
          martialLaw: { maximumUnits: 3, perUnit: 1 },
        }))
      ),
      new GovernmentTerms(
        new Criterion((GovernmentType) => GovernmentType === Communism),
        new Effect(() => ({ martialLaw: { maximumUnits: 3, perUnit: 2 } }))
      ),
      new GovernmentTerms(
        new Criterion((GovernmentType) => GovernmentType === Republic),
        new Effect(() => ({ tilePenalty: null }))
      )
    );

    expect(governmentTerm(rules, Monarchy, 'freeUnits')!(5)).to.equal(3);
    expect(governmentTerm(rules, Monarchy, 'martialLaw')).to.deep.equal({
      maximumUnits: 3,
      perUnit: 1,
    });
    expect(governmentTerm(rules, Communism, 'martialLaw')).to.deep.equal({
      maximumUnits: 3,
      perUnit: 2,
    });
    expect(governmentTerm(rules, Republic, 'tilePenalty')).to.null;
    expect(governmentTerm(rules, Republic, 'tradeBonus')).to.undefined;
  });

  it("gives a player's current government's class", (): void => {
    const monarchy = new Monarchy();

    expect(currentGovernment({ current: () => monarchy })).to.equal(Monarchy);
    expect(currentGovernment({ current: () => null })).to.null;
  });
});
