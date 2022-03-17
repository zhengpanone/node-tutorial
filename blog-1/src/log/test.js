const fs = require("fs");
const path = require("path");

const fileName = path.resolve(__dirname, "data.txt");

fs.readFile(fileName, (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(data.toString());
});
let content = "新写入的内容\n";
const options = {
  flag: "a",
};
fs.writeFile(fileName, content, options, (err) => {
  console.log(err);
  return;
});

fs.exists(fileName, (exists) => {
  console.log(exists);
});
