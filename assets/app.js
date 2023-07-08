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
const dirtValue = new SliderParameters("distortion", 0, 1, 0.01, 0.5, "distortion");
const dirtTreble = new SliderParameters("highGain", 0, 10, 0.01, 0, "treble");
const dirtGain = new SliderParameters("outputGain", 0, 1, 0.01, 0.5, "gain");
const dirtValueSlider = dirtValue.createSlider();
const dirtTrebleSlider = dirtTreble.createSlider();
const dirtGainSlider = dirtGain.createSlider();

const dirtSwitch = new ButtonSwitch("distortion");
const dirtSwitchButton = dirtSwitch.createButton();

// distortion constructor: (id, title, colour, inputGain, distortionAmount, lowGain, midGain, highGain, outputGain, wetDryBypass)
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
  1// dirtSwitch.on
);

  document.getElementById("distortion-module").appendChild(dirtValueSlider);
  document.getElementById("distortion-module").appendChild(dirtTrebleSlider);
  document.getElementById("distortion-module").appendChild(dirtGainSlider);
  document.getElementById("distortion-module").appendChild(dirtSwitchButton);
  
  dirtValue.sliderElement.addEventListener("input", () => {
    // console.log("Slider value changed:", dirt.value);
    distortionFX.setParameter("distortion", dirtValue.value);
  });

  dirtTreble.sliderElement.addEventListener("input", () => {
    // console.log("Slider value changed:", dirt.value);
    distortionFX.setParameter("highGain", dirtTreble.value);
  });

  dirtGain.sliderElement.addEventListener("input", () => {
    // console.log("Slider value changed:", dirt.value);
    distortionFX.setParameter("outputGain", dirtGain.value);
  });

dirtSwitch.button.addEventListener("click", () => {
  console.log("Button clicked:", dirtSwitch.on, distortionFX.wetDryBypass);
  distortionFX.wetDryBypass = dirtSwitch.on ? 0 : 1;
});


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
