class ButtonSwitch {
  constructor(updateCallback, fxContainer) {
    this.button = null;
    this.on = false; // Set the initial state to off
    this.indicator = null;
    this.updateCallback = updateCallback; // Custom update callback function
    this.fxContainer = fxContainer; // Reference to the FX module's container element
    this.createButton();
  }

  createButton() {
    // Create a button element
    this.button = document.createElement("button");
    this.button.textContent = this.on ? "On" : "Off";

    // Create an indicator element for the button
    this.indicator = document.createElement("div");
    this.indicator.id = `${this.fxContainer.id}-indicator`; // Set the id to `fxContainerId-indicator`
    this.indicator.classList.add("indicator");
    this.indicator.style.backgroundColor = this.on ? "red" : "darkred";

    // Append the button and indicator to the fxContainer
    this.fxContainer.appendChild(this.button);
    this.fxContainer.appendChild(this.indicator);

    this.button.addEventListener("click", () => {
      this.toggle();
      this.updateButtonAppearance();
    });

    return this.button;
  }

  toggle() {
    this.on = !this.on; // Toggle the state between on and off
    this.updateButtonAppearance();
    this.updateCallback(this.on); // Call the custom update callback function with the current state
  }

  updateButtonAppearance() {
    if (this.button) {
      this.button.textContent = this.on ? "On" : "Off";
      this.indicator.style.backgroundColor = this.on ? "red" : "darkred";
    }
  }
}

export default ButtonSwitch;
