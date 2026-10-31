// Headless known-answer / structural tests. Run: node test.js
var data = require("./data.js");
var fs = require("fs");

var failures = 0;

function assert(cond, label) {
  if (!cond) {
    failures++;
    console.log("FAIL " + label);
  } else {
    console.log("PASS " + label);
  }
}

// ───────────────────────────────── structural: all 35... no, all 41 talents, tier grouping

assert(data.TALENTS.length === 41, "41 talents present (got " + data.TALENTS.length + ")");

data.TALENTS.forEach(function (t) {
  assert(typeof t.name === "string" && t.name.length > 0, "talent has a non-empty name");
  assert([0, 2, 5, 8, 11, 14, 17].indexOf(t.tier) !== -1, t.name + " has a valid point tier");
  assert(typeof t.effect === "string" && t.effect.length > 0, t.name + " has non-empty effect text");
});

// Point-tier grouping totals correctly: 5 Default + 6 per tier x 6 tiers = 41.
assert(data.TALENTS.filter(function (t) { return t.tier === 0; }).length === 5, "Default tier has 5 talents");
[2, 5, 8, 11, 14, 17].forEach(function (p) {
  var n = data.TALENTS.filter(function (t) { return t.tier === p; }).length;
  assert(n === 6, p + "-point tier has 6 talents (5 regular + 1 undisclosed free) (got " + n + ")");
});
var tierSum = data.TIERS.reduce(function (sum, p) {
  return sum + data.TALENTS.filter(function (t) { return t.tier === p; }).length;
}, 0);
assert(tierSum === 41, "all point-tier groups sum to 41 total talents (got " + tierSum + ")");

// No duplicate talent names.
(function noDuplicates() {
  var seen = {};
  var dupes = [];
  data.TALENTS.forEach(function (t) {
    if (seen[t.name]) dupes.push(t.name);
    seen[t.name] = true;
  });
  assert(dupes.length === 0, "no duplicate talent names (dupes: " + dupes.join(", ") + ")");
})();

// ───────────────────────────────── running point-counter sums correctly (mirrors index.html's
// updateCounter: every non-Default ticked talent costs 1 point, Default talents cost 0)

function sumPoints(tickedNames) {
  var total = 0;
  tickedNames.forEach(function (name) {
    var t = data.TALENTS.filter(function (x) { return x.name === name; })[0];
    if (t && t.tier > 0) total += 1;
  });
  return total;
}

(function counterKnownAnswers() {
  assert(sumPoints([]) === 0, "counter: zero talents ticked sums to 0");
  assert(sumPoints(["Motivation", "Hiking Buddy"]) === 0, "counter: two Default talents sum to 0 (Default costs nothing)");
  assert(sumPoints(["Modern Warfare", "Agitated Zybe", "Gnorpcalibur: Unleashed"]) === 3, "counter: three 17-point-tier talents sum to 3"); // slop-lint: allow SLOP005 - "Unleashed" is the game's own literal talent name, not marketing copy
  assert(sumPoints(["Motivation", "Modern Warfare", "Project Constellation"]) === 2, "counter: 1 Default (free) + 2 priced talents sums to 2");
})();

// ───────────────────────────────── named community builds: every build talent must exist in
// TALENTS (the "no invented talents" acceptance bar)

data.BUILDS.forEach(function (b) {
  assert(typeof b.name === "string" && b.name.length > 0, "build has a non-empty name");
  assert(Array.isArray(b.talents) && b.talents.length > 0, b.name + " has at least one talent");
  b.talents.forEach(function (name) {
    var exists = data.TALENTS.some(function (t) { return t.name === name; });
    assert(exists, b.name + " talent '" + name + "' exists in the canonical TALENTS list (no invented talents)");
  });
  assert(data.SOURCES[b.sourceIndex] !== undefined, b.name + " has a valid sourceIndex");
});

(function knownAnswerTwentyOnePointBuild() {
  var b = data.BUILDS.filter(function (x) { return x.name === "21 Talent Points Build (4.8G/min Collection Rate)"; })[0];
  assert(!!b, "the required minimum charter build (21 Talent Points Build) is present");
  assert(b.talents.length === 6, "21-point build names exactly 6 crucial talents");
  ["Modern Warfare", "Agitated Zybe", "Gnorpcalibur: Unleashed", "Vulnerability Empowerment", "Project Constellation", "Explosive Exposition"].forEach(function (name) { // slop-lint: allow SLOP005 - "Unleashed" is the game's own literal talent name, not marketing copy
    assert(b.talents.indexOf(name) !== -1, "21-point build includes '" + name + "'");
  });
})();

