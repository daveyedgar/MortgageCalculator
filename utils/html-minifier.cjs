var minify = require('html-minifier').minify;
const fs = require("fs");

var filename = './dist/index.html';

// minify the html code
fs.readFile(filename, function (err, data) {
  if (err) return console.error(err);
  var result = minify(data.toString(), {
    removeAttributeQuotes: false,
    collapseWhitespace: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
  });
  // console.log(result);

  
    fs.writeFileSync("dist/index.html", result, (error) => {
      console.log("==> index.html created");
      if (error) {
        console.log(error);
      }
    });
});
