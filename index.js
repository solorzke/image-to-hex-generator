import getPixels from "get-pixels";
import rgbHex from "rgb-hex";
import fs from "fs";

const colorSwatchPath = "./images";

Object.defineProperty(String.prototype, "capitalize", {
  value: function () {
    return this.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
  },
  enumerable: false,
});

fs.readdir(colorSwatchPath, function (err, files) {
  if (err) {
    console.log(err);
  }

  //Clear everything in colors.txt file
  fs.writeFile("./colors.txt", "", (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });

  //Read each color swatch file from the folder and start generating the hex codes for each
  files.map((file) => {
    const filePath = `${colorSwatchPath}/${file}`;
    const colorName = file
      .replaceAll(".png", "")
      .replaceAll("-", " ")
      .capitalize();

    getPixels(filePath, function (err, pixels) {
      if (err) {
        console.log("Bad image path");
        return;
      }

      let rgba = {
        r: pixels.get(0, 0, 0),
        g: pixels.get(0, 0, 1),
        b: pixels.get(0, 0, 2),
        a: pixels.get(0, 0, 3),
      };

      let hex = rgbHex(`rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, 95%)`);
      console.log(`${colorName}:#${hex}`);

      fs.appendFile("./colors.txt", `${colorName}:#${hex}\n`, (err) => {
        if (err) {
          console.error(err);
        }
      });
    });
  });
});
