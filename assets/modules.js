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

// add the fx buttons to the fxButtons array
// Gains, Distortions, Overdrives
fxButtons.push(trebleboostSwitch); // treble boost button
fxButtons.push(distortionSwitch); // distortion button
fxButtons.push(distortionSwitch2); // distortion button 2

// Modulation
fxButtons.push(chorusSwitch); // chorus button

export { fxModules, fxButtons };