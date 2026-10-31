// (the) Gnorp Apologue — Talent Point Build Browser data.
//
// All 41 talents transcribed directly from https://gnorp.wiki.gg/wiki/Talents (wiki.gg, not
// Fandom), re-fetched and re-read by this worker on 2026-10-31 — not copied from the orchestrator
// charter's own summary (Principle XXII: read the primary source yourself).
//
// CORRECTION TO THE ORCHESTRATOR'S CHARTER: the charter's headline line says "all 35 talents (5
// default + 30 across six point-tiers)" — 5 talents per tier. The charter's own Gate-2 paragraph
// says each tier is a "6-talent group" (5 regular + 1 free) — 6 per tier. This worker's direct
// re-fetch of the wiki page confirms the SECOND number: every point-tier (2/5/8/11/14/17) lists 6
// named talents, not 5. Total is 41 (5 default + 36), not 35. Shipped as 41 below; see
// DONE_REPORT.md for the full discrepancy note.
//
// Effect text below is a close paraphrase, not a verbatim quote — the fetch tool used to read the
// page (gnorp.wiki.gg blocks direct curl/fetch with a 403, confirmed by this worker) would not
// reproduce the page's exact sentences character-for-character on request, only paraphrase them.
// Every number and named mechanic in the paraphrase was checked against the source. No effect
// text is invented or guessed.
//
// DISCLOSED GAPS (do not guess past these — orchestrator's charter required this, confirmed true
// on this worker's own re-fetch):
//   1. The page does not state which ONE of the 6 talents in each point-tier is the "free" one
//      (it only describes the structure: "a group of five regular talents and one free talent",
//      and that a free talent "is always active without a need of applying it and can't be
//      disabled"). No specific talent name is ever tied to "free" anywhere on the page.
//   2. The page does not state an overall maximum total Talent Point count. The only cap stated is
//      structural: "The last group of talents you can unlock is capped at 17 Talent Points" — that
//      is the last UNLOCK THRESHOLD, not a total-points ceiling (a player can keep earning points
//      past 17 for the regular talents within already-unlocked tiers).
//   3. Mechanic, confirmed by a follow-up fetch: Talent Points gate group UNLOCKS by total points
//      ever owned ("gated behind a number of Talent Points owned in total"), separately from
//      applying a regular talent, which costs 1 Talent Point in the Talent Stone. The page does
//      not say whether there is a cap on how many of the 5 regular talents in an unlocked group
//      can be applied at once. The in-page UI's running counter (below) treats every ticked
//      non-Default talent as costing 1 point — see index.html for the user-facing disclosure of
//      what this does and does not tell you.

