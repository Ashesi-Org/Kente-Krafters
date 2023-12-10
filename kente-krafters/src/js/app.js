import { fabric } from "fabric";

let PREVIEW_IMAGE = null;
let CHECKOUT = {};
const CACHE = {};

let DEFAULT_COLOR_PALETTE = [
	"#ffffff",
	"#e19326",
	"#2b9948",
	"#df2127",
	"#8a2026",
	"#592d85",
	"#1e1e1e",
];
let DEFAULT_BASE_STOLE_PALETTE = [
	"#d0ac2b",
	"#d96227",
	"#d54756",
	"#e19326",
	"#592d85",
	"#8a2026",
	"#64ccf5",
	"#000",
	"#fff",
];
let DEFAULT_STRIPE_PALETTE = DEFAULT_COLOR_PALETTE;
let DEFAULT_TEXT_PALETTE = DEFAULT_COLOR_PALETTE;
let DEFAULT_SYMBOLS_PALETTE = DEFAULT_COLOR_PALETTE;

const REGEX_DATA_URL =
	/^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;
const EXTRACTOR_REGEX_BASE = /base-stole/;
const EXTRACTOR_REGEX_STRIPE = /stripe-\d/;
const EXTRACTOR_SYMBOL = /symbol-(?:left|right)/;
const EXTRACTOR_TAG = new RegExp(
	`${EXTRACTOR_REGEX_BASE.source}|${EXTRACTOR_REGEX_STRIPE.source}|${EXTRACTOR_SYMBOL.source}`
);

const STOLES = [stole1, stole3, stole4, stole5, stole9];

const AVAILABLE_SYMBOLS = {
	asset15: "./assets/adinkra-symbols/asset15.svg",
	friendship: "./assets/adinkra-symbols/friendship.svg",
	heroism: "./assets/adinkra-symbols/heroism.svg",
	leadership: "./assets/adinkra-symbols/leadership.svg",
	love: "./assets/adinkra-symbols/love.svg",
	prosperity: "./assets/adinkra-symbols/prosperity.svg",
	quality: "./assets/adinkra-symbols/quality.svg",
	royalty: "./assets/adinkra-symbols/royalty.svg",
	standards: "./assets/adinkra-symbols/standards.svg",
	wisdom: "./assets/adinkra-symbols/wisdom.svg",
};

const DEFAULT_TEXT_LENGTH_LIMIT = 7;

let canvas = new fabric.Canvas("stole-canvas");
canvas.setBackgroundColor("#ffedd6");
canvas.selection = false; // Disable selection of many objects altogether

/**
 * Loads the stoles into memory
 * @param {Array} stoles An array of stole objects
 */
function SetupStoleMenu(stoles) {
	const stolesContainer = document.getElementById("container-stoles");
	stolesContainer.innerHTML = "";

	// Loop through array of stoles
	stoles.forEach((stole, index) => {
		// Create thumbnail for each of them
		const img = document.createElement("img");
		img.src = stole["src"];
		img.className = "thumbnail";
		img.onclick = function () {
			InitializeStole(stoles, index);
		};
		stolesContainer.appendChild(img);
	});
}
/**
 * Reads a Stole object and sets the canvas zoom so it fits nicely
 * Loads parts of SVG into group -> Zooms canvas to fit the group -> Break up group -> Copy tags from old to new
 * @param {Object} stole The stole object
 * @returns {Array} An array of newly-created objects
 */
