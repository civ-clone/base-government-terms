"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GovernmentTerms = void 0;
const Rule_1 = require("@civ-clone/core-rule/Rule");
// What a government does, as data (`lib/terms`): a ruleset registers one or more for each of its governments, each
//  answering the terms it knows, so a player (or its AI) can compare governments without asking the rules that apply
//  them. Asked with the government's class, not a player's, so a government the player doesn't have can be weighed too.
class GovernmentTerms extends Rule_1.default {
}
exports.GovernmentTerms = GovernmentTerms;
exports.default = GovernmentTerms;
//# sourceMappingURL=GovernmentTerms.js.map