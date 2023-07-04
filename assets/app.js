// Import Modules
import Meter from "./modules/audioModules/meterModule.js";
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
const gainNode = new Tone.Gain(1);
const distortionFX = new DistortionFXModule(0.5);

async function main() {
  // Start the audio context
  await Tone.start();

  try {
    await audioSource.open();
    console.log("Audio source opened");

    // Connect the audio source to the meter
    audioSource.connect(monoSignal);
    monoSignal.connect(inputMeter.meter);
    inputMeter.meter.connect(distortionFX.input);

    // Connect the audio source to the output
    distortionFX.connect(outputMeter.meter);
    outputMeter.meter.connect(destination);

    // Start the meter update loops
    inputMeter.start();
    outputMeter.start();
  } catch (error) {
    console.error("Failed to open audio source:", error);
  }
}

main();
