import SliderParameters from "./sliderParameters.js";
import ButtonSwitch from "./buttonSwitch.js";

class DistortionFXModule {
  constructor(
    id,
    title,
    colour,
    distortionAmount,
    lowGain,
    midGain,
    highGain,
    outputGain
  ) {
    // Create components
    this.input = new Tone.Gain();
    this.distortion = new Tone.Distortion({
      distortion: distortionAmount,
      oversample: "2x",
      wet: 1,
    });
    this.eq = new Tone.EQ3(lowGain, midGain, highGain);
    this.gain = new Tone.Gain(outputGain);
    this.output = new Tone.Gain();

    // Connect the components
    this.input.connect(this.distortion);
    this.distortion.connect(this.eq);
    this.eq.connect(this.gain);
    this.gain.connect(this.output);

    // Attach the module to the HTML element with the provided id
    const moduleElement = document.getElementById(id);
    if (moduleElement) {
      moduleElement.style.backgroundColor = colour;

      // Create an <h3> element with the provided title
      const titleElement = document.createElement("h2");
      titleElement.textContent = title;

      // Append the title element to the module element
      moduleElement.appendChild(titleElement);
    }
  }

  connect(destination) {
    this.output.connect(destination || destination.input);
  }

  disconnect() {
    this.output.disconnect();
  }
}

export default DistortionFXModule;
