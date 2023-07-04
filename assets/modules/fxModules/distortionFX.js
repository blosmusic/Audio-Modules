class DistortionFXModule {
  constructor(distortionAmount) {
    // Create components
    this.input = new Tone.Gain();
    this.output = new Tone.Gain();
    this.distortionAmount = new Tone.Signal(distortionAmount);

    // Create WaveShaper node
    this.waveShaper = new Tone.WaveShaper(this.applyDistortion.bind(this));

    // Connect the components
    this.input.chain(this.waveShaper, this.output);

    // Set default parameters
    this.distortionAmount.setValueAtTime(distortionAmount, Tone.now());
  }

  // Function to apply distortion
  applyDistortion(input) {
    const distortion = this.distortionAmount.value;
    const k = (2 * distortion) / (1 - distortion);
    return ((1 + k) * input) / (1 + k * Math.abs(input));
  }

  // Setters for the parameters

  set distortionAmount(value) {
    this.distortionAmount.setValueAtTime(value, Tone.now());
  }

  // Connect the effect to the audio nodes
  connect(destination) {
    this.output.connect(destination);
  }

  // Disconnect the effect from the audio nodes
  disconnect() {
    this.output.disconnect();
  }
}

export default DistortionFXModule;
