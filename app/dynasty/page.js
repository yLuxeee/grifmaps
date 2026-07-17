"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const DEBUG = false;
const SPIN_TICKS = 30;
const START_SPIN_SPEED = 30; // ms
const END_SPIN_SPEED = 120;  // ms

const SEASON_NUMBERS = {
  WL23: 1,
  SL24: 2,
  FL24: 3,
  WL25: 4,
  SL25: 5,
  SML25: 6,
  SL26: 7,
};

function formatSeason(season) {
  const seasonNumber = SEASON_NUMBERS[season];

  return seasonNumber
    ? `${season} (${seasonNumber})`
    : season;
}

const PLAYERS = [
  // =========================================
  // SL26
  // =========================================

  ["Luxe", 1.42, "12/6", 28, "SL26", "Like Clockwork", true, false],
  ["Solace", 1.04, "12/6", 12, "SL26", "Like Clockwork"],
  ["iReign", 1.03, "12/6", 7, "SL26", "Like Clockwork"],
  ["Wevyn", 0.69, "12/6", 11, "SL26", "Like Clockwork"],

  ["ASpence", 1.23, "14/3", 13, "SL26", "MCA", false, true],
  ["Chemical", 1.13, "14/3", 13, "SL26", "MCA", false, true],
  ["Hells Angel", 0.95, "14/3", 40, "SL26", "MCA", false, true],
  ["Jolly", 0.74, "14/3", 10, "SL26", "MCA", false, true],
  ["Aware", 0.6, "14/3", 4, "SL26", "MCA", false, true],

  ["Rebs", 0.78, "10/7", 20, "SL26", "Zero Logic"],
  ["Priest", 0.89, "10/7", 10, "SL26", "Zero Logic"],
  ["Sev", 0.71, "10/7", 30, "SL26", "Zero Logic"],
  ["Mavbrid", 1.16, "10/7", 13, "SL26", "Zero Logic"],

  ["Death", 1.01, "9/11", 11, "SL26", "Operation: Doomsday"],
  ["Shrek", 1.25, "9/11", 11, "SL26", "Operation: Doomsday"],
  ["Poptart", 0.97, "9/11", 10, "SL26", "Operation: Doomsday"],
  ["Dhlyn", 0.91, "9/11", 26, "SL26", "Operation: Doomsday"],

  ["Nkot", 0.73, "10/12", 20, "SL26", "Junkyard Dogs"],
  ["Dhmon", 1.3, "10/12", 8, "SL26", "Junkyard Dogs"],
  ["Gingy", 1.07, "10/12", 15, "SL26", "Junkyard Dogs"],
  ["Rechargen", 0.73, "10/12", 21, "SL26", "Junkyard Dogs"],

  ["Scullen", 1.25, "11/11", 22, "SL26", "Spanks Life Coaches"],
  ["Snipez", 1.19, "11/11", 11, "SL26", "Spanks Life Coaches"],
  ["Spank", 1.0, "11/11", 8, "SL26", "Spanks Life Coaches"],
  ["Grif Beast", 0.76, "11/11", 33, "SL26", "Spanks Life Coaches"],

  ["Avenger", 0.78, "4/12", 4, "SL26", "The Last Drop"],
  ["Novice", 0.92, "4/12", 15, "SL26", "The Last Drop"],
  ["Rage", 0.65, "4/12", 15, "SL26", "The Last Drop"],
  ["Mungo", 0.72, "4/12", 6, "SL26", "The Last Drop"],

  ["Sab", 1.03, "4/12", 12, "SL26", "Passive Theory"],
  ["Epic Beast", 0.75, "4/12", 19, "SL26", "Passive Theory"],
  ["Dveo", 0.50, "1/4", 0, "SL26", "Passive Theory"],
  ["BCN", 1.02, "4/12", 2, "SL26", "Passive Theory"],

  // =========================================
  // SL25 (5)
  // =========================================

  ["Luxe", 1.22, "24/4", 46, "SL25", "Like Clockwork", true, true],
  ["Gingy", 1.13, "24/4", 22, "SL25", "Like Clockwork", false, true],
  ["Tommy", 1.06, "24/4", 16, "SL25", "Like Clockwork", false, true],
  ["Low Mane", 0.92, "24/4", 41, "SL25", "Like Clockwork", false, true],

  ["Chemical", 1.44, "20/5", 26, "SL25", "Chemical Imbalance"],
  ["Sev", 0.9, "20/5", 58, "SL25", "Chemical Imbalance"],
  ["Priest", 1.2, "20/5", 10, "SL25", "Chemical Imbalance"],
  ["Poptart", 1.18, "20/5", 19, "SL25", "Chemical Imbalance"],

  ["Evil", 0.87, "15/8", 15, "SL25", "First Strike"],
  ["Mavbrid", 1.6, "15/8", 48, "SL25", "First Strike"],
  ["PsyDucky", 1.0, "15/8", 16, "SL25", "First Strike"],
  ["Monstrous", 0.74, "15/8", 11, "SL25", "First Strike"],

  ["KDSkill", 1.14, "10/11", 47, "SL25", "Skill Diff"],
  ["Zim", 1.01, "10/11", 17, "SL25", "Skill Diff"],
  ["Aware", 0.92, "10/11", 6, "SL25", "Skill Diff"],
  ["Panther", 0.82, "10/11", 19, "SL25", "Skill Diff"],

  ["Squirre", 1.68, "8/11", 34, "SL25", "Murder Incorp"],
  ["Mxrvine", 1.04, "8/11", 7, "SL25", "Murder Incorp"],
  ["Ump", 0.52, "8/11", 2, "SL25", "Murder Incorp"],
  ["Endasis", 0.6, "8/11", 12, "SL25", "Murder Incorp"],

  ["ASpence", 1.48, "18/6", 19, "SL25", "Clip Hunters"],
  ["Fancy", 1.21, "18/6", 12, "SL25", "Clip Hunters"],
  ["Boss", 0.72, "18/6", 51, "SL25", "Clip Hunters"],
  ["Smurf", 0.87, "18/6", 27, "SL25", "Clip Hunters"],

  ["Novice", 1.29, "14/7", 40, "SL25", "Chik-fil-ass Grabbers"],
  ["Dhlyn", 0.96, "14/7", 27, "SL25", "Chik-fil-ass Grabbers"],
  ["Trespass", 0.76, "14/7", 6, "SL25", "Chik-fil-ass Grabbers"],
  ["RiskE", 0.68, "14/7", 1, "SL25", "Chik-fil-ass Grabbers"],

  ["Epic Beast", 0.98, "11/10", 43, "SL25", "Hammers Are For Losers"],
  ["Shrek", 1.58, "11/10", 8, "SL25", "Hammers Are For Losers", true, false],
  ["Rage", 0.73, "11/10", 21, "SL25", "Hammers Are For Losers"],
  ["Penguin", 0.73, "11/10", 0, "SL25", "Hammers Are For Losers"],

  ["Nkot", 0.83, "1/18", 12, "SL25", "Junkyard Dogs"],
  ["Snipez", 1.29, "1/18", 5, "SL25", "Junkyard Dogs"],
  ["iReign", 1.04, "1/18", 4, "SL25", "Junkyard Dogs"],
  ["Legion", 0.40, "1/18", 0, "SL25", "Junkyard Dogs"],

  // =========================================
  // WL23 (Complete)
  // =========================================
["Novice", 1.23, "20/4", 31, "WL23", "Quit Fuckin Betrayin"],
["Mavbrid", 1.21, "20/4", 62, "WL23", "Quit Fuckin Betrayin"],
["Boss", 0.79, "20/4", 10, "WL23", "Quit Fuckin Betrayin"],
["Chicky", 0.67, "20/4", 2, "WL23", "Quit Fuckin Betrayin"],

["Doer", 0.54, "4/16", 20, "WL23", "Off in the Shower"],
["DCleak", 0.59, "4/16", 4, "WL23", "Off in the Shower"],
["Beam", 0.58, "4/16", 3, "WL23", "Off in the Shower"],
["Weird", 0.47, "4/16", 9, "WL23", "Off in the Shower"],

["amnatu", 0.46, "8/12", 12, "WL23", "Grif Saga"],
["Ace", 1.17, "8/12", 16, "WL23", "Grif Saga"],
["Grunt", 0.76, "8/12", 5, "WL23", "Grif Saga"],
["John", 0.5, "1/4", 0, "WL23", "Grif Saga"],

["Oreo", 0.51, "2/18", 4, "WL23", "Team Oreo"],
["Clydro", 0.8, "1/18", 3, "WL23", "Team Oreo"],
["Craig", 0.77, "1/18", 1, "WL23", "Team Oreo"],
["Pro", 0.64, "1/18", 0, "WL23", "Team Oreo"],

["Mungo", 0.7, "17/10", 31, "WL23", "Ram Ranch", false, true],
["Fancy", 1.13, "17/10", 8, "WL23", "Ram Ranch", true, true],
["Tommy", 0.95, "17/10", 22, "WL23", "Ram Ranch", false, true],
["KDSkill", 0.87, "7/0", 7, "WL23", "Ram Ranch",false, true],

["Scullen", 0.94, "11/11", 36, "WL23", "MenZ Backpack"],
["Jushy", 1.38, "11/11", 30, "WL23", "MenZ Backpack"],
["MenZ", 0.73, "11/11", 4, "WL23", "MenZ Backpack"],
["Ram", 0.6, "11/11", 6, "WL23", "MenZ Backpack"],

["Spank", 0.92, "8/14", 7, "WL23", "USURPER SZN"],
["Aware", 0.73, "8/14", 28, "WL23", "USURPER SZN"],
["Shrek", 0.93, "8/14", 13, "WL23", "USURPER SZN"],

["Trespass", 0.6, "1/17", 0, "WL23", "Team Trespass"],
["Reelz", 0.88, "1/18", 19, "WL23", "Team Trespass"],
["Epic Beast", 0.77, "1/17", 9, "WL23", "Team Trespass"],
["Cornbeef", 0.72, "1/13", 5, "WL23", "Team Trespass"],

["ASpence", 1.07, "16/6", 48, "WL23", "Glory 2 God"],
["Zilly", 0.87, "11/5", 13, "WL23", "Glory 2 God"],
["Noplex", 0.84, "17/5", 13, "WL23", "Glory 2 God"],
["Kenny", 0.74, "17/8", 7, "WL23", "Glory 2 God"],

["Holy", 0.95, "16/4", 69, "WL23", "Mystery Heroes"],
["Memorized", 0.98, "16/4", 2, "WL23", "Mystery Heroes"],
["Priest", 0.81, "15/9", 7, "WL23", "Mystery Heroes"],

["Death", 0.77, "15/7", 7, "WL23", "Crawller Death Squad"],
["Luxe", 1.04, "15/5", 33, "WL23", "Crawller Death Squad", true, false],
["Sev", 0.76, "13/6", 22, "WL23", "Crawller Death Squad"],
["TJP", 0.92, "13/6", 18, "WL23", "Crawller Death Squad"],

// =========================================
  // SL24
  // =========================================
["Ace", 1.57, "15/8", 25, "SL24", "Post Grif Depression", false, false],
["Zim", 1.11, "21/18", 56, "SL24", "Post Grif Depression", false, false],
["Noplex", 0.84, "24/16", 11, "SL24", "Post Grif Depression", false, false],
["Trespass", 0.67, "9/8", 13, "SL24", "Post Grif Depression", false, false],

["Smurf", 0.66, "16/6", 26, "SL24", "Crazy Guys", false, false],
["ASpence", 1.31, "16/5", 41, "SL24", "Crazy Guys", true, false],
["Tommy", 1.05, "16/8", 19, "SL24", "Crazy Guys", false, false],
["Grunt", 0.78, "21/15", 18, "SL24", "Crazy Guys", false, false],

["Evil", 0.70, "8/15", 20, "SL24", "Sarges Squad", false, false],
["Fancy", 1.08, "8/14", 10, "SL24", "Sarges Squad", false, false],
["TJP", 0.86, "8/14", 29, "SL24", "Sarges Squad", false, false],
["Reyas", 0.82, "9/17", 12, "SL24", "Sarges Squad", false, false],

["Death", 0.91, "10/16", 16, "SL24", "Operation: Doomsday", false, false],
["Solace", 1.26, "9/13", 19, "SL24", "Operation: Doomsday", false, false],
["Chemical", 1.09, "6/17", 5, "SL24", "Operation: Doomsday", false, false],
["Doer", 0.65, "10/13", 44, "SL24", "Operation: Doomsday", false, false],

["PsyDucky", 0.86, "8/12", 3, "SL24", "Angry Duck Noises", false, false],
["Mavbrid", 1.21, "8/14", 32, "SL24", "Angry Duck Noises", false, false],
["DCleak", 0.76, "5/11", 10, "SL24", "Angry Duck Noises", false, false],
["iReign", 0.76, "12/13", 10, "SL24", "Angry Duck Noises", false, false],

["nfkt", 0.97, "21/7", 26, "SL24", "Puffy Grifbussy", false, true],
["Spank", 1.19, "24/10", 17, "SL24", "Puffy Grifbussy", true, true],
["Hells Angel", 1.04, "29/6", 79, "SL24", "Puffy Grifbussy", false, true],
["Aware", 0.90, "25/17", 12, "SL24", "Puffy Grifbussy", false, true],

["KDSkill", 0.99, "18/8", 48, "SL24", "Skill Diff", false, false],
["Sab", 1.11, "20/8", 30, "SL24", "Skill Diff", false, false],
["Mungo", 0.82, "16/8", 17, "SL24", "Skill Diff", false, false],
["Listless", 0.73, "16/10", 11, "SL24", "Skill Diff", false, false],

["Shrek", 1.37, "16/12", 47, "SL24", "Get Shrekt", false, false],
["Snipez", 1.22, "14/11", 20, "SL24", "Get Shrekt", false, false],
["Cosmos", 1.10, "20/8", 27, "SL24", "Get Shrekt", false, false],
["Avenger", 0.77, "14/10", 23, "SL24", "Get Shrekt", false, false],

["Dhlyn", 0.98, "7/14", 29, "SL24", "Separate IQ", false, false],
["Scullen", 0.97, "6/17", 28, "SL24", "Separate IQ", false, false],
["MenZ", 0.72, "5/17", 3, "SL24", "Separate IQ", false, false],
["Diablo", 0.61, "3/18", 1, "SL24", "Separate IQ", false, false],

["Poptart", 0.97, "5/17", 14, "SL24", "Paradox Warriors", false, false],
["Sherbet", 1.07, "4/13", 9, "SL24", "Paradox Warriors", false, false],
["Spoon", 0.84, "5/16", 21, "SL24", "Paradox Warriors", false, false],
["Bear", 0.62, "4/14", 1, "SL24", "Paradox Warriors", false, false],

["Gingy", 1.10, "8/12", 12, "SL24", "Moist Grapefruit", false, false],
["Tanker", 0.71, "1/4", 1, "SL24", "Moist Grapefruit", false, false],
["Epic Beast", 0.82, "8/10", 32, "SL24", "Moist Grapefruit", false, false],
["Joepro", 0.65, "7/8", 6, "SL24", "Moist Grapefruit", false, false],

// fl24 season 3 below


["Evil", 0.64, "10/7", 30, "FL24", "Bad Intentions", false, false],
["Snipez", 1.41, "12/7", 11, "FL24", "Bad Intentions", false, false],
["Fancy", 1.05, "13/8", 11, "FL24", "Bad Intentions", false, false],
["Mungo", 0.76, "10/6", 4, "FL24", "Bad Intentions", false, false],
["Priest", 0.62, "3/3", 5, "FL24", "Bad Intentions", false, false],

["Avenger", 0.71, "9/4", 5, "FL24", "Neuralink", false, false],
["Solace", 1.21, "10/5", 18, "FL24", "Neuralink", false, false],
["KDSkill", 0.97, "11/10", 36, "FL24", "Neuralink", false, false],
["Nick", 0.77, "11/5", 6, "FL24", "Neuralink", false, false],
["J Bomb", 0.55, "1/5", 1, "FL24", "Neuralink", false, false],

["PsyDucky", 0.87, "10/5", 10, "FL24", "Crazy Guys", false, false],
["ASpence", 1.24, "11/4", 15, "FL24", "Crazy Guys", false, false],
["Tommy", 0.97, "11/5", 12, "FL24", "Crazy Guys", false, false],
["Epic Beast", 0.85, "8/3", 19, "FL24", "Crazy Guys", false, false],
["Rechargen", 0.75, "7/1", 19, "FL24", "Crazy Guys", false, false],

["Spoon", 0.83, "10/7", 15, "FL24", "Wang Industries", false, false],
["Novice", 1.31, "12/10", 28, "FL24", "Wang Industries", true, false],
["Dhlyn", 1.03, "10/6", 16, "FL24", "Wang Industries", false, false],
["About", 0.75, "9/6", 5, "FL24", "Wang Industries", false, false],
["Ninjad", 0.49, "2/2", 1, "FL24", "Wang Industries", false, false],

["Death", 0.93, "2/15", 5, "FL24", "The MenZ Fan Club", false, false],
["Digital", 0.89, "1/11", 12, "FL24", "The MenZ Fan Club", false, false],
["Scullen", 0.93, "2/15", 8, "FL24", "The MenZ Fan Club", false, false],
["Square", 0.50, "1/15", 0, "FL24", "The MenZ Fan Club", false, false],
["Kittens", 0.55, "2/16", 4, "FL24", "The MenZ Fan Club", false, false],

["Chemical", 1.18, "21/5", 11, "FL24", "Chemical Imbalance", false, false],
["Sab", 1.17, "22/5", 22, "FL24", "Chemical Imbalance", false, false],
["DCleak", 0.76, "15/2", 8, "FL24", "Chemical Imbalance", false, false],
["Sev", 0.98, "21/4", 55, "FL24", "Chemical Imbalance", false, false],
["Goose", 0.71, "3/3", 0, "FL24", "Chemical Imbalance", false, false],

["Poptart", 1.00, "3/13", 14, "FL24", "Ken No Senshi", false, false],
["Mavbrid", 1.17, "2/10", 15, "FL24", "Ken No Senshi", false, false],
["iReign", 0.75, "3/12", 1, "FL24", "Ken No Senshi", false, false],
["Endasis", 0.55, "1/3", 4, "FL24", "Ken No Senshi", false, false],
["Panther", 0.59, "1/10", 0, "FL24", "Ken No Senshi", false, false],

["Hells Angel", 1.04, "22/4", 41, "FL24", "Asking Alexandra", false, true],
["Shrek", 1.31, "20/3", 9, "FL24", "Asking Alexandra", true, true],
["nfkt", 0.97, "22/4", 18, "FL24", "Asking Alexandra", false, true],
["Grunt", 0.69, "20/4", 8, "FL24", "Asking Alexandra", false, true],
["Trespass", 0.91, "3/2", 4, "FL24", "Asking Alexandra", false, true],

["Zim", 1.29, "7/13", 27, "FL24", "4G1B", false, false],
["Gingy", 1.10, "8/9", 17, "FL24", "4G1B", false, false],
["Aware", 0.80, "4/9", 2, "FL24", "4G1B", false, false],
["Noplex", 0.81, "8/13", 9, "FL24", "4G1B", false, false],
["RiskE", 0.42, "1/7", 0, "FL24", "4G1B", false, false],

["Spank", 1.06, "5/14", 8, "FL24", "Extortion SZN", false, false],
["Cosmos", 1.18, "6/22", 17, "FL24", "Extortion SZN", false, false],
["Squirre", 0.81, "4/18", 22, "FL24", "Extortion SZN", false, false],
["TJP", 0.76, "4/12", 14, "FL24", "Extortion SZN", false, false],
["Ganked", 0.43, "1/4", 2, "FL24", "Extortion SZN", false, false],

// =========================================
  // WL25
  // =========================================

["Sab", 1.27, "17/8", 32, "WL25", "Like Clockwork", true, true],
["Dhlyn", 0.98, "10/1", 17, "WL25", "Like Clockwork", false, true],
["Sev", 0.66, "17/8", 55, "WL25", "Like Clockwork", false, true],
["Avenger", 0.91, "17/8", 16, "WL25", "Like Clockwork", false, true],

["Novice", 1.46, "14/5", 65, "WL25", "FC Barcelona", true, false],
["Spank", 0.99, "14/5", 5, "WL25", "FC Barcelona", false, false],
["Aware", 0.72, "14/5", 2, "WL25", "FC Barcelona", false, false],
["Panther", 0.66, "14/5", 7, "WL25", "FC Barcelona", false, false],

["Smurf", 0.75, "1/17", 2, "WL25", "B.U.R.T", false, false],
["ASpence", 1.27, "1/16", 9, "WL25", "B.U.R.T", false, false],
["Noplex", 0.92, "1/17", 6, "WL25", "B.U.R.T", false, false],
["Priest", 0.85, "1/15", 3, "WL25", "B.U.R.T", false, false],
["Trespass", 0.67, "1/13", 5, "WL25", "B.U.R.T", false, false],

["Evil", 0.73, "11/7", 12, "WL25", "Knocked Goose", false, false],
["KDSkill", 1.09, "11/7", 10, "WL25", "Knocked Goose", false, false],
["Squirre", 1.74, "11/7", 44, "WL25", "Knocked Goose", false, false],
["RiskE", 0.68, "8/6", 0, "WL25", "Knocked Goose", false, false],
["Endasis", 0.54, "3/1", 3, "WL25", "Knocked Goose", false, false],

["Mungo", 0.74, "10/8", 10, "WL25", "9th Place", false, false],
["Mavbrid", 1.37, "10/8", 18, "WL25", "9th Place", false, false],
["Scullen", 1.10, "10/8", 26, "WL25", "9th Place", false, false],
["mxrvine", 1.00, "23/13", 38, "WL25", "9th Place", false, false],
["G3ohh", 0.49, "1/1", 0, "WL25", "9th Place", false, false],

["Hells Angel", 0.99, "5/11", 20, "WL25", "Coup De Puff", false, false],
["nfkt", 0.82, "5/11", 21, "WL25", "Coup De Puff", false, false],
["Grunt", 0.80, "5/11", 4, "WL25", "Coup De Puff", false, false],
["Ram", 0.65, "5/11", 8, "WL25", "Coup De Puff", false, false],
["Clutch", 0.49, "1/11", 0, "WL25", "Coup De Puff", false, false],

["Shrek", 1.20, "12/14", 14, "WL25", "The Shrek Republic", false, false],
["Havoc", 0.83, "10/10", 2, "WL25", "The Shrek Republic", false, false],
["PsyDucky", 0.91, "12/14", 5, "WL25", "The Shrek Republic", false, false],
["Nick", 0.73, "8/10", 0, "WL25", "The Shrek Republic", false, false],
["Kittens", 0.41, "1/14", 0, "WL25", "The Shrek Republic", false, false],
["mxrvine", 1.01, "5/5", 49, "WL25", "The Shrek Republic", false, false],

["Cosmos", 1.59, "4/12", 14, "WL25", "Employees", false, false],
["Chemical", 1.36, "4/12", 11, "WL25", "Employees", false, false],
["Big Al", 0.58, "2/10", 17, "WL25", "Employees", false, false],
["iReign", 1.09, "4/12", 17, "WL25", "Employees", false, false],
["Daedric", 0.46, "2/2", 0, "WL25", "Employees", false, false],

["Solace", 1.22, "13/6", 23, "WL25", "Ascension", false, false],
["Epic Beast", 0.76, "13/6", 32, "WL25", "Ascension", false, false],
["Death", 0.89, "13/6", 10, "WL25", "Ascension", false, false],
["Rechargen", 0.86, "13/6", 12, "WL25", "Ascension", false, false],

].map(
  ([
    gamertag,
    kd,
    record,
    goals,
    season,
    team,
    mvp = false,
    trophy = false,
  ]) => ({
    gamertag,
    kd,
    record,
    goals,
    season,
    team,
    mvp,
    trophy,
  })
);