async function FetchStoleObjects(stole) {
	// Group all objects
	// console.log("Reading Objects from SVG into groups");
	const { group, originalObjects } = await new Promise((resolve, reject) => {
		fabric.loadSVGFromURL(
			stole.src,
			(objects) => {
				let group = new fabric.Group(objects);
				if (group.isEmpty()) {
					reject(
						new Error(`Object '${stole.src}' is not a valid SVG`)
					);
				}
				resolve({ group, originalObjects: objects });
			},
			(item, object) => {
				object.set("class", item.getAttribute("class"));
			}
		);
	});

	canvas.add(group);
	group.center();

	// Zoom to fit the group in canvas
	let centrePoint = new fabric.Point(canvas.width / 2, canvas.height / 2);
	let zoomLevel = canvas.height / group.height - 0.2;
	canvas.zoomToPoint(centrePoint, zoomLevel);

	// Break the group back into objects
	const objects = group._objects;
	group._restoreObjectsState();
	canvas.remove(group);

	// Copy tag information from old objects in SVG to new objects
	objects.forEach((object, index) => {
		// Extract the "correct" tag from the original object
		const originalObject = originalObjects[index];

		if (originalObject.class) {
			let extractedTag = originalObject.class.match(EXTRACTOR_TAG);
			if (extractedTag) {
				object.set("TAG", extractedTag[0]);
			}
		}
	});

	return objects;
}

/**
 * Groups the various objects into sections, loads them into the canvas, and returns a map
 * @param {Object} stole The stole object
 * @param {Array} objects The objects generated from loading the stole SVG
 * @returns {Object} Map (dict) of parts of the stole and the actual canvas objects
 */
async function CreateStoleMap(stole, objects) {
	// Inititalize stole map
	const stoleMap = {
		"base-stole": [],
		stripes: {},
		text: {
			left: {},
			right: {},
		},
		symbols: [],
	};

	// Add objects to the canvas
	objects.forEach((object) => {
		// Link the object to the stoleMap if it has a tag
		let objectTag = object.get("TAG");
		if (objectTag) {
			if (objectTag === "base-stole") {
				stoleMap["base-stole"].push(object);
			} else if (objectTag.includes("stripe")) {
				if (objectTag in stoleMap["stripes"]) {
					stoleMap["stripes"][objectTag].push(object);
				} else {
					stoleMap["stripes"][objectTag] = [object];
				}
			} else if (objectTag.includes("symbol")) {
				// Some symbols are made of multiple objects, separate them
				const symbolTag = objectTag.split("-")[1];
				if (symbolTag in stoleMap["symbols"]) {
					stoleMap["symbols"][symbolTag].push(object);
				} else {
					stoleMap["symbols"][symbolTag] = [object];
				}
			}
		}

		// Lock all objects to prevent selection and movement
		LockObject(object);
		canvas.add(object);
	});

	// Add text to the canvas (if stole has text, else create blank objects)
	if (stole.text.left) {
		const textLeft = CreateTextObject(
			stole.text.left.text,
			stole.text.left.options
		);
		stoleMap["text"]["left"] = textLeft;
		canvas.add(textLeft);
	}

	if (stole.text.right) {
		const textRight = CreateTextObject(
			stole.text.right.text,
			stole.text.right.options
		);
		stoleMap["text"]["right"] = textRight;
		canvas.add(textRight);
	}

	// Change the objects which are arrays into groups eg. symbols which happen to more than one component
	// e.g. for symbols, loop through each type and combine the array into one group
	const newSymbols = [];
	Object.keys(stoleMap["symbols"]).forEach((key) => {
		// remove the old version of the symbol (array of parts)
		stoleMap["symbols"][key].forEach((part) => {
			canvas.remove(part);
		});

		// insert new version replacement of the symbol (group)
		const replacement = new fabric.Group(stoleMap["symbols"][key]);
		LockObject(replacement);
		canvas.add(replacement);

		newSymbols.push(replacement);

		// Temporarily set the anchor
	});
	stoleMap["symbols"] = newSymbols;

	return stoleMap;
}

/**
 * Creates a checkout map which will be used in calculating costs
 * @param {Object} stole The stole object
 * @returns {Object} Map of parts of stole and their respective pricings / limits
 */
function CreateCheckoutMap(stole) {
	let limitNumCharsLeft = DEFAULT_TEXT_LENGTH_LIMIT;
	let limitNumCharsRight = DEFAULT_TEXT_LENGTH_LIMIT;

	if ("text" in stole) {
		if ("left" in stole["text"]) {
			if (stole["text"]["left"] !== undefined) {
				limitNumCharsLeft = GetNumberOfCharacters(
					stole["text"]["left"]["text"]
				);
			}
		}
		if ("right" in stole["text"]) {
			if (stole["text"]["right"] !== undefined) {
				limitNumCharsRight = GetNumberOfCharacters(
					stole["text"]["right"]["text"]
				);
			}
		}
	}

	const checkoutMap = {
		base: stole.price,
		text: {
			left: {
				base: limitNumCharsLeft,
				unit: 2,
			},
			right: {
				base: limitNumCharsRight,
				unit: 2,
			},
		},
	};

	return checkoutMap;
}

