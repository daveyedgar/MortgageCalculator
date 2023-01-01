const fs = require("fs");
const replace = require("replace-in-file");

// create dist directory
if (!fs.existsSync("dist")) {
  fs.mkdirSync("dist", (error) => {
    console.log("==> directory created");
    if (error) {
      console.log(error);
    }
  });
} else {
  console.log("==> Directory already exists");
}

// create the dist/index.file if not already there
if (!fs.existsSync("dist/index.html")) {
  fs.writeFileSync("dist/index.html", "blank file", (error) => {
    console.log("==> index.html created");
    if (error) {
      console.log(error);
    }
  });
} else {
  console.log("==> index.html already exists");
}

// copy the source index.html to the dist folder
fs.copyFile("src/index.html", "dist/index.html", (err) => {
  if (err) {
    console.log("Error Found:", err);
  }
  console.log("==> Index file contents copied");
});

// get list of files in src directory that start with "_"(underscore) which are the partial files
fs.readdir("./src/", (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach((file) => {
      if (file.startsWith("_")) {

        // get the contents of the partial file and put it in a variable
        console.log("==> Filename: " + file);
        fs.readFile("./src/" + file, (err, data) => {
          if (err) throw err;
          textData = data.toString();
          // console.log("==> File contents: " + textData);

          // replace the placeholder text in the index.html file with the content from partial file
          const options = {
            files: "dist/index.html",
            from: file,
            to: textData,
          };

          try {
            const results = replace.sync(options);
            console.log("==> Replacement results:", results);
          } catch (error) {
            console.error("==> Error occurred:", error);
          }
        });
      }
    });
  }
});
