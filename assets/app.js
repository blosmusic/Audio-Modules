// Import Modules
import Meter from "./modules/audioModules/meterModule.js";
import SliderParameters from "./modules/fxModules/sliderParameters.js";
import ButtonSwitch from "./modules/fxModules/buttonSwitch.js";
import DistortionFXModule from "./modules/fxModules/distortionFX.js";

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
  0,
  1,
  0.01,
  0.5,
  "gain",
  distortionModule
);

// distortion constructor: (id, title, colour, inputGain, distortionAmount, lowGain, midGain, highGain, outputGain, wetDryMix)
const distortionFX = new DistortionFXModule(
  "distortion-module",
  "distortion",
  "green",
  1,
  dirtValue.value,
  0.1,
  0.3,
  dirtTreble.value,
  dirtGain.value,
  1,
);

dirtValue.sliderElement.addEventListener("input", () => {
  // console.log("dirtValue", dirtValue.value);
  distortionFX.setParameter("distortion", dirtValue.value);
});

dirtTreble.sliderElement.addEventListener("input", () => {
  // console.log("dirtTreble", dirtTreble.value);
  distortionFX.setParameter("highGain", dirtTreble.value);
});

dirtGain.sliderElement.addEventListener("input", () => {
  // console.log("dirtGain", dirtGain.value);
  distortionFX.setParameter("outputGain", dirtGain.value);
});

// button constructor: (callback, module)
// const is calling the constructor from the buttonSwitch.js file
const dirtSwitch = new ButtonSwitch((state) => {
  if (!state) {
    distortionFX.disconnect();
    // inputMeter.output.connect(outputMeter.input);
  } else {
    distortionFX.output.connect(outputMeter.input);
  }
  // console.log("Button state:", dirtSwitch.on);
}, distortionModule);

// Create an array to host the FX modules
const fxModules = [];
// Push the modules into the array
fxModules.push(distortionFX);

// Main function
async function main() {
  // Start the audio context
  await Tone.start();

  try {
    await audioSource.open();
    console.log("Audio source opened");

    // connect the audio source to the meter
    audioSource.connect(monoSignal);
    monoSignal.connect(inputMeter.input);
    inputMeter.output.connect(fxModules[0].input);
    // FX array of modules
    for (let i = 0; i < fxModules.length - 1; i++) {
      console.log("fx", fx);
      fxModules[i].output.connect(fxModules[i + 1].input);
    }
    // last module in the array is connected to the output meter
    fxModules[fxModules.length - 1].output.connect(outputMeter.input);
    // output meter is connected to the destination
    outputMeter.output.connect(destination);
  } catch (error) {
    console.error("Failed to open audio source:", error);
  }
}

main();
