// FabricCustomizer.js

import React, { useState, useEffect } from 'react';

const FabricCustomizer = () => {
  const [selectedPixel, setSelectedPixel] = useState('');
  const [finalDataDict, setFinalDataDict] = useState({});
  const canvasRef = React.createRef();
  const colorPickerRef = React.createRef();

  useEffect(() => {
    // Fetching and decoding the textile template
    fetch('/getData')
      .then(response => response.json())
      .then(newDataDictionary => {
        // Assessing the textile data
        const updatedFinalDataDict = {};
        Object.keys(newDataDictionary).forEach(rgb => {
          const color = rgb.split(',').map(Number);
          const points = newDataDictionary[rgb];
          points.forEach(point => {
            const [x, y] = point;
            const hexCode = rgbToHex(color[0], color[1], color[2]);
            const coordinatesString = `${y},${x}`;
            updatedFinalDataDict[coordinatesString] = hexCode;
          });
        });
        setFinalDataDict(updatedFinalDataDict);
        drawTextile(updatedFinalDataDict);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const drawTextile = colordict => {
    const ctx = canvasRef.current.getContext('2d');
    for (const coord in colordict) {
      const squareSize = 1;
      if (colordict.hasOwnProperty(coord)) {
        const color = colordict[coord];
        const [x, y] = coord.split(',').map(Number);
        ctx.fillStyle = color;
        ctx.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
        ctx.save();
      }
    }
  };

  const rgbToHex = (r, g, b) => {
    const toHex = value => {
      const hex = value.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    const redHex = toHex(r);
    const greenHex = toHex(g);
    const blueHex = toHex(b);
    return '#' + redHex + greenHex + blueHex;
  };

  const recolorAll = (coordinate, selectedColor) => {
    let oldColor = finalDataDict[coordinate];
    console.log('This is old color' + oldColor);
    const updatedFinalDataDict = { ...finalDataDict };
    for (const key in updatedFinalDataDict) {
      if (updatedFinalDataDict.hasOwnProperty(key)) {
        if (updatedFinalDataDict[key] === oldColor) {
          updatedFinalDataDict[key] = selectedColor;
        }
      }
    }
    setFinalDataDict(updatedFinalDataDict);
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    drawTextile(updatedFinalDataDict);
  };

  const handleColorChange = () => {
    const selectedColor = colorPickerRef.current.value;
    recolorAll(selectedPixel, selectedColor);
  };

  const handleCanvasClick = event => {
    const x = event.clientX - canvasRef.current.getBoundingClientRect().left;
    const y = event.clientY - canvasRef.current.getBoundingClientRect().top;
    const clickedCoordinates = [y, x];
    setSelectedPixel(clickedCoordinates);
  };

  const addToCart = () => {
    const canvas = canvasRef.current;
    const imageDataURL = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = imageDataURL;
    downloadLink.download = 'canvas_image.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="wrapper">
      <input
        type="color"
        id="colorPicker"
        value="#000000"
        ref={colorPickerRef}
        onChange={handleColorChange}
      />
      <div className="wrapper">
        <canvas
          id="myCanvas"
          width="400"
          height="400"
          style={{ border: '1px solid #ccc' }}
          ref={canvasRef}
          onClick={handleCanvasClick}
        ></canvas>
      </div>
      <button id="addToCartButton" onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
};

export default FabricCustomizer;