/**
 *
 * @param {String} text The text content of the text node
 * @param {Object} options Configurations for the text
 * @returns Fabric Text object
 */
function CreateTextObject(text, options) {
	const formattedText = FormatText(text, options.orientation);

	const textObject = new fabric.Text(formattedText, {
		fontSize: 20,
		textAlign: "center",
		fontWeight: options.fontWeight || "normal",
		lineHeight: 1.0,
		fill: options.color || "black",
	});

	// if position is provided in options, set it else use center of canvas
	if (options.position) {
		const position = options.position.split(",");
		textObject.top = parseFloat(position[0].trim());
		textObject.left = parseFloat(position[1].trim());
	} else {
		canvas.add(textObject);
		textObject.center();
		canvas.remove(textObject);
	}

	return textObject;
}

/**
 * Generates the menu UI
 * @param {Object} stoleMap The stole object
 * @param {Object} checkoutMap Map (dict) of parts of the stole and the actual canvas objects
 */
async function SetupUI(stoleMap, checkoutMap, stole) {
	// Show Background Menu
	const backgroundMenu = document.getElementById("container-stole-colors");
	const baseColorPalette = new ColorPalette(
		"base",
		DEFAULT_BASE_STOLE_PALETTE,
		stoleMap["base-stole"],
		backgroundMenu
	);

	// Show Stripe Menu
	const stripesContainer = document.getElementById("container-stripe-colors");
	stripesContainer.innerHTML = "";
	const stripes = stoleMap["stripes"];
	Object.keys(stripes).forEach((layer, index) => {
		const layerHeader = document.createElement("p");
		const layerName = `Layer ${index + 1}`;
		layerHeader.textContent = layerName;
		stripesContainer.appendChild(layerHeader);
		const stripeColorPalette = new ColorPalette(
			layerName,
			DEFAULT_STRIPE_PALETTE,
			stoleMap["stripes"][layer],
			stripesContainer
		);
	});

	// Show Symbols Menu
	const symbolsContainer = document.getElementById(
		"container-symbols-adinkra"
	);
	symbolsContainer.innerHTML = "";

	let symbolsPalette;

	Object.keys(AVAILABLE_SYMBOLS).forEach((key) => {
		const symbol = document.createElement("div");
		symbol.className = "symbol";

		const img = document.createElement("img");
		img.src = AVAILABLE_SYMBOLS[key];
		img.className = "thumbnail";
		img.onclick = async function () {
			document.getElementById("logo").value = "";
			for (let i = 0; i < stoleMap["symbols"].length; i++) {
				const symbol = stoleMap["symbols"][i];

				// Load the image
				const image = await CreateImage(img.src, symbol);

				console.log("Adding symbol");
				canvas.remove(symbol);

				LockObject(image);
				stoleMap["symbols"][i] = image;
				canvas.add(stoleMap["symbols"][i]);
			}

			// Reset the target for the color palette
			symbolsPalette.ChangeTarget(stoleMap["symbols"]);
		};

		const label = document.createElement("p");
		label.textContent = key;

		symbol.appendChild(img);
		symbol.appendChild(label);

		symbolsContainer.appendChild(symbol);
	});

	symbolsPalette = new ColorPalette(
		"symbol",
		DEFAULT_SYMBOLS_PALETTE,
		stoleMap["symbols"],
		symbolsContainer
	);

	// Show Countries Menu
	const countriesContainer = document.getElementById(
		"container-symbols-flag"
	);
	countriesContainer.innerHTML = "";

	Object.keys(AVAILABLE_COUNTRIES).forEach((countryName) => {
		const country = document.createElement("div");
		country.className = "symbol";

		const img = document.createElement("img");
		img.src = AVAILABLE_COUNTRIES[countryName];
		img.className = "thumbnail";
		img.onclick = async function () {
			for (let i = 0; i < stoleMap["symbols"].length; i++) {
				const symbol = stoleMap["symbols"][i];
				const image = await CreateImage(img.src, symbol, true);
				// console.log(image.get("fill"));
				// console.log("Adding countries");
				canvas.remove(symbol);

				// Scale the image so it isn't too bloated
				const ratio = 100 / image.width / 2;
				image.set({ scaleX: ratio, scaleY: ratio });

				const top =
					symbol.getCenterPoint().y - image.getScaledHeight() / 2;
				const left =
					symbol.getCenterPoint().x - image.getScaledWidth() / 2;

				image.set({ top, left });

				// Set constraints
				LockObject(image);
				_SetObjectConstraints(image, "scalable");

				LockObject(image);
				stoleMap["symbols"][i] = image;
				canvas.add(stoleMap["symbols"][i]);
			}
		};

		const label = document.createElement("p");
		label.textContent = countryName;

		country.appendChild(img);
		country.appendChild(label);

		countriesContainer.appendChild(country);
	});

	// Show Text Menu
	// Set text nodes to undefined if they're non-existent. Makes it easier to check
	const leftTextMenu = document.getElementById("text-left-menu");
	if (stoleMap["text"]["left"]) {
		// console.log(stoleMap["text"]["left"]);
		let leftPalette = new ColorPalette(
			"text-left",
			DEFAULT_TEXT_PALETTE,
			[stoleMap["text"]["left"]],
			leftTextMenu
		);
	}

	const rightTextMenu = document.getElementById("text-right-menu");
	if (stoleMap["text"]["right"]) {
		// console.log(stoleMap["text"]["right"]);
		let rightPalette = new ColorPalette(
			"text-right",
			DEFAULT_TEXT_PALETTE,
			[stoleMap["text"]["right"]],
			rightTextMenu
		);
	}

	document.getElementById("text-left").value = stole["text"]["left"]["text"];
	document.getElementById("text-right").value =
		stole["text"]["right"]["text"];

	document.getElementById("check-vertical-left").checked =
		stole["text"]["left"]["options"]["orientation"] == "vertical"
			? true
			: false;

	document.getElementById("check-vertical-right").checked =
		stole["text"]["right"]["options"]["orientation"] == "vertical"
			? true
			: false;

	document.getElementById("text-left").oninput = function (event) {
		HandleTextInputChange(event, stoleMap["text"]["left"]);
		UpdatePricing(checkoutMap);
	};
	document.getElementById("text-right").oninput = function (event) {
		HandleTextInputChange(event, stoleMap["text"]["right"]);
		UpdatePricing(checkoutMap);
	};

	document.getElementById("check-vertical-left").onclick = function (event) {
		HandleOrientationChecked(event, stoleMap["text"]["left"]);
	};
	document.getElementById("check-vertical-right").onclick = function (event) {
		HandleOrientationChecked(event, stoleMap["text"]["right"]);
	};

	// Show Logo Menu
	document.getElementById("logo").onchange = async function (event) {
		// console.log(stoleMap["symbols"][0]);

		let newSymbols = await HandleLogoChange(event, stoleMap["symbols"]);
		if (newSymbols) {
			stoleMap["symbols"] = newSymbols;
			// console.log(`${stoleMap["symbols"][0].top},${stoleMap["symbols"][0].left} `);
		}
	};

	UpdatePricing(checkoutMap);
	CHECKOUT = checkoutMap;
}

