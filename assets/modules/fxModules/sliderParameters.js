class SliderParameters {
  constructor(name, minValue, maxValue, step, defaultValue) {
    this.name = name;
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.step = step;
    this.value = defaultValue; // Store the current value
    this.sliderElement = null; // Reference to the slider element
  }

  createSlider() {
    const sliderContainer = document.createElement("div");
    sliderContainer.classList.add("slider-container");

    const labelElement = document.createElement("label");
    labelElement.textContent = this.name;
    sliderContainer.appendChild(labelElement);

    const sliderWrapper = document.createElement("div");
    sliderWrapper.classList.add("slider-wrapper");

    this.sliderElement = document.createElement("input");
    this.sliderElement.type = "range";
    this.sliderElement.min = this.minValue;
    this.sliderElement.max = this.maxValue;
    this.sliderElement.step = this.step;
    this.sliderElement.value = this.value; // Set the value to the current value

    sliderWrapper.appendChild(this.sliderElement);
    sliderContainer.appendChild(sliderWrapper);

    // Update the stored value when the slider value changes
    this.sliderElement.addEventListener("input", (event) => {
      this.value = parseFloat(event.target.value);
      this.updateAudioModule();
    });

    return sliderContainer;
  }

  setValue(newValue) {
    // Update the stored value
    this.value = newValue;

    // Update the slider value if the slider has been created
    if (this.sliderElement) {
      this.sliderElement.value = newValue;
    }

    this.updateAudioModule();
  }

  updateAudioModule() {
    // Implement the logic to update the audio module with the new value
    // For example:
    // audioModule.setParameter(this.name, this.value);
  }
}

export default SliderParameters;
