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

// Create an array to host the FX modules
const fxModules = [];
// Create an array to host the FX module buttons
const fxButtons = [];

// add the fx modules to the fxModules array
fxModules.push(trebleboostFX); // treble boost module
fxModules.push(distortionFX); // distortion module
fxModules.push(distortionFX2); // distortion module 2

// add the fx buttons to the fxButtons array
fxButtons.push(trebleboostSwitch); // treble boost button
fxButtons.push(distortionSwitch); // distortion button
fxButtons.push(distortionSwitch2); // distortion button 2

export { fxModules, fxButtons };