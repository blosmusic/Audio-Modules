class DistortionFXModule {
  constructor(distortionAmount, lowGain, midGain, highGain, outputGain) {

    // Create components
    this.distortion = new Tone.Distortion(distortionAmount);
    this.eq = new Tone.EQ3(lowGain, midGain, highGain);
    this.gain = new Tone.Gain(outputGain);

    // Connect the components
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
}

export default DistortionFXModule;