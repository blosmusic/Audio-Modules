class ButtonSwitch {
  constructor() {
    this.button = null;
    this.on = false; // Set the initial state to off
    this.indicator = null;
    this.updateButtonAppearance();
  }

  createButton() {
    // Create a button element
    this.button = document.createElement("button");
    this.button.textContent = this.on ? "On" : "Off";
    this.button.addEventListener("click", () => {
      this.toggle();
    });

    // Create an indicator element for button
    this.indicator = document.createElement("div");
    this.indicator.classList.add("indicator");
    this.indicator.style.backgroundColor = "darkred";
    this.button.appendChild(this.indicator);

    return this.button;
  }

  toggle() {
    this.on = !this.on; // Toggle the state between on and off
    this.updateButtonAppearance();
    this.updateAudioModule(); // Call a method to update the audio module based on the state
  }

  updateButtonAppearance() {
    if (this.button) {
      this.button.textContent = this.on ? "On" : "Off";
    }
  }

  updateAudioModule() {
    // Implement the logic to update the audio module based on the state
    // For example:
    // audioModule.setFXState(this.on);

    // console.log("Button clicked:", this.on);

    // if (this.on) {
    //   distortionFX.distortion.wet.value = 0;
    // } else {
    //   distortionFX.distortion.wet.value = 1;
    // }
  }
}

export default ButtonSwitch;
