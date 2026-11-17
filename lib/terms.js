"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentGovernment = exports.governmentTerm = exports.governmentTerms = void 0;
const GovernmentTerms_1 = require("../Rules/GovernmentTerms");
/**
 * The terms the ruleset's `GovernmentTerms` rules give `GovernmentType`, merged in the order the rules run (a later
 * answer replaces an earlier one's term), or `null` when none answers: no ruleset numbers its governments this way,
 * so a reader falls back to its own.
 */
const governmentTerms = (ruleRegistry, GovernmentType) => {
    const answers = ruleRegistry.process(GovernmentTerms_1.default, GovernmentType);
    if (answers.length === 0) {
        return null;
    }
    return answers.reduce((terms, answer) => ({
        ...terms,
        ...answer,
    }), {});
};
exports.governmentTerms = governmentTerms;
/** The term `key` of `GovernmentType`, or `undefined` when no rule gives it (`null` is a term's own "none"). */
const governmentTerm = (ruleRegistry, GovernmentType, key) => {
    const terms = (0, exports.governmentTerms)(ruleRegistry, GovernmentType);
    return terms !== null && key in terms ? terms[key] : undefined;
};
exports.governmentTerm = governmentTerm;
/** The government `playerGovernment` has now, or `null` with none. */
const currentGovernment = (playerGovernment) => {
    const current = playerGovernment.current();
    return current === null ? null : current.constructor;
};
exports.currentGovernment = currentGovernment;
exports.default = exports.governmentTerms;
//# sourceMappingURL=terms.js.map