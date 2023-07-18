class SliderParameters {
  constructor(
    name,
    minValue,
    maxValue,
    step,
    defaultValue,
    labelName,
    moduleContainer
  ) {
    this.slider = null; // Reference to the slider element
    this.name = name;
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.step = step;
    this.defaultValue = defaultValue; // Store the default value
    this.value = defaultValue; // Store the current value
    this.sliderElement = null; // Reference to the slider element
    this.labelName = labelName; // Reference to the label element
  }

  createSlider() {
    const sliderContainer = document.createElement("div");
    sliderContainer.classList.add("slider-container");

    const labelElement = document.createElement("label");
    labelElement.textContent = this.labelName;
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
      console.log(this.name, event.target.value); // for debugging
      this.value = parseFloat(event.target.value);
      this.updateAudioModule();
    });

    // Set the labelElement
    this.labelElement = labelElement;

    // Set the reset to default value
    this.resetToDefault();

    return sliderContainer;
  }

  setValue(newValue) {
    // console.log("setValue", this.name, newValue); // for debugging
    // Update the stored value
    this.value = newValue;

    // Update the slider value if the slider has been created
    if (this.sliderElement) {
      this.sliderElement.value = newValue;
    }
  }

  // reset to default value on double click of slider thumb or label
  resetToDefault() {
    const handleDblClick = () => {
      this.setToDefault();
      this.setValue(this.defaultValue);
      // console.log(this.name, "reset to default", this.defaultValue); // for debugging
    };

    if (this.sliderElement) {
      this.sliderElement.addEventListener("dblclick", handleDblClick); // reset to default value on double click of slider thumb
    }

    if (this.labelElement) {
      this.labelElement.addEventListener("dblclick", handleDblClick);
    }
  }

  // set the value to the default value
  setToDefault() {
    this.value = this.defaultValue;

    if (this.sliderElement) {
      this.sliderElement.value = this.defaultValue;
      this.sliderElement.dispatchEvent(new Event("input")); // trigger the input event
    }
  }
}

export default SliderParameters;