// ───────────────────────────────── disclosed-gap text present in data.js comments (source of
// truth for the honesty claims the UI renders)

(function disclosedGapsPresentInSourceComments() {
  var raw = fs.readFileSync(__dirname + "/data.js", "utf8");
  assert(raw.indexOf("does not state which ONE") !== -1, "data.js discloses the undisclosed-free-talent gap");
  assert(raw.indexOf("does not state an overall maximum") !== -1, "data.js discloses the no-stated-max gap");
})();

// ───────────────────────────────── copy discipline (T0 liability tier)

var BANNED_WORDS = ["best", "optimal", "strongest", "guaranteed", "approved", "certified", "compliant", "safe", "s-tier", "meta"];

function stripToVisibleText(html) {
  var visible = html.replace(/<script[\s\S]*?<\/script>/gi, "");
  visible = visible.replace(/<style[\s\S]*?<\/style>/gi, "");
  visible = visible.replace(/<[^>]+>/g, " ");
  return visible;
}

(function checkIndexHtmlVisibleCopy() {
  var raw = fs.readFileSync(__dirname + "/index.html", "utf8");
  var visible = stripToVisibleText(raw).toLowerCase();
  BANNED_WORDS.forEach(function (w) {
    var re = new RegExp("\\b" + w.replace("-", "\\-") + "\\b");
    assert(!re.test(visible), "index.html rendered copy (tags+scripts+styles stripped) does not contain banned word '" + w + "'");
  });
})();

data.TALENTS.forEach(function (row) {
  var text = JSON.stringify(row).toLowerCase();
  BANNED_WORDS.forEach(function (w) {
    var re = new RegExp("\\b" + w.replace("-", "\\-") + "\\b");
    assert(!re.test(text), "TALENTS/" + row.name + " data does not contain banned word '" + w + "'");
  });
});

data.BUILDS.forEach(function (row) {
  var text = JSON.stringify(row).toLowerCase();
  BANNED_WORDS.forEach(function (w) {
    var re = new RegExp("\\b" + w.replace("-", "\\-") + "\\b");
    assert(!re.test(text), "BUILDS/" + row.name + " data does not contain banned word '" + w + "'");
  });
});

// SOURCES display names are rendered as live link text in the Sources section AND in the
// per-build attribution list — a banned word here reaches the visible DOM even though it never
// appears in the static index.html markup. (GCT-033 lesson: a static-file scan alone is not
// sufficient. Caught live in THIS build: buzzaria.pages.dev's real article title is "The Best
// Builds For The Gnorp Apologue" — the rendered source name was reworded to drop "best" rather
// than quote it, because quote-fencing alone does not satisfy a zero-tolerance banned-word scan.)
data.SOURCES.forEach(function (s) {
  var text = s.name.toLowerCase();
  BANNED_WORDS.forEach(function (w) {
    var re = new RegExp("\\b" + w.replace("-", "\\-") + "\\b");
    assert(!re.test(text), "SOURCES entry '" + s.name + "' does not contain banned word '" + w + "'");
  });
});

// Build names/titles themselves may legitimately contain "best" in the SOURCE's own title (the
// buzzaria article is literally titled "the best builds..."), but this product never names its
// own builds with ranking language, and the on-page copy must still fence it as a quoted label.
// This check guards against this product inventing its OWN ranked build name, not against
// quoting a source title.
(function buildNamesCarryNoOwnRankingLanguage() {
  data.BUILDS.forEach(function (b) {
    var ownRankWords = ["best", "optimal", "s-tier", "tier 1", "op build"];
    var nameLower = b.name.toLowerCase();
    ownRankWords.forEach(function (w) {
      assert(nameLower.indexOf(w) === -1, "build name '" + b.name + "' carries no ranking word '" + w + "'");
    });
  });
})();

// No emoji anywhere in source files (S1/S2).
(function noEmoji() {
  var emojiRe = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;
  ["index.html", "data.js"].forEach(function (f) {
    var raw = fs.readFileSync(__dirname + "/" + f, "utf8");
    assert(!emojiRe.test(raw), f + " contains no emoji");
  });
})();

if (failures > 0) {
  console.log(failures + " test(s) failed.");
  process.exit(1);
} else {
  console.log("All tests passed.");
}
