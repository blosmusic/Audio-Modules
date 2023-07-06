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
const distortionFX = new DistortionFXModule(
  "distortion-module",
  "distortion",
  "red",
  0.3,
  0.1,
  0.5,
  5,
  1
);

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