function ApplyDiscount(basePrice, quantity) {
	// console.log(quantity);
	if (quantity < 50) {
		return basePrice;
	} else if (quantity >= 50 && quantity <= 124) {
		return 19;
	} else if (quantity >= 125 && quantity <= 249) {
		return 16.45;
	} else if (quantity >= 250 && quantity <= 499) {
		return 15.45;
	} else {
		return 14.45;
	}
}

function GetPricing(checkoutMap, quantity = 1) {
	console.log(
		`Getting Pricing for ${quantity} items: ${ApplyDiscount(
			checkoutMap.base,
			quantity
		)}`
	);
	let total = 0;

	const pricing = {
		base: ApplyDiscount(checkoutMap.base, quantity),
		customizations: 0,
		total,
	};

	if (checkoutMap.text) {
		const currentLeft = GetNumberOfCharacters(
			document.getElementById("text-left").value
		);
		const extraTextLeft = currentLeft - checkoutMap.text.left.base;
		const costLeft =
			checkoutMap.text.left.unit *
			(extraTextLeft > 0 ? extraTextLeft : 0);
		pricing["customizations"] += costLeft;
		total += costLeft;

		const currentRight = GetNumberOfCharacters(
			document.getElementById("text-right").value
		);
		const extraTextRight = currentRight - checkoutMap.text.right.base;
		const costRight =
			checkoutMap.text.right.unit *
			(extraTextRight > 0 ? extraTextRight : 0);
		pricing["customizations"] += costRight;
		total += costRight;
	}

	total += pricing.base;
	pricing["total"] = total;
	return pricing;
}