export default function DynastyPage() {
  const teams = useMemo(() => {
    return Object.values(
      PLAYERS.reduce((all, player) => {
        const key = `${formatSeason(player.season)}-${player.team}`;

        all[key] ||= {
          season: player.season,
          team: player.team,
          players: [],
        };

        all[key].players.push(player);

        return all;
      }, {})
    );
  }, []);

  const [current, setCurrent] = useState(null);
  const [drafted, setDrafted] = useState([]);
  const [spinning, setSpinning] = useState(false);

  const [powerupsUsed, setPowerupsUsed] = useState({
    player: false,
    full: false,
    team: false,
  });

  function hasBeenDrafted(player) {
    return drafted.some(
      (draftedPlayer) =>
        draftedPlayer.gamertag.toLowerCase() ===
        player.gamertag.toLowerCase()
    );
  }

  function spin() {
  if (spinning || drafted.length === 4) {
    return;
  }

  setSpinning(true);

  const availableTeams = teams.filter((team) =>
    team.players.some((player) => !hasBeenDrafted(player))
  );

  if (availableTeams.length === 0) {
    setSpinning(false);
    setCurrent(null);
    return;
  }

  const finalTeam =
    availableTeams[
      Math.floor(Math.random() * availableTeams.length)
    ];

  let ticks = 0;

  function doSpin() {
    const randomTeam =
      availableTeams[
        Math.floor(Math.random() * availableTeams.length)
      ];

    setCurrent(randomTeam);

    ticks++;

    if (ticks >= SPIN_TICKS) {
      setCurrent(finalTeam);
      setSpinning(false);
      return;
    }

    const progress = ticks / SPIN_TICKS;

    const delay =
      START_SPIN_SPEED +
      (END_SPIN_SPEED - START_SPIN_SPEED) *
        progress *
        progress;

    setTimeout(doSpin, delay);
  }

  doSpin();
}

  function getAlternateSeasons(player) {
  return PLAYERS.filter(
    (candidate) =>
      candidate.gamertag.toLowerCase() ===
        player.gamertag.toLowerCase() &&
      candidate.season !== player.season
  );
}

function playerSpin(player) {
  if (
    !current ||
    spinning ||
    powerupsUsed.player ||
    hasBeenDrafted(player)
  ) {
    return;
  }

  const alternatives = getAlternateSeasons(player);

  if (alternatives.length === 0) {
    return;
  }

  const replacement =
    alternatives[
      Math.floor(Math.random() * alternatives.length)
    ];

  setCurrent((previousTeam) => {
    if (!previousTeam) {
      return previousTeam;
    }

    return {
      ...previousTeam,

      players: previousTeam.players.map((currentPlayer) =>
        currentPlayer.gamertag.toLowerCase() ===
        player.gamertag.toLowerCase()
          ? replacement
          : currentPlayer
      ),
    };
  });

  setPowerupsUsed((previous) => ({
    ...previous,
    player: true,
  }));
}

function fullRespin() {
  if (
    !current ||
    spinning ||
    powerupsUsed.full ||
    drafted.length === 4
  ) {
    return;
  }

  const availableTeams = teams.filter((team) => {
    const isCurrentTeam =
      team.season === current.season &&
      team.team === current.team;

    const hasAvailablePlayer = team.players.some(
      (player) => !hasBeenDrafted(player)
    );

    return !isCurrentTeam && hasAvailablePlayer;
  });

  if (availableTeams.length === 0) {
    return;
  }

  const nextTeam =
    availableTeams[
      Math.floor(Math.random() * availableTeams.length)
    ];

  setCurrent(nextTeam);

  setPowerupsUsed((previous) => ({
    ...previous,
    full: true,
  }));
}

function teamSpin() {
  if (
    !current ||
    spinning ||
    powerupsUsed.team ||
    drafted.length === 4
  ) {
    return;
  }

  const availableTeams = teams.filter((team) => {
    const sameSeason =
      team.season === current.season;

    const differentTeam =
      team.team !== current.team;

    const hasAvailablePlayer = team.players.some(
      (player) => !hasBeenDrafted(player)
    );

    return (
      sameSeason &&
      differentTeam &&
      hasAvailablePlayer
    );
  });

  if (availableTeams.length === 0) {
    return;
  }

  const nextTeam =
    availableTeams[
      Math.floor(Math.random() * availableTeams.length)
    ];

  setCurrent(nextTeam);

  setPowerupsUsed((previous) => ({
    ...previous,
    team: true,
  }));
}

  function draft(player) {
    if (
      spinning ||
      drafted.length === 4 ||
      hasBeenDrafted(player)
    ) {
      return;
    }

    setDrafted((previousPlayers) => [
      ...previousPlayers,
      player,
    ]);

    setCurrent(null);
  }

  function reset() {
  setDrafted([]);
  setCurrent(null);
  setSpinning(false);

  setPowerupsUsed({
    player: false,
    full: false,
    team: false,
  });
}

  const totalGoals = drafted.reduce(
    (sum, player) => sum + player.goals,
    0
  );

  const averageKd = drafted.length
    ? drafted.reduce(
        (sum, player) => sum + player.kd,
        0
      ) / drafted.length
    : 0;

  const averageWinRate = drafted.length
    ? drafted.reduce((sum, player) => {
        const [wins, losses] = player.record
          .split("/")
          .map(Number);

        const gamesPlayed = wins + losses;

        if (gamesPlayed === 0) {
          return sum;
        }

        return sum + wins / gamesPlayed;
      }, 0) / drafted.length
    : 0;

  const finished = drafted.length === 4;

  /*
   * KD remains the most important category.
   *
   * A 1.25 average KD gives the maximum KD score.
   * 80 combined goals gives the maximum goal score.
   * Historical team win rate is already between 0 and 1.
   */

  const kdScore = Math.min(averageKd / 1.30, 1);
  const goalScore = Math.min(totalGoals / 140, 1);
  const winRateScore = Math.min(averageWinRate, 1);

  /*
   * Overall evaluation:
   *
   * KD: 60%
   * Team win rate: 10%
   * Goals: 30%
   */

  const teamStrength =
  kdScore * 0.5 +
  winRateScore * 0.2 +
  goalScore * 0.3;

const mvpCount = drafted.filter(
  (player) => player.mvp === true
).length;

const trophyCount = drafted.filter(
  (player) => player.trophy === true
).length;

const baseProjectedWins = teamStrength * 30;

// Each MVP adds 1 win.
// Each trophy adds 0.5 wins.
const bonusWins =
  mvpCount * 0.45 +
  trophyCount * 0.25;

const boostedProjectedWins =
  baseProjectedWins + bonusWins;

// Minimum acceptable team statistics
const KD_FLOOR = 1.05;
const WIN_RATE_FLOOR = 0.5;
const GOALS_FLOOR = 80;

// Maximum penalty each weak category can cause
const MAX_KD_PENALTY = 18;
const MAX_WIN_RATE_PENALTY = 6;
const MAX_GOAL_PENALTY = 6;

const kdPenalty =
  averageKd < KD_FLOOR
    ? ((KD_FLOOR - averageKd) / KD_FLOOR) *
      MAX_KD_PENALTY
    : 0;

const winRatePenalty =
  averageWinRate < WIN_RATE_FLOOR
    ? ((WIN_RATE_FLOOR - averageWinRate) /
        WIN_RATE_FLOOR) *
      MAX_WIN_RATE_PENALTY
    : 0;

const goalPenalty =
  totalGoals < GOALS_FLOOR
    ? ((GOALS_FLOOR - totalGoals) /
        GOALS_FLOOR) *
      MAX_GOAL_PENALTY
    : 0;

const totalPenalty =
  kdPenalty +
  winRatePenalty +
  goalPenalty;

const adjustedProjectedWins =
  boostedProjectedWins - totalPenalty;

const projectedWins = finished
  ? Math.max(
      0,
      Math.min(
        30,
        Math.round(adjustedProjectedWins)
      )
    )
  : 0;

const projectedLosses = finished
  ? 30 - projectedWins
  : 0;

const kdContribution = kdScore * 0.5;
const winRateContribution = winRateScore * 0.2;
const goalContribution = goalScore * 0.3;

const kdWins = kdContribution * 30;
const winRateWins = winRateContribution * 30;
const goalWins = goalContribution * 30;

const liveProjectedWins =
  kdWins +
  winRateWins +
  goalWins +
  bonusWins -
  totalPenalty;

  const champion = finished && projectedWins >= 22;
  const perfect = finished && projectedWins === 30;

  function getVerdictTitle() {
    if (perfect) {
      return "30–0. PERFECT SEASON.";
    }

    if (projectedWins >= 26) {
      return "DYNASTY ESTABLISHED.";
    }

    if (projectedWins >= 22) {
      return "CHAMP CONTENDER.";
    }

    if (projectedWins >= 18) {
      return "PLAYOFF CONTENDER.";
    }

    if (projectedWins >= 14) {
      return "SEASON ENDS EARLY.";
    }

    return "REBUILD REQUIRED.";
  }

  function getVerdictDescription() {
    if (perfect) {
      return "Untouchable. Your four-player dynasty went undefeated.";
    }

    if (projectedWins >= 26) {
      return "An elite roster capable of dominating the league.";
    }

    if (projectedWins >= 22) {
      return "This roster has enough firepower to bring home a title.";
    }

    if (projectedWins >= 18) {
      return "A dangerous squad, but not quite championship quality.";
    }

    if (projectedWins >= 14) {
      return "Competitive at times, but too inconsistent for a deep run.";
    }

    return "Try Again!";
  }

  const fullRespinAvailable =
  Boolean(current) &&
  teams.some((team) => {
    const isCurrentTeam =
      team.season === current.season &&
      team.team === current.team;

    return (
      !isCurrentTeam &&
      team.players.some(
        (player) => !hasBeenDrafted(player)
      )
    );
  });

const teamSpinAvailable =
  Boolean(current) &&
  teams.some((team) => {
    return (
      team.season === current.season &&
      team.team !== current.team &&
      team.players.some(
        (player) => !hasBeenDrafted(player)
      )
    );
  });

  return (
    <div className="page">
      <style>{styles}</style>

      <header className="topbar">
        <div className="navInner">
          <Link className="brand" href="/">
            <span>GRIFBALL</span>
            WORLD LEAGUE
          </Link>

          <nav>
            <Link href="/">Standings</Link>
            <Link href="/schedule">Schedule</Link>
            <Link className="active" href="/dynasty">
              Dynasty
            </Link>
            <Link href="/login">Login</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <p className="eyebrow">
            BUILD THE UNDEFEATED FOUR
          </p>

          <h1>DYNASTY</h1>

          <p className="intro">
            Spin a season. Scout the roster. Draft one
            player. Build a championship squad in four
            picks.
          </p>

          <div
            className="progress"
            aria-label={`${drafted.length} of 4 players drafted`}
          >
            {[0, 1, 2, 3].map((index) => (
              <span
                key={index}
                className={
                  index < drafted.length ? "filled" : ""
                }
              >
                {index < drafted.length ? "✓" : index + 1}
              </span>
            ))}
          </div>
        </section>
            {DEBUG && drafted.length > 0 && (
  <section className="scoreDebug">
    <div className="debugHeader">
      <h2>LIVE SCORE DEBUG</h2>

      <span>
        {liveProjectedWins.toFixed(2)} projected wins
      </span>
    </div>

    <div className="debugGrid">
      <div className="debugCard">
        <span>Average KD</span>
        <b>{averageKd.toFixed(3)}</b>
        <small>
          {averageKd.toFixed(3)} ÷ 1.30 ={" "}
          {kdScore.toFixed(3)}
        </small>
        <strong>
          +{kdWins.toFixed(2)} wins
        </strong>
      </div>

      <div className="debugCard">
        <span>Average Win Rate</span>
        <b>
          {(averageWinRate * 100).toFixed(1)}%
        </b>
        <small>
          {winRateScore.toFixed(3)} × 33%
        </small>
        <strong>
          +{winRateWins.toFixed(2)} wins
        </strong>
      </div>

      <div className="debugCard">
        <span>Total Goals</span>
        <b>{totalGoals}</b>
        <small>
          {totalGoals} ÷ 140 ={" "}
          {goalScore.toFixed(3)}
        </small>
        <strong>
          +{goalWins.toFixed(2)} wins
        </strong>
      </div>

      <div className="debugCard penaltyCard">
  <span>Weak-Team Penalty</span>

  <b>-{totalPenalty.toFixed(2)}</b>

  <small>
    KD: -{kdPenalty.toFixed(2)}
    <br />
    Record: -{winRatePenalty.toFixed(2)}
    <br />
    Goals: -{goalPenalty.toFixed(2)}
  </small>

  <strong>
    -{totalPenalty.toFixed(2)} wins
  </strong>
</div>

      <div className="debugCard">
        <span>Award Bonus</span>
        <b>+{bonusWins.toFixed(1)}</b>
        <small>
          {mvpCount} MVP, {trophyCount} trophy
        </small>
        <strong>
          +{bonusWins.toFixed(2)} wins
        </strong>
      </div>
    </div>

    <div className="debugEquation">
      <span>
        KD: {kdWins.toFixed(2)}
      </span>

      <span>+</span>

      <span>
        Record: {winRateWins.toFixed(2)}
      </span>

      <span>+</span>

      <span>
        Goals: {goalWins.toFixed(2)}
      </span>

      <span>+</span>

      <span>
        Awards: {bonusWins.toFixed(2)}
      </span>

      <span>=</span>

      <b>{liveProjectedWins.toFixed(2)}</b>

      <span>
        → {Math.round(liveProjectedWins)} wins
      </span>
    </div>

    <div className="debugPlayers">
      {drafted.map((player) => {
        const [wins, losses] = player.record
          .split("/")
          .map(Number);

        const games = wins + losses;

        const playerWinRate =
          games > 0 ? wins / games : 0;

        return (
          <div
            className="debugPlayer"
            key={`${player.gamertag}-${player.season}`}
          >
            <b>{player.gamertag}</b>

            <span>
              KD: {player.kd.toFixed(2)}
            </span>

            <span>
              Goals: {player.goals}
            </span>

            <span>
              Record: {player.record}
            </span>

            <span>
              Win rate:{" "}
              {(playerWinRate * 100).toFixed(1)}%
            </span>
          </div>
        );
      })}
    </div>
  </section>
)}
        <section className="gameGrid">
          <div className="arena">
            {!current && !finished && (
              <div className="emptyState">
                <div className="ball">◆</div>

                <h2>
                  {drafted.length
                    ? "Your next pick awaits"
                    : "Start your dynasty"}
                </h2>

                <p>
                  Spin to reveal a random team and season.
                </p>

                <button type="button" onClick={spin}>
                  SPIN FOR A TEAM
                </button>
              </div>
            )}

            {current && !finished && (
              <>
                <div
                  className={`teamHeader ${
                    spinning ? "spinning" : ""
                  }`}
                >
                  <p>{formatSeason(current.season)}</p>
                  <h2>{current.team}</h2>

                  <span>
                    {spinning
                      ? "Searching the archives…"
                      : "Select one player"}
                  </span>
                </div>

                <div className="roster">
  {current.players.map((player) => {
    const taken = hasBeenDrafted(player);
    const alternateSeasons = getAlternateSeasons(player);

    const canPlayerSpin =
      alternateSeasons.length > 0 &&
      !powerupsUsed.player &&
      !spinning &&
      !taken;

    return (
      <div
        className={`playerCard ${taken ? "taken" : ""}`}
        key={`${formatSeason(player.season)}-${player.team}-${player.gamertag}`}
      >
        <div className="playerTop">
          <div>
            <div className="playerSeason">
              {formatSeason(player.season)}
            </div>

            <div className="tagRow">
  <div className="tag">
    {player.gamertag}
  </div>

  {player.mvp && (
    <span
      className="mvpBadge"
      title="MVP: +.5 projected win"
    >
      MVP
    </span>
  )}
</div>
          </div>

          <button
            type="button"
            className="playerSpinButton"
            disabled={!canPlayerSpin}
            onClick={() => playerSpin(player)}
            title={
              alternateSeasons.length === 0
                ? "No other season is available for this player"
                : powerupsUsed.player
                ? "Player Spin has already been used"
                : "Spin this player into a different season"
            }
          >
            ↻ SPIN
          </button>
        </div>

        <div className="stats">
          <span>
            <b>{player.kd.toFixed(2)}</b>
            KD
          </span>

          <span>
  <b className="recordWithTrophy">
    {player.record}

    {player.trophy && (
      <span
        className="trophyIcon"
        title="Championship: +0.5 projected wins"
      >
        🏆
      </span>
    )}
  </b>

  W / L
</span>

          <span>
            <b>{player.goals}</b>
            GOALS
          </span>
        </div>

        <button
          type="button"
          className="pick"
          disabled={spinning || taken}
          onClick={() => draft(player)}
        >
          {taken ? "DRAFTED" : "DRAFT PLAYER →"}
        </button>
      </div>
    );
  })}
</div>
              </>
            )}

            {finished && (
              <div
                className={`result ${
                  champion ? "win" : "loss"
                }`}
              >
                <p className="eyebrow">FINAL VERDICT</p>

                <div className="trophy">
                  {champion ? "♛" : "◇"}
                </div>

                <h2>{getVerdictTitle()}</h2>

                <p>{getVerdictDescription()}</p>

                <div className="finalRecord">
                  <span className="recordNumber">
                    {projectedWins}–{projectedLosses}
                  </span>

                  <span className="recordLabel">
                    FINAL RECORD
                  </span>
                </div>

                <button type="button" onClick={reset}>
                  DRAFT AGAIN
                </button>
              </div>
            )}
          </div>

          <aside>
            <div className="asideTitle">
              <h2>YOUR FOUR</h2>
              <span>{drafted.length}/4</span>
            </div>

            {[0, 1, 2, 3].map((index) => (
              <div
                className={`slot ${
                  drafted[index] ? "hasPlayer" : ""
                }`}
                key={index}
              >
                <span className="number">
                  0{index + 1}
                </span>

                {drafted[index] ? (
                  <div>
                    <b>{drafted[index].gamertag}</b>

                    <small>
  {formatSeason(drafted[index].season)} ·{" "}
  {drafted[index].team}
</small>
                  </div>
                ) : (
                  <em>OPEN ROSTER SPOT</em>
                )}
              </div>
            ))}

            <p className="criteria">
              AGLA Dynasty Game.
            </p>
          </aside>
        </section>
        {!finished && (
  <section className="powerups">
    <div className="powerupsHeading">
      <div>
        <p className="eyebrow">ONE USE EACH</p>
        <h2>FREE POWERUPS</h2>
      </div>

      <span>
        Player Spin is used directly on a player card.
      </span>
    </div>

    <div className="powerupGrid">
      <div
        className={`powerupCard ${
          powerupsUsed.player ? "used" : ""
        }`}
      >
        <div className="powerupIcon">01</div>

        <div>
          <h3>PLAYER SPIN</h3>

          <p>
            Keep the same player and swap them to a
            different season.
          </p>
        </div>

        <strong>
          {powerupsUsed.player
            ? "USED"
            : "USE ON A PLAYER"}
        </strong>
      </div>

      <button
        type="button"
        className={`powerupCard actionable ${
          powerupsUsed.full ? "used" : ""
        }`}
        disabled={
          !current ||
          spinning ||
          powerupsUsed.full ||
          !fullRespinAvailable
        }
        onClick={fullRespin}
      >
        <div className="powerupIcon">02</div>

        <div>
          <h3>FULL RESPIN</h3>

          <p>
            Get another free spin.
          </p>
        </div>

        <strong>
          {powerupsUsed.full
            ? "USED"
            : current
            ? "USE POWERUP →"
            : "SPIN FIRST"}
        </strong>
      </button>

      <button
        type="button"
        className={`powerupCard actionable ${
          powerupsUsed.team ? "used" : ""
        }`}
        disabled={
          !current ||
          spinning ||
          powerupsUsed.team ||
          !teamSpinAvailable
        }
        onClick={teamSpin}
      >
        <div className="powerupIcon">03</div>

        <div>
          <h3>TEAM SPIN</h3>

          <p>
            Keep the current season and reveal a
            different team.
          </p>
        </div>

        <strong>
          {powerupsUsed.team
            ? "USED"
            : current
            ? "USE POWERUP →"
            : "SPIN FIRST"}
        </strong>
      </button>
    </div>
  </section>
)}
      </main>
    </div>
  );
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800;900&display=swap');

  :root {
    --ink: #06101f;
    --blue: #2864ff;
    --ice: #eef3fb;
    --line: #bdc9da;
    --lime: #b8ff38;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background: #dfe6f0;
    color: var(--ink);
    font-family: 'Barlow Condensed', Arial, sans-serif;
  }

  .scoreDebug {
  margin-bottom: 28px;
  padding: 22px;
  border: 2px dashed #8aa4ce;
  background: #eef4ff;
  color: #172033;
}

.debugHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 18px;
}