(function (root) {
  "use strict";

  var SOURCES = [
    { name: "gnorp.wiki.gg — Talents", url: "https://gnorp.wiki.gg/wiki/Talents" },
    { name: "kosgames.com (mirror of naguide.com) — \"21 Talent Points Build (4.8G/min Collection Rate)\"", url: "https://kosgames.com/the-gnorp-apologue-21-talent-points-build-4-8g-min-collection-rate-50370/" },
    { name: "buzzaria.pages.dev — Gnorp Apologue build guide", url: "https://buzzaria.pages.dev/posts/the-best-builds-for-the-gnorp-apologue" }
  ];
  var FETCHED = "2026-10-31";

  function t(fields) {
    return {
      name: fields[0],
      tier: fields[1],   // 0 = Default (no points needed), else 2/5/8/11/14/17
      effect: fields[2]
    };
  }

  var TALENTS = [
    // ───────────────────────────── Default (5) — usable with zero Talent Points
    t(["Motivation", 0, "When runners pass the halfway point between the stash and the rock, slammers become motivated: 2x damage, +5% chance to combo, and the effects of meditation trigger without having to meditate."]),
    t(["Hiking Buddy", 0, "Mountaineers bring a friend along when they leave the Cocoa Cafe. The friend digs at half effectiveness, and wears a small hat with a frowny face."]),
    t(["Runner Backstop", 0, "If total shard collection per minute is under 50% of damage, runners get +20 shard carry capacity."]),
    t(["Extra Housing", 0, "Every seventh housing you build also builds another one for free."]),
    t(["Bathe In Fire", 0, "Bombers get a significant ascent-speed boost after bombing the rock while it is on fire."]),

    // ───────────────────────────── 2 Talent Points (6: 5 regular + 1 undisclosed free)
    t(["Strength In Numbers", 2, "Multiplier increases by 0.1 per 4 employed gnorps. You get one bonus gnorp every 10 minutes. Unlocks Auto-Housing, which builds housing automatically once you have enough shards."]),
    t(["Popcorn", 2, "Fire damage range increases to 8-9, up from 0-3."]),
    t(["Bullet Breath", 2, "With fire breath unlocked, slammers spray gatling bullets on the 7th combo hit."]),
    t(["Superhot", 2, "Fire deals 2.5x damage and occurs 6x faster."]),
    t(["Timeshift Delivery", 2, "Bombers with Timeshift Impact propel all runners and the arrow maker forward in time by 0.5 seconds whenever the effect occurs."]),
    t(["Explosive Exposition", 2, "Grenade hits reduce the time until the next weakspot appearance by 3 seconds. Max weakspots raised to 1000."]),

    // ───────────────────────────── 5 Talent Points (6: 5 regular + 1 undisclosed free)
    t(["Inspiration", 5, "Lets you apply inspirations to your units to improve them in various ways."]),
    t(["Gatling Balloon", 5, "With the Balloon Gunner upgrade, the balloon shoots gatling bullets."]),
    t(["The Flow", 5, "After meditating, slammers deal +3 damage per strike for the rest of their current combo, and fly much farther after hitting the rock."]),
    t(["Bigger Pile", 5, "Start with 5 extra gnorps. Passive reclamation is 20% slower, but the pile grows twice as tall before compressing."]),
    t(["The Higher The Pile", 5, "When the pile is 70% of the way toward compressing, mountaineers throw shards with 100% more forward velocity."]),
    t(["Notes", 5, "While active, directors add +2.0 to the multiplier, unaffected by other multiplier increases."]),

    // ───────────────────────────── 8 Talent Points (6: 5 regular + 1 undisclosed free)
    t(["Prestige Expedience", 8, "Start with 1 gnorp per talent point spent. Clicking is twice as effective and holding the mouse button down is twice as fast. You can click anywhere on the pile to move shards."]),
    t(["Future To The Back", 8, "Gatling bullets become regular arrows. Rifle bullets can choose between ice and fire arrows. Arrows generated this way are brittle and do not stick to the rock."]),
    t(["Project Constellation", 8, "Rockets no longer immediately seek the rock. Every 20 seconds, all airborne rockets strike the rock together and trigger weakspots. Rocket range increases to 3-7, up from 0-5."]),
    t(["Supershatter", 8, "Freeze duration increases to 25 seconds and no longer increases damage dealt to the rock (it still modifies the range); the rock is no longer immune to ice after being frozen. Shatter deals 550 Shard damage, unaffected by statuses, with a range of 4-8."]),
    t(["Return To Sender", 8, "Directors can retrieve stuck arrows when they leave the rock and deliver them to the archers. 1 in 3 arrows is retrievable."]),
    t(["Descent Of The King", 8, "When the mountaineer king descends, the crown's radiance adds +8.0 to the multiplier for 3 minutes, unaffected by other multiplier increases. When a new king is crowned, the previous king bequeaths all its crowns."]),

    // ───────────────────────────── 11 Talent Points (6: 5 regular + 1 undisclosed free)
    t(["Zybellium Mastery", 11, "Start with one loose Zybellium. Spending Zybellium builds one house. Zybellium can be drawn closer by clicking the bulb on top of the Rock Analysis Lab."]),
    t(["Rocket Gatler", 11, "Gatling bullets have a 10% chance to spawn a Y-rocket."]),
    t(["Frostfire", 11, "Ice and Fire statuses can coexist. Shatter takes on fire's range while fire is active. Directors are no longer repelled by frostfire."]),
    t(["Infinite Reverberation", 11, "Shockwaves no longer lose strength based on the distance they travel."]),
    t(["Deals", 11, "Every time an arrow is shot, a second arrow is also shot. You get 3 gnorps each time you purchase a new arrow type."]),
    t(["Reclamation Mitigation", 11, "When reclaiming, the rock prefers shards closer to it instead of shards biased toward the top of the pile."]),

    // ───────────────────────────── 14 Talent Points (6: 5 regular + 1 undisclosed free)
    t(["New Building", 14, "Unlocks a new building: the Shrine."]),
    t(["Combo Power", 14, "Slammers gain an additional 1% chance to combo every time they do a preparation jump."]),
    t(["Arrows' Last Hurrah", 14, "When a stuck arrow expires or is removed from the rock, it deals 120 Shard damage with a range of 7-10. Only 1 in 20 arrows sticks to the rock, down from 1 in 3. Arrows generated by Future To The Back are no longer brittle. Not all arrows can leave a stuck arrow behind."]),
    t(["DON'T EAT THAT!", 14, "Zygnorps also gain energy from what the drones consume — upset by the drones' misdeeds, they try to compensate."]),
    t(["DRONE.TARGET = FAR OR DRONE.TARGET = CLOSE", 14, "Drones can now target either the farthest point in the pile or the closest point, not only the tallest."]),
    t(["Vulnerability Empowerment", 14, "Vulnerability deals double damage. When Vulnerability activates, the rock returns all shards it took in the last 10 seconds."]),

    // ───────────────────────────── 17 Talent Points (6: 5 regular + 1 undisclosed free)
    t(["Multiplier Growth", 17, "The multiplier grows on its own up to a 4x increase over time, starting at 1.0 and rising by 0.1 every 6 minutes."]),
    t(["Operation: Pocket Rocket Timeshift Retainment", 17, "Pocket Rockets work together with Timeshift Impact and accumulate on every hit. Bombers also generate one extra rocket per Timeshift Impact."]),
    t(["Agitated Zybe", 17, "Unlocks the Zybellium Agitator at the Rock Analysis Lab. Compression events within 5 minutes of the previous one can generate an extra Zybellium, up to 3 times. The balloon also moves twice as fast."]),
    t(["Gnorpcalibur: Unleashed", 17, "All accords can be used at the same time."]), // slop-lint: allow SLOP005 - "Unleashed" is the game's own literal talent name, not marketing copy
    t(["Modern Warfare", 17, "With the Grenade Launcher unlocked, rifle gnorps shoot grenades instead of bullets."]),
    t(["Drone Capacity", 17, "Drone capacity doubles. Drones spawn 2 baby drones on death instead of 1, but descent speed is reduced by 50%."])
  ];

  var TIERS = [0, 2, 5, 8, 11, 14, 17];
  var TIER_LABEL = { 0: "Default", 2: "2 Talent Points", 5: "5 Talent Points", 8: "8 Talent Points", 11: "11 Talent Points", 14: "14 Talent Points", 17: "17 Talent Points" };

  // Community builds — each a real, named build from an independent source found in Gate 2.
  // naguide.com and kosgames.com are the SAME underlying mirrored source (identical title and
  // content, per the orchestrator's charter) — counted as one source, not two. buzzaria.pages.dev
  // is independently written (different build names, different phrasing, re-verified by this
  // worker directly). Every talent name below exists verbatim in TALENTS above — none invented.
  var BUILDS = [
    {
      name: "21 Talent Points Build (4.8G/min Collection Rate)",
      sourceIndex: 1,
      attribution: "Community build, not this product's own recommendation.",
      talents: ["Modern Warfare", "Agitated Zybe", "Gnorpcalibur: Unleashed", "Vulnerability Empowerment", "Project Constellation", "Explosive Exposition"] // slop-lint: allow SLOP005 - "Unleashed" is the game's own literal talent name, not marketing copy
    },
    {
      name: "Runner-Slammer combo",
      sourceIndex: 2,
      attribution: "Community build, not this product's own recommendation.",
      talents: ["Runner Backstop", "Motivation"]
    },
    {
      name: "Arrows' Last Hurrah build",
      sourceIndex: 2,
      attribution: "Community build, not this product's own recommendation.",
      talents: ["Arrows' Last Hurrah", "Future To The Back", "Frostfire", "Deals", "Notes", "Supershatter"]
    },
    {
      name: "Vulnerability Empowerment build",
      sourceIndex: 2,
      attribution: "Community build, not this product's own recommendation.",
      talents: ["Vulnerability Empowerment", "Arrows' Last Hurrah", "Future To The Back", "Descent Of The King", "Deals", "Combo Power", "Timeshift Delivery", "Return To Sender"]
    }
  ];

  var api = {
    SOURCES: SOURCES,
    FETCHED: FETCHED,
    TALENTS: TALENTS,
    TIERS: TIERS,
    TIER_LABEL: TIER_LABEL,
    BUILDS: BUILDS
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  } else {
    root.GNORP_TALENT_DATA = api;
  }
})(typeof window !== "undefined" ? window : this);
