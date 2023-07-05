class DistortionFXModule {
  constructor(distortionAmount, lowGain, midGain, highGain, outputGain) {
    // Create components
    this.input = new Tone.Gain(1);
    this.distortion = new Tone.Distortion({
        distortion: distortionAmount,
        oversample: "2x",
        wet: 1,
    });
    this.eq = new Tone.EQ3(lowGain, midGain, highGain);
    this.gain = new Tone.Gain(outputGain);
    this.output = this.gain;

    // Connect the components
    this.input.connect(this.distortion);
    this.distortion.connect(this.eq);
    this.eq.connect(this.gain);
  }

  // Setters for the parameters
  set distortionAmount(value) {
    this.distortion.distortion = value;
  }

  set lowGain(value) {
    this.eq.low.value = value;
  }

  set midGain(value) {
    this.eq.mid.value = value;
  }

  set highGain(value) {
    this.eq.high.value = value;
  }

  set outputGain(value) {
    this.gain.gain.value = value;
  }

  // Connect the effect to the audio chain
  connect(destination) {
    this.output.connect(destination || destination.input);
  }

  // Disconnect the effect from the audio chain
  disconnect() {
    this.output.disconnect();
  }
}

export default DistortionFXModule;
