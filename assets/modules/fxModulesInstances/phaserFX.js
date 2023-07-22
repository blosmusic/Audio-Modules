import SliderParameters from "../audioModulesAndComponents/sliderParameters.js";
import ButtonSwitch from "../audioModulesAndComponents/buttonSwitch.js";
import PhaserFXModule from "../fxModuleObjectConstructors/phaserFXModule.js";

// FX Module Setup
const phaserModule = document.getElementById("phaser-module");

// slider constructor: (id, min, max, step, value, label, moduleContainer)
const phaserDepth = new SliderParameters(
  "baseFrequency",
  50,
  500,
  1,
  350,
  "depth",
  phaserModule
);

const phaserRate = new SliderParameters(
  "frequency",
  0.1,
  10,
  0.01,
  5,
  "rate",
  phaserModule
);

// PhaserFXModule constructor: id, title, colour, inputGain, q, baseFrequecy, frequency, octaves, stages, wet, outputGain
const phaserFX = new PhaserFXModule(
  "phaser-module",
  "phaser",
  "orangered",
  1,
  6,
  phaserDepth.value,
  phaserRate.value,
  6,
  6,
  1,
  1
);

phaserDepth.sliderElement.addEventListener("input", () => {
  phaserFX.setParameter("baseFrequency", phaserDepth.value);
});

phaserRate.sliderElement.addEventListener("input", () => {
  phaserFX.setParameter("frequency", phaserRate.value);
});

// button constructor: (callback, module)
// const is calling the constructor from the buttonSwitch.js file
const phaserSwitch = new ButtonSwitch((state) => {
  if (!state) {
    phaserFX.disconnect();
  } else {
    //
  }
}, phaserModule);

export { phaserFX, phaserSwitch };
