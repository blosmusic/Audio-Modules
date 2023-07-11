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
// slider constructor: (id, min, max, step, value, label)
const dirtValue = new SliderParameters(
  "distortion",
  0,
  1,
  0.01,
  0.5,
  "distortion"
);
const dirtTreble = new SliderParameters("highGain", 0, 10, 0.01, 0, "treble");
const dirtGain = new SliderParameters("outputGain", 0, 1, 0.01, 0.5, "gain");
const dirtValueSlider = dirtValue.createSlider();
const dirtTrebleSlider = dirtTreble.createSlider();
const dirtGainSlider = dirtGain.createSlider();

// distortion constructor: (id, title, colour, inputGain, distortionAmount, lowGain, midGain, highGain, outputGain, wetDryBypass, wetDrySignal)
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
  0,
  1
);

let bypassValue = distortionFX.wetDryBypass; // Store the bypass value
let signalValue = distortionFX.wetDrySignal; // Store the signal value

distortionModule.appendChild(dirtValueSlider);
distortionModule.appendChild(dirtTrebleSlider);
distortionModule.appendChild(dirtGainSlider);

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
    distortionFX.wetDryBypass = bypassValue;
  } else {
    distortionFX.wetDryBypass = signalValue;
  }
  // console.log("Button clicked:", dirtSwitch.on, "bypass", distortionFX.wetDryBypass, bypassValue, signalValue);
}, distortionModule);

// Main function
async function main() {
  // Start the audio context
  await Tone.start();

  try {
    await audioSource.open();
    console.log("Audio source opened");

    // Connect the audio source to the meter
    audioSource.connect(monoSignal);
    monoSignal.connect(inputMeter.input);
    inputMeter.output.connect(distortionFX.input);
    distortionFX.output.connect(outputMeter.input);
    outputMeter.output.connect(destination);

    // Start the meter update loops
    inputMeter.start();
    outputMeter.start();
  } catch (error) {
    console.error("Failed to open audio source:", error);
  }
}

main();
