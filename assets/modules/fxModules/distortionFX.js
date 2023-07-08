import SliderParameters from "./sliderParameters.js";
import ButtonSwitch from "./buttonSwitch.js";

class DistortionFXModule {
  constructor(
    id,
    title,
    colour,
    inputGain,
    distortionAmount,
    lowGain,
    midGain,
    highGain,
    outputGain,
    wetDryBypass
  ) {
    // Create components
    this.input = new Tone.Gain(inputGain); //typically 0
    this.distortion = new Tone.Distortion({
      distortion: distortionAmount,
      oversample: "2x",
      wet: wetDryBypass, // will be used to bypass
    });
    this.eq = new Tone.EQ3(lowGain, midGain, highGain);
    this.output = new Tone.Gain(outputGain);

    // Connect the components
    // order based on https://www.electrosmash.com/tube-screamer-analysis
    this.input.connect(this.distortion);
    this.distortion.connect(this.eq);
    this.eq.connect(this.output);
    // this.gain.connect(this.output);

    // Attach the module to the HTML element with the provided id
    const moduleElement = document.getElementById(id);
    if (moduleElement) {
      moduleElement.style.backgroundColor = colour;

      // Create an <h2> element with the provided title
      const titleElement = document.createElement("h2");
      titleElement.textContent = title;

      // Append the title element to the module element
      moduleElement.appendChild(titleElement);
    }
  }

  get wetDryBypass() {
    return this.distortion.wet.value;
  }

  set wetDryBypass(value) {
    this.distortion.wet.value = value;
  }

  setParameter(parameterName, value) {
    switch (parameterName) {
      case "inputGain":
        this.input.gain.value = value;
        break;
      case "distortion":
        this.distortion.distortion = value;
        break;
      case "lowGain":
        this.eq.low.value = value;
        break;
      case "midGain":
        this.eq.mid.value = value;
        break;
      case "highGain":
        this.eq.high.value = value;
        break;
      case "outputGain":
        this.output.gain.value = value;
        break;
      case "bypass":
        this.bypass = value;
        break;
      default:
        console.error("Invalid parameter name:", parameterName);
        break;
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