function UpdatePricing(checkoutMap) {
	const pricing = GetPricing(checkoutMap);
	document.getElementById("stole-price").textContent =
		"$ " + pricing["total"].toString();
}

async function HandleLogoChange(event, stoleSymbolsNode) {
	let imageFile = event.currentTarget.files[0];

	if (imageFile) {
		const image64 = await ConvertFileToDataURL(imageFile);
		const imageObject = await GetFabricImageFromURL(image64);

		// When logo is uploaded change all the symbols
		for (let i = 0; i < stoleSymbolsNode.length; i++) {
			// Remove the symbols
			const symbol = stoleSymbolsNode[i];
			console.log();

			console.log("\nBefore");
			console.log(`Top: ${symbol.top}`);
			// console.log(`Height: ${symbol.height}`);
			// console.log(`Left: ${symbol.left}`);
			// console.log(`Width: ${symbol.width}`);

			canvas.remove(symbol);

			// Insert the clone at that position
			const image = await new Promise((resolve, reject) => {
				imageObject.clone((clone) => {
					resolve(clone);
				});
			});

			// Scale the image so it isn't too bloated
			const ratio = 100 / image.width / 2;
			image.set({ scaleX: ratio, scaleY: ratio });

			const top = symbol.getCenterPoint().y - image.getScaledHeight() / 2;
			const left = symbol.getCenterPoint().x - image.getScaledWidth() / 2;

			image.set({ top, left });

			// Set constraints
			LockObject(image);
			_SetObjectConstraints(image, "scalable");

			stoleSymbolsNode[i] = image;
			canvas.add(stoleSymbolsNode[i]);
		}

		return stoleSymbolsNode;
	}
}

function HandleOrientationChecked(event, stoleMapTextNode) {
	const position = event.currentTarget.id.split("-")[2];
	const isVertical = event.currentTarget.checked;
	const orientation = isVertical ? "vertical" : "horizontal";
	const text = document.getElementById(`text-${position}`).value;
	const formattedText = FormatText(text, orientation);
	stoleMapTextNode.set("text", formattedText);
	canvas.renderAll();
}

function HandleTextInputChange(event, stoleMapTextNode) {
	const position = event.currentTarget.id.split("-")[1];

	const isVertical = document.getElementById(
		`check-vertical-${position}`
	).checked;
	const orientation = isVertical ? "vertical" : "horizontal";

	const text = event.currentTarget.value;

	// If there's no existing text node then create a new text object
	if (
		Object.entries(stoleMapTextNode).length === 0 &&
		stoleMapTextNode.constructor === Object
	) {
		const textObject = CreateTextObject(text, { orientation });
		stoleMapTextNode = textObject;
		// create a new palette
		const textMenu = document.getElementById(`${position}-text-menu`);
		const colorPalette = new ColorPalette(
			`text-${position}`,
			DEFAULT_TEXT_PALETTE,
			[stoleMapTextNode],
			textMenu
		);
	} else {
		const formattedText = FormatText(text, orientation);
		stoleMapTextNode.set("text", formattedText);
	}
	canvas.renderAll();
}

