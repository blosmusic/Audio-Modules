import {
  pitchShifterFX,
  pitchShifterSwitch,
} from "./modules/fxModulesInstances/pitchshifterFX.js";
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
  bitcrusherFX,
  bitcrusherSwitch,
} from "./modules/fxModulesInstances/bitcrusherFX.js";
import {
  chebyshevDistortionFX,
  chebyshevDistortionSwitch,
} from "./modules/fxModulesInstances/chebydistortionFX.js";
import {
  autowahFX,
  autowahSwitch,
} from "./modules/fxModulesInstances/autowahFX.js";
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
// Pitch
fxModules.push(pitchShifterFX); // pitch shifter module

// Gains, Distortions, Overdrives
fxModules.push(trebleboostFX); // treble boost module
fxModules.push(distortionFX); // distortion module
fxModules.push(distortionFX2); // distortion module 2
fxModules.push(bitcrusherFX); // bitcrusher module
fxModules.push(chebyshevDistortionFX); // chebyshev distortion module

// Filters and EQs
fxModules.push(autowahFX); // autowah module

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
// Pitch
fxButtons.push(pitchShifterSwitch); // pitch shifter button

// Gains, Distortions, Overdrives
fxButtons.push(trebleboostSwitch); // treble boost button
fxButtons.push(distortionSwitch); // distortion button
fxButtons.push(distortionSwitch2); // distortion button 2
fxButtons.push(bitcrusherSwitch); // bitcrusher button
fxButtons.push(chebyshevDistortionSwitch); // chebyshev distortion button

// Filters and EQs
fxButtons.push(autowahSwitch); // autowah button

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