.debugHeader h2 {
  margin: 0;
  font-size: 18px;
  letter-spacing: 1px;
}

.debugHeader span {
  font-weight: 900;
  font-size: 18px;
}

.debugGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.debugCard {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 14px;
  border: 1px solid #b7c7df;
  background: white;
}

.debugCard span {
  font-size: 12px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.7px;
}

.debugCard b {
  font-size: 24px;
}

.debugCard small {
  color: #5f6d82;
}

.debugCard strong {
  margin-top: 4px;
  color: #285ca8;
}

.debugEquation {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 9px;
  margin-top: 16px;
  padding: 13px;
  background: #172033;
  color: white;
  font-size: 14px;
}

.debugEquation b {
  font-size: 20px;
  color: #b8e548;
}

.debugPlayers {
  display: grid;
  gap: 8px;
  margin-top: 14px;
}

.debugPlayer {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
  padding: 10px 12px;
  border: 1px solid #cbd6e7;
  background: white;
  font-size: 13px;
}

.debugPlayer b {
  min-width: 110px;
}

@media (max-width: 900px) {
  .debugGrid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .debugHeader {
    align-items: flex-start;
    flex-direction: column;
  }

  .debugGrid {
    grid-template-columns: 1fr;
  }
}

  .tagRow {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.mvpBadge {
  display: inline-flex;
  align-items: center;
  min-height: 23px;
  padding: 3px 20px;
  border: 1px solid #b68916;
  background: #ddba1f;
  color: #000000;
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 2px;
  line-height: 1;
}

.recordWithTrophy {
  display: flex !important;
  align-items: center;
  gap: 1px;
}

.trophyIcon {
  font-size: 16px;
  line-height: 1;
}

  .page {
    min-height: 100vh;
    background:
      radial-gradient(
        circle at 75% 10%,
        rgba(55, 107, 255, 0.22),
        transparent 30%
      ),
      linear-gradient(
        145deg,
        #f4f7fb 0%,
        #d6dfeb 100%
      );
  }

  .topbar {
    height: 76px;
    background: #030915;
    border-bottom: 2px solid #173160;
    color: white;
    display: flex;
    align-items: center;
  }

  .navInner {
    width: min(1500px, 92%);
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
  }

  .brand {
    color: white;
    text-decoration: none;
    font-weight: 900;
    font-size: 22px;
    line-height: 0.85;
    letter-spacing: 1px;
  }

  .brand span {
    display: block;
    color: #8fb0ed;
    font-size: 14px;
  }

  nav {
    display: flex;
    gap: 30px;
  }

  nav a {
    color: #bac8df;
    text-decoration: none;
    font-size: 19px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }

  nav a.active {
    color: white;
    border-bottom: 3px solid var(--blue);
    padding-bottom: 6px;
  }

  main {
    width: min(1360px, 92%);
    margin: auto;
    padding: 52px 0 70px;
  }

  .hero {
    position: relative;
    border-bottom: 1px solid #aebdd2;
    padding-bottom: 34px;
  }

  .eyebrow {
    color: #31558f;
    font-size: 15px;
    font-weight: 800;
    letter-spacing: 3px;
    margin: 0 0 5px;
  }

  h1 {
    font-size: clamp(78px, 11vw, 150px);
    letter-spacing: -5px;
    line-height: 0.76;
    margin: 12px 0 22px;
    font-style: italic;
    font-weight: 900;
  }

  .intro {
    max-width: 600px;
    font-size: 23px;
    line-height: 1.25;
    color: #45546a;
    margin: 0;
  }

  .progress {
    position: absolute;
    right: 0;
    bottom: 36px;
    display: flex;
    gap: 9px;
  }

  .progress span {
    width: 46px;
    height: 46px;
    display: grid;
    place-items: center;
    border: 1px solid #9dacc0;
    background: rgba(255, 255, 255, 0.5);
    font-size: 19px;
    font-weight: 800;
  }

  .progress span.filled {
    background: var(--blue);
    color: white;
    border-color: var(--blue);
  }

  .gameGrid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 360px;
    gap: 25px;
    margin-top: 25px;
  }

  .arena {
    min-height: 540px;
    background: #f8fafc;
    border: 1px solid #afbdd0;
    box-shadow: 0 18px 45px rgba(16, 39, 78, 0.12);
  }

  .emptyState {
    min-height: 540px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 30px;
    background:
      linear-gradient(
        rgba(6, 16, 31, 0.88),
        rgba(6, 16, 31, 0.94)
      ),
      repeating-linear-gradient(
        125deg,
        transparent 0 30px,
        rgba(255, 255, 255, 0.06) 31px 32px
      );
    color: white;
  }

  .ball {
    width: 82px;
    height: 82px;
    display: grid;
    place-items: center;
    border: 2px solid #4477cf;
    transform: rotate(45deg);
    color: var(--blue);
    font-size: 35px;
    margin-bottom: 30px;
  }

  .emptyState h2,
  .result h2 {
    font-size: 45px;
    text-transform: uppercase;
    margin: 0;
  }

  .emptyState p {
    color: #aebcd1;
    font-size: 20px;
  }

  button {
    font: 800 18px 'Barlow Condensed', Arial, sans-serif;
    letter-spacing: 1.4px;
    cursor: pointer;
  }

  .emptyState button,
  .result button {
    margin-top: 22px;
    padding: 16px 27px;
    color: white;
    background: var(--blue);
    border: 0;
    box-shadow: 6px 6px 0 #173d9e;
  }

  .teamHeader {
    background: var(--ink);
    color: white;
    padding: 27px 31px;
    position: relative;
    overflow: hidden;
  }

  .teamHeader::after {
    content: '';
    position: absolute;
    width: 180px;
    height: 180px;
    background: var(--blue);
    right: -100px;
    top: -80px;
    transform: rotate(45deg);
    opacity: 0.7;
  }

  .teamHeader p {
    margin: 0;
    color: #8cadde;
    font-size: 18px;
    font-weight: 800;
    letter-spacing: 3px;
  }

  .teamHeader h2 {
    font-size: 41px;
    text-transform: uppercase;
    margin: 1px 0 0;
    line-height: 1;
  }

  .teamHeader span {
    position: absolute;
    right: 28px;
    bottom: 25px;
    color: #d5dfef;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 3px;
    z-index: 1;
  }

  .teamHeader.spinning h2 {
    animation: pulse 0.14s infinite alternate;
  }

  @keyframes pulse {
    to {
      opacity: 0.45;
      transform: translateX(5px);
    }
  }

  .roster {
    padding: 18px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 13px;
  }

  .playerCard {
  border: 1px solid #bcc8d8;
  background: white;
  padding: 0;
  text-align: left;
  color: var(--ink);
  transition: 0.16s;
  overflow: hidden;
}

.playerCard:hover {
  transform: translateY(-3px);
  border-color: var(--blue);
  box-shadow: 0 9px 20px rgba(28, 72, 150, 0.14);
}

.playerCard.taken {
  opacity: 0.48;
}

.playerTop {
  min-height: 88px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 14px 11px 18px;
}

.playerSeason {
  color: #687991;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 2px;
}

  .tag {
  font-size: 28px;
  font-weight: 900;
  padding: 1px 0 0;
  text-transform: uppercase;
}

  .playerSpinButton {
  flex: 0 0 auto;
  border: 0;
  background: red;
  color: white;
  padding: 10px 15px;
  font-size: 15px;
  box-shadow: 4px 4px 0 #f52f1565;
}

  .playerSpinButton:hover:not(:disabled) {
  transform: translateY(-1px);
}

  .playerSpinButton:disabled {
  background: #c3aaaa;
  box-shadow: 4px 4px 0 #97807c;
  cursor: default;
  opacity: 0.65;
}

.pick {
  width: 100%;
  padding: 11px 18px;
  color: #2459d3;
  background: white;
  border: 0;
  text-align: left;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 1px;
}

.powerups {
  margin-top: 25px;
  border: 1px solid #afbdd0;
  background: rgba(248, 250, 252, 0.88);
  padding: 25px;
  box-shadow: 0 18px 45px rgba(16, 39, 78, 0.08);
}