async function CreateImage(newSource, symbol, preserveSize = false) {
	let width = 20;
	let height = 20;
	const top = symbol.getCenterPoint().y - height / 2;
	const left = symbol.getCenterPoint().x - width / 2;
	const fill = symbol._objects
		? symbol._objects[0].get("fill")
		: symbol.get("fill");
	const imageObject = await FetchObject({ src: newSource }, "symbol");
	// const imageObject = await GetFabricImageFromURL(newSource);
	if (preserveSize) {
		width = imageObject.width;
		height = imageObject.height;
	}
	imageObject.set({ top, left, width, height });
	SetObjectColor(imageObject, fill);
	return imageObject;
}

/**
 * Restricts an objects movements, selection and rotation
 * @param {Object} object The Object to Lock
 */
function LockObject(object) {
	object.lockMovementX = true;
	object.lockMovementY = true;
	object.lockScalingX = true;
	object.lockScalingY = true;
	object.lockUniScaling = true;
	object.lockRotation = true;
	object.hasBorders = false;
	object.hasControls = false;
	object.selectable = false;
}

/**
 * Sets object constraints for movement and selection
 * @param {Object} object The object to apply restrictions
 */
function _SetObjectConstraints(object, constraintType) {
	switch (constraintType) {
		case "selectable":
			object.hasControls = true;
			object.transparentCorners = false;
			object.selectable = true;
		case "selectable-resizable":
			object.hasControls = true;
			object.selectable = true;
			object.transparentCorners = false;
			object.lockScalingX = false;
			object.lockScalingY = false;
		case "scalable":
			object.hasControls = true;
			object.selectable = true;
			object.lockScalingX = false;
			object.lockScalingY = false;
	}
}

function FormatText(inputText, orientation) {
	let text = "";
	for (let i = 0; i < inputText.length; i++) {
		text += inputText[i] + (orientation == "vertical" ? "\n" : "");
	}
	return text;
}

function getExtensionFromURL(theURL) {
	if (!!theURL.match(REGEX_DATA_URL)) {
		// if the URL is a theURL (base64)
		var result = null;

		if (typeof theURL !== "string") {
			return result;
		}

		var mime = theURL.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

		if (mime && mime.length) {
			result = mime[1].split("/")[1];
		}

		return result == "svg+xml" ? "svg" : result;
	} else {
		// if the URL is a normal url
		return theURL.split(/\#|\?/)[0].split(".").pop().trim();
	}
}

async function GetFabricImageFromURL(image_src) {
	return new Promise((resolve, reject) => {
		// If its an SVG you should rather use pathgroups
		const ext = getExtensionFromURL(image_src);

		if (ext == "svg") {
			fabric.loadSVGFromURL(image_src, function (objects) {
				resolve(new fabric.Group(objects));
			});
		} else {
			fabric.Image.fromURL(image_src, function (img) {
				resolve(img);
			});
		}
	});
}

async function InitializeStole(stoles, selectedStoleIndex) {
	ClearPlayground();
	const selectedStole = stoles[selectedStoleIndex];
	const { stoleMap, checkoutMap } = await LoadStole(selectedStole);
	SetupUI(stoleMap, checkoutMap, selectedStole);
}

async function LoadStole(selectedStole) {
	const objects = await FetchObject(selectedStole, "stole");
	const stoleMap = await CreateStoleMap(selectedStole, objects);
	const checkoutMap = await CreateCheckoutMap(selectedStole);
	return { objects, stoleMap, checkoutMap };
}

function ClearPlayground() {
	canvas.clear();
	canvas.setBackgroundColor("#ffedd6");
}

async function init() {
	SetupStoleMenu(STOLES);

	// Load all the stoles into cache, asynchronously
	STOLES.forEach((stole) => {
		FetchObject(stole, "stole");
	});

	// Using an array and index because when stole is switched, it is cleared
	// passing the stole directory to the function below means when another
	// stole is selected, it is cleared off the screen.
	const chosenStoleIndex = 0;
	await InitializeStole(STOLES, chosenStoleIndex);
}

init();
