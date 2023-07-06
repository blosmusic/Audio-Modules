class ButtonSwitch {
  constructor() {
    this.button = null;
    this.on = false; // Set the initial state to off
    this.updateButtonAppearance();
  }

  createButton() {
    this.button = document.createElement("button");
    this.button.textContent = this.on ? "On" : "Off";
    this.button.addEventListener("click", () => {
      this.toggle();
    });

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
  }
}

export default ButtonSwitch;
