import SliderParameters from "../fxModuleObjectConstructors/sliderParameters.js";
import ButtonSwitch from "../fxModuleObjectConstructors/buttonSwitch.js";
import DistortionFXModule from "../fxModuleObjectConstructors/distortionFX.js";

// FX Module Setup
// based on a typical tube screamer circuit
// https://www.electrosmash.com/tube-screamer-analysis
const trebleboostModule = document.getElementById("trebleboost-module");
// slider constructor: (id, min, max, step, value, label, moduleContainer)
const trebleboostValue = new SliderParameters(
  "distortion",
  0,
  1,
  0.01,
  0.5,
  "overdrive",
  trebleboostModule
);
const trebleboostTreble = new SliderParameters(
  "highGain",
  0,
  10,
  0.01,
  0,
  "tone",
  trebleboostModule
);
const trebleboostGain = new SliderParameters(
  "outputGain",
  0.01,
  10,
  0.01,
  5,
  "level",
  trebleboostModule
);

// trebleboost constructor: (id, title, colour, inputGain, trebleboostAmount, lowGain, midGain, highGain, outputGain, wetDryMix)
const trebleboostFX = new DistortionFXModule(
  "trebleboost-module",
  "treble boost",
  "green",
  1,
  trebleboostValue.value,
  0.1,
  0.3,
  trebleboostTreble.value,
  trebleboostGain.value,
  1
);
// fxModules.push(trebleboostFX);

trebleboostValue.sliderElement.addEventListener("input", () => {
  trebleboostFX.setParameter("distortion", trebleboostValue.value);
});

trebleboostTreble.sliderElement.addEventListener("input", () => {
  trebleboostFX.setParameter("highGain", trebleboostTreble.value);
});

trebleboostGain.sliderElement.addEventListener("input", () => {
  trebleboostFX.setParameter("outputGain", trebleboostGain.value);
});

// button constructor: (callback, module)
// const is calling the constructor from the buttonSwitch.js file
const trebleboostSwitch = new ButtonSwitch((state) => {
  if (!state) {
    // console.log(trebleboostSwitch.on, "trebleboostSwitch", trebleboostFX.title, "off");
    trebleboostFX.disconnect();
    // fxModules.pop(trebleboostFX);
  } else {
    // fxModules.push(trebleboostFX);
    // console.log(trebleboostSwitch.on, "trebleboostSwitch", trebleboostFX.title, "on");
  }
}, trebleboostModule);
// fxButtons.push(trebleboostSwitch); // trebleboost button

export {trebleboostFX, trebleboostSwitch};