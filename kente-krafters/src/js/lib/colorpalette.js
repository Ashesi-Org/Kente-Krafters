/**
 * Color Palette class for the color swatches.
 * Shows the current color of the object and allows user to change color
 * @param {String} name Name of the stole object (for identification)
 * @param {Array} colors Array of colors (hex strings)
 * @param {Array} target Array of fabric objects whose color are changed when user interacts with palette
 * @param {} parentElement The DOM element that you want to put the palette into, could be menu, container, etc.
 */
class ColorPalette {
  constructor(name, colors, target, parentElement) {
    const _self = this;

    // if you want the color palette to persist, remove Array.from()
    // otherwise, as stoles are changed, the colorpalette grows larger
    this._colors = Array.from(colors);

    this._id = name + "-palette";
    this._target = target;
    this._paletteElement = undefined;

    // Create the DOM Element

    // if it already exists, clear it first
    const palette = document.getElementById(this._id);
    if (palette) {
      palette.remove();
    }

    this._paletteElement = document.createElement("div");
    this._paletteElement.className = "palette";
    this._paletteElement.id = this._id;

    // Add the object's color to the palette if it's not already in
    let objectColor = GetObjectColor(this._target[0]);
    if (!this._colors.includes(objectColor)) {
      this._colors.push(objectColor);
    }

    // Create the Color Indicator: Rectangle on top that shows the current color selected
    this._selectedColorIndex =
      this._colors.indexOf(objectColor) == -1
        ? 0
        : this._colors.indexOf(objectColor);

    const colorIndicator = document.createElement("div");
    colorIndicator.className = "color-indicator";
    colorIndicator.style.backgroundColor = this._colors[
      this._selectedColorIndex
    ];
    this._paletteElement.appendChild(colorIndicator);

    // Create the color boxes
    // If you want colors to be statically based on a specified palette, use colors.forEach() instead of this._colors()
    this._colors.forEach((col, i) => {
      const colorBox = document.createElement("div");
      colorBox.className = "color-box";
      colorBox.textContent = " ";

      colorBox.style.backgroundColor = col;

      colorBox.onclick = function() {
        // Change target's color
        _self._target.forEach(obj => {
          SetObjectColor(obj, col);
        });

        // Set the CurrentColor index and update indicator
        _self._selectedColorIndex = i;
        colorIndicator.style.backgroundColor = col;
      };

      _self._paletteElement.appendChild(colorBox);
    });

    // Append everything to the actual DOM, right after the parent
    parentElement.appendChild(this._paletteElement);

    return this;
  }

  ChangeTarget(target) {
    this._target = target;
  }
}

function GetObjectColor(object) {
  if (Object.keys(object).includes("_objects")) {
    return object._objects[0].get("fill");
  } else {
    // if object is a group, get the color of the first object,
    // not the group (since group's color is always white)
    return Array.isArray(object) ? object[0].get("fill") : object.get("fill");
  }
}

function SetObjectColor(object, newColor) {
  // if the object is a group (SVG, etc.) you'd want to change
  // each single path in the group's color and not just the object
  if (object._objects) {
    object._objects.forEach(object => {
      object.set({ fill: newColor });
    });
  }
  object.set({ fill: newColor });
  canvas.renderAll();
}
