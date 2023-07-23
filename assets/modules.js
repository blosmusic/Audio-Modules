import {
  trebleboostFX,
  trebleboostSwitch,
} from "./modules/fxModulesInstances/trebleboostFX.js";
import {
  distortionFX,
  distortionSwitch,
} from "./modules/fxModulesInstances/distortionFX.js";
import {
  distortionFX2,
  distortionSwitch2,
} from "./modules/fxModulesInstances/distortionPlusFX.js";
import {
  chorusFX,
  chorusSwitch,
} from "./modules/fxModulesInstances/chorusFX.js";
import {
  phaserFX,
  phaserSwitch,
} from "./modules/fxModulesInstances/phaserFX.js";
import {
  tremoloFX,
  tremoloSwitch,
} from "./modules/fxModulesInstances/tremoloFX.js";
import {
  vibratoFX,
  vibratoSwitch,
} from "./modules/fxModulesInstances/vibratoFX.js";
import {
  delayFX,
  delaySwitch,
} from "./modules/fxModulesInstances/delayFX.js";
import {
  pingpongDelayFX,
  pingpongDelaySwitch,
} from "./modules/fxModulesInstances/pingpongDelayFX.js";
import {
  reverbFX,
  reverbSwitch,
} from "./modules/fxModulesInstances/reverbFX.js";
import {
  jcreverbFX,
  jcreverbSwitch,
} from "./modules/fxModulesInstances/jcreverbFX.js";

// Create an array to host the FX modules
const fxModules = [];
// Create an array to host the FX module buttons
const fxButtons = [];

// add the fx modules to the fxModules array
// Gains, Distortions, Overdrives
fxModules.push(trebleboostFX); // treble boost module
fxModules.push(distortionFX); // distortion module
fxModules.push(distortionFX2); // distortion module 2

// Modulation
fxModules.push(chorusFX); // chorus module
fxModules.push(phaserFX); // phaser module
fxModules.push(tremoloFX); // tremolo module
fxModules.push(vibratoFX); // vibrato module

// Delay and Reverb
fxModules.push(delayFX); // delay module
fxModules.push(pingpongDelayFX); // pingpong delay module
fxModules.push(reverbFX); // reverb module
fxModules.push(jcreverbFX); // jcreverb module

// add the fx buttons to the fxButtons array
// Gains, Distortions, Overdrives
fxButtons.push(trebleboostSwitch); // treble boost button
fxButtons.push(distortionSwitch); // distortion button
fxButtons.push(distortionSwitch2); // distortion button 2

// Modulation
fxButtons.push(chorusSwitch); // chorus button
fxButtons.push(phaserSwitch); // phaser button
fxButtons.push(tremoloSwitch); // tremolo button
fxButtons.push(vibratoSwitch); // vibrato button

// Delay and Reverb
fxButtons.push(delaySwitch); // delay button
fxButtons.push(pingpongDelaySwitch); // pingpong delay button
fxButtons.push(reverbSwitch); // reverb button
fxButtons.push(jcreverbSwitch); // jcreverb button

export { fxModules, fxButtons };