.powerupsHeading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
  padding-bottom: 18px;
  border-bottom: 1px solid #c6d0df;
}

.powerupsHeading h2 {
  margin: 0;
  font-size: 36px;
  line-height: 1;
}

.powerupsHeading > span {
  color: #65748a;
  font-size: 16px;
}

.powerupGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-top: 18px;
}

.powerupCard {
  min-height: 165px;
  border: 1px solid #b7c3d3;
  background: white;
  color: var(--ink);
  padding: 18px;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  gap: 13px;
  transition: 0.16s;
}

.powerupCard.actionable:hover:not(:disabled) {
  transform: translateY(-3px);
  border-color: var(--blue);
  box-shadow: 0 9px 20px rgba(28, 72, 150, 0.14);
}

.powerupCard:disabled,
.powerupCard.used {
  opacity: 0.5;
  cursor: default;
}

.powerupIcon {
  color: var(--blue);
  font-size: 14px;
  font-weight: 900;
  letter-spacing: 2px;
}

.powerupCard h3 {
  margin: 0;
  font-size: 25px;
}

.powerupCard p {
  margin: 5px 0 0;
  color: #66758b;
  font: 500 16px "Barlow Condensed", Arial, sans-serif;
  line-height: 1.25;
  letter-spacing: 0;
}

