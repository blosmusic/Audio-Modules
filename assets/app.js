// Import Modules
import Meter from "./modules/audioModules/meterModule.js";
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
} from "./modules/fxModulesInstances/distortionIIFX.js";

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

// add the fx modules to the fxModules array
fxModules.push(trebleboostFX); // treble boost module
fxModules.push(distortionFX); // distortion module
fxModules.push(distortionFX2); // distortion module 2

// add the fx buttons to the fxButtons array
fxButtons.push(trebleboostSwitch); // treble boost button
fxButtons.push(distortionSwitch); // distortion button
fxButtons.push(distortionSwitch2); // distortion button 2

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
    // connect the audio source to the meter
    audioSource.connect(monoSignal);
    // default connection
    monoSignal.connect(inputMeter.input);
    inputMeter.output.connect(outputMeter.input);
    outputMeter.output.connect(destination);
  } catch (error) {
    console.error("Failed to open audio source:", error);
  }
}

main();
