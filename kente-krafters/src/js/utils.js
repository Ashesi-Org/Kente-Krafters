/**
 * Fetches an object (from cache if existent)
 * @param {String} object Fabric Object to be fetched
 * @param {String} objectType Type of object
 */
async function FetchObject(object, objectType) {
  const { src } = object;
  if (CACHE.hasOwnProperty(src)) {
    // console.log(`Fetching ${src} from Cache`);
    return _CloneObject(CACHE[src]);
  } else {
    switch (objectType) {
      case "stole":
        // console.log("Fetching Stole");
        const objects = await FetchStoleObjects(object);
        CACHE[src] = objects;
        return _CloneObject(CACHE[src]);
      case "symbol":
        // console.log("Fetching Symbol");
        const image = await GetFabricImageFromURL(src);
        CACHE[src] = image;
        return _CloneObject(CACHE[src]);
    }
  }
}

/**
 * Clone the object (needed because user can be switching between options)
 * If you don't clone, when they make a tweak it'll persistent even if user resets
 * @param {Object} object Fabric object to be cloned
 */
async function _CloneObject(object) {
  if (Array.isArray(object)) {
    // console.log("Cloning array of objects");

    const newObjects = await Promise.all(
      object.map(async obj => {
        const contents = await new Promise((resolve, reject) => {
          obj.clone(
            clone => {
              resolve(clone);
            },
            ["TAG"]
          );
        });
        return contents;
      })
    );
    return newObjects;
  } else {
    console.log("Cloning object");
    const clone = await new Promise((resolve, reject) => {
      object.clone(
        clone => {
          resolve(clone);
        },
        ["TAG"]
      );
    });
    return clone;
  }
}

/**
 * Converts a file to dataurl (needed for the logo uploads)
 * @param {File} file file object to be read
 */
function ConvertFileToDataURL(file) {
  /**
   * Converts File / Blob object to base64
   */
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

function GetNumberOfCharacters(string) {
  // We need to count without the newline characters, etc.
  let cleanString = string.replace(/\n|\r/g, "");
  return cleanString.length;
}

function generateReference() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}

function getInputWithID(id) {
  return document.querySelector(`input[id='${id}']`).value;
}

function getInputValueWithName(name) {
  return document.querySelector(`input[name='${name}']`).value;
}
