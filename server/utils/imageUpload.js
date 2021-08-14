const path = require("path");

exports.Image = function (req, res) {
  let file;
  let name;
  let ext;
  let uploadPath;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // The name of the input field (i.e. "file") is used to retrieve the uploaded file
  file = req.files.image;
  name = req.files.image.name.split(".")[0];
  ext = path.extname(req.files.image.name);
  let image = `${name}-${Date.now()}${ext}`;
  let reqPath = path.join(__dirname, "../../");
  uploadPath = reqPath + "uploads\\" + image;

  //   Use the mv() method to place the file somewhere on your server
  file.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);
    res.send("File uploaded!");
  });
};
