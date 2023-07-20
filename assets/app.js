// Import Modules
import Meter from "./modules/audioModules/meterModule.js";
import SliderParameters from "./modules/fxModuleObjectConstructors/sliderParameters.js";
import ButtonSwitch from "./modules/fxModuleObjectConstructors/buttonSwitch.js";
import DistortionFXModule from "./modules/fxModuleObjectConstructors/distortionFX.js";
import {
  trebleboostFX,
  trebleboostSwitch,
} from "./modules/fxModulesInstances/trebleboostFX.js";

// Audio Context Setup
Tone.context.lookAhead = 0;
Tone.context.updateInterval = 0.01;
Tone.context.bufferSize = 128;

// Audio Source Setup
const audioSource = new Tone.UserMedia();
const monoSignal = new Tone.Mono();
const destination = Tone.getDestination();

// Meter Setup
const inputMeter = new Meter(-100, 0, "input-meter", "input-db-value");
const outputMeter = new Meter(-100, 0, "output-meter", "output-db-value");

// Create an array to host the FX modules
const fxModules = [];
// Create an array to host the FX module buttons
const fxButtons = [];
// FX Module Setup
const distortionModule = document.getElementById("distortion-module");
// slider constructor: (id, min, max, step, value, label, moduleContainer)
const dirtValue = new SliderParameters(
  "distortion",
  0,
  1,
  0.01,
  0.5,
  "distortion",
  distortionModule
);
const dirtTreble = new SliderParameters(
  "highGain",
  0,
  10,
  0.01,
  0,
  "treble",
  distortionModule
);
const dirtGain = new SliderParameters(
  "outputGain",
  0.01,
  10,
  0.01,
  5,
  "gain",
  distortionModule
);

// distortion constructor: (id, title, colour, inputGain, distortionAmount, lowGain, midGain, highGain, outputGain, wetDryMix)
const distortionFX = new DistortionFXModule(
  "distortion-module",
  "distortion",
  "orange",
  1,
  dirtValue.value,
  0.1,
  0.3,
  dirtTreble.value,
  dirtGain.value,
  1
);

dirtValue.sliderElement.addEventListener("input", () => {
  distortionFX.setParameter("distortion", dirtValue.value);
});

dirtTreble.sliderElement.addEventListener("input", () => {
  distortionFX.setParameter("highGain", dirtTreble.value);
});

dirtGain.sliderElement.addEventListener("input", () => {
  distortionFX.setParameter("outputGain", dirtGain.value);
});

// button constructor: (callback, module)
// const is calling the constructor from the buttonSwitch.js file
const dirtSwitch = new ButtonSwitch((state) => {
  if (!state) {
    // console.log(dirtSwitch.on, "dirtSwitch", distortionFX.title, "off");
    distortionFX.disconnect();
    // fxModules.pop(distortionFX);
  } else {
    // fxModules.push(distortionFX);
    // console.log(dirtSwitch.on, "dirtSwitch", distortionFX.title, "on");
  }
}, distortionModule);

// FX Module Setup 2
const distortionModule2 = document.getElementById("distortion-module-2");

const dirtValue2 = new SliderParameters(
  "distortion",
  0,
  1,
  0.01,
  0.3,
  "distortion",
  distortionModule2
);

const dirtTreble2 = new SliderParameters(
  "highGain",
  0,
  10,
  0.01,
  0,
  "treble",
  distortionModule2
);

const dirtGain2 = new SliderParameters(
  "outputGain",
  0,
  20,
  0.01,
  3,
  "gain",
  distortionModule2
);

const distortionFX2 = new DistortionFXModule(
  "distortion-module-2",
  "distortion II",
  "purple",
  1,
  dirtValue2.value,
  0.1,
  0.3,
  dirtTreble2.value,
  dirtGain2.value,
  1
);


dirtValue2.sliderElement.addEventListener("input", () => {
  distortionFX2.setParameter("distortion", dirtValue2.value);
});

dirtTreble2.sliderElement.addEventListener("input", () => {
  distortionFX2.setParameter("highGain", dirtTreble2.value);
});

dirtGain2.sliderElement.addEventListener("input", () => {
  distortionFX2.setParameter("outputGain", dirtGain2.value);
});

const dirtSwitch2 = new ButtonSwitch((state) => {
  if (!state) {
    // console.log(dirtSwitch2.on, "dirtSwitch2", distortionFX2.title, "off");
    distortionFX2.disconnect();
    // fxModules.pop(distortionFX2);
  } else {
    // console.log(dirtSwitch2.on, "dirtSwitch2", distortionFX2.title, "on");
    // fxModules.push(distortionFX2);
  }
}, distortionModule2);

// add the fx modules to the fxModules array
fxModules.push(trebleboostFX); // treble boost module
fxModules.push(distortionFX); // distortion module
fxModules.push(distortionFX2); // distortion module 2

// add the fx buttons to the fxButtons array
fxButtons.push(trebleboostSwitch); // treble boost button
fxButtons.push(dirtSwitch); // distortion button
fxButtons.push(dirtSwitch2); // distortion button 2

// manage the button states and turn on/off the fx modules
fxButtons.forEach((button) => {
  button.button.addEventListener("click", () => {
    // Disconnect all modules from the inputMeter.input to establish new connections
    inputMeter.output.disconnect();
    // assign the last active module to the input meter
    let lastActiveModule = inputMeter;

    for (let i = 0; i < fxModules.length; i++) {
      if (fxButtons[i].on) {
        // console.log("loop", fxButtons[i].on, fxModules[i].title, "on");
        lastActiveModule.output.connect(fxModules[i].input);
        lastActiveModule = fxModules[i];
      } else {
        // console.log("loop", fxButtons[i].on, fxModules[i].title, "off");
        fxModules[i].output.disconnect();
      }
    }
    // connect the last active module to the output meter
    lastActiveModule.output.connect(outputMeter.input);
    // console.log(lastActiveModule.title, "last active module"); // this is the last active module
    // connect the output meter to the destination
    outputMeter.output.connect(destination);
  });
});

// Main function
async function main() {
  // Start the audio context
  await Tone.start();

  try {
    await audioSource.open();
    console.log("Audio source opened");
    // for (let i = 0; i < fxModules.length; i++) {
    //   console.log(fxModules[i].title);
    // }
    // connect the audio source to the meter
    audioSource.connect(monoSignal);
    monoSignal.connect(inputMeter.input);
    // connect the meter to the FX module array

    inputMeter.output.connect(outputMeter.input);
    outputMeter.output.connect(destination);
  } catch (error) {
    console.error("Failed to open audio source:", error);
  }
}

main();