.powerupCard strong {
  color: #2459d3;
  font-size: 14px;
  letter-spacing: 1px;
}

.pick:hover:not(:disabled) {
  background: #edf3ff;
}

.pick:disabled {
  cursor: default;
}

  .stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-top: 1px solid #d4dce7;
    border-bottom: 1px solid #d4dce7;
  }

  .stats span {
    padding: 10px 8px;
    color: #6c788a;
    font-size: 12px;
    letter-spacing: 1px;
  }

  .stats span + span {
    border-left: 1px solid #d4dce7;
  }

  .stats b {
    display: block;
    color: var(--ink);
    font-size: 21px;
    letter-spacing: 0;
  }

  

  aside {
    background: #101c2d;
    color: white;
    border-top: 5px solid var(--blue);
    padding: 23px;
    align-self: start;
  }

  .asideTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 18px;
  }

  .asideTitle h2 {
    font-size: 30px;
    margin: 0;
  }

  .asideTitle span {
    color: #83aaff;
    font-size: 23px;
    font-weight: 800;
  }

  .slot {
    min-height: 77px;
    border-top: 1px solid #304057;
    display: flex;
    align-items: center;
    gap: 14px;
    color: #738198;
  }

  .slot:last-of-type {
    border-bottom: 1px solid #304057;
  }

  .slot .number {
    font-weight: 800;
    color: #526078;
  }

  .slot em {
    font-size: 15px;
    letter-spacing: 1.5px;
  }

  .slot.hasPlayer .number {
    color: #6e97e7;
  }

  .slot div {
    flex: 1;
  }

  .slot b {
    display: block;
    font-size: 22px;
    text-transform: uppercase;
  }

  .slot small {
    display: block;
    color: #8d9bb0;
    font-size: 13px;
  }

  .criteria {
    color: #8290a6;
    font-size: 14px;
    line-height: 1.4;
    margin: 22px 0 0;
  }

  .result {
    min-height: 540px;
    padding: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: linear-gradient(
      145deg,
      #06101f,
      #112b54
    );
    color: white;
  }

  .result.win {
    background: radial-gradient(
      circle at 50% 30%,
      #28539a,
      #06101f 68%
    );
  }

  .result .eyebrow {
    color: #87a9e3;
  }

  .trophy {
    font-size: 68px;
    color: var(--lime);
    line-height: 1;
    margin: 173px;
  }

  .result > p:not(.eyebrow) {
    color: #bac7da;
    font-size: 20px;
    max-width: 540px;
  }

  .finalRecord {
    margin-top: 22px;
    min-width: 210px;
    border: 1px solid #385278;
    padding: 14px 28px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .recordNumber {
    color: white;
    font-size: 38px;
    font-weight: 900;
    line-height: 1;
  }

  .recordLabel {
    margin-top: 5px;
    color: #8fa2be;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1.5px;
  }

  @media (max-width: 900px) {
    .powerupGrid {
    grid-template-columns: 1fr;
    }
    .gameGrid {
      grid-template-columns: 1fr;
    }

    .progress {
      position: static;
      margin-top: 25px;
    }

    .roster {
      grid-template-columns: 1fr;
    }

    nav {
      gap: 13px;
    }

    .teamHeader span {
      position: static;
      display: block;
      margin-top: 9px;
    }

    .hero {
      padding-bottom: 24px;
    }
  }

  @media (max-width: 560px) {
    .powerupsHeading {
    align-items: flex-start;
    flex-direction: column;
  }

  .playerTop {
    gap: 8px;
  }

  .playerSpinButton {
    padding: 9px 11px;
  }
    .topbar {
      height: auto;
      padding: 16px 0;
    }

    .navInner {
      align-items: flex-start;
      flex-direction: column;
    }

    nav {
      flex-wrap: wrap;
    }

    main {
      padding-top: 35px;
    }

    h1 {
      font-size: 76px;
    }

    .intro {
      font-size: 19px;
    }

    .result {
      padding: 25px;
    }

    .roster {
      padding: 10px;
    }

    .finalRecord {
      min-width: 180px;
    }
  }
`;