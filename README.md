# base-government-terms

What each government does, as data a ruleset registers, so a player (or its AI) can compare governments without asking
the rules that apply them.

- `Rules/GovernmentTerms`: a rule asked with a government's class (not a player's, so a government the player doesn't
  have can be weighed too), answering the terms it knows.
- `lib/terms`: the `Terms` (all optional) and `governmentTerms(ruleRegistry, Government)`, the answers merged in the
  order the rules run, a later answer replacing an earlier one's term, or `null` when none answers, so a reader falls
  back to its own; `governmentTerm(ruleRegistry, Government, key)` for one term (`undefined` when none gives it);
  `currentGovernment(playerGovernment)` for the class of the government a player has.

The terms:

- `freeUnits(citySize)` and `unitSupportCost`: how many of a city's units it supports for nothing at a given size, and
  the shields each unit past them costs it;
- `martialLaw`: `{ maximumUnits, perUnit }` (`maximumUnits` 0: none);
- `militaryUnhappiness`: `{ perUnit, free }`, the citizens each aggressive unit makes unhappy after the first `free`;
- `tradeBonus`: what each square that gives any trade gives more;
- `tilePenalty`: `{ threshold, amount }`, or `null`: a square giving more than `threshold` of a yield gives `amount`
  less;
- `corruption`: `{ perDistance, fixedDistance }`, the share of trade lost for each square from the capital, or at a
  fixed distance;
- `noUnhappiness`: no citizen is ever unhappy;
- `science`: the share of research that counts.

Who registers them: civ2-government (support, martial law, military unhappiness, Fundamentalism's content citizens and
science) and civ2-city (tile penalty, trade bonus, corruption). Civ1's packages register none, so a reader such as
simple-ai-client's keeps Civ1's own numbers and plays Civ1 exactly as before.

A library: it registers no rules.
