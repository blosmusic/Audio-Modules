class SliderParameters {
  constructor(name, min, max, defaultValue) {
    this.name = name;
    this.min = min;
    this.max = max;
    this.defaultValue = defaultValue;
  }

  createSlider() {
    const sliderContainer = document.createElement("div");
    sliderContainer.classList.add("slider-container");

    const labelElement = document.createElement("label");
    labelElement.textContent = this.name;

    const sliderElement = document.createElement("input");
    sliderElement.type = "range";
    sliderElement.min = this.minValue;
    sliderElement.max = this.maxValue;
    sliderElement.value = this.defaultValue;

    sliderContainer.appendChild(labelElement);
    sliderContainer.appendChild(sliderElement);

    return SliderContainer;
  }
}

export default SliderParameters;