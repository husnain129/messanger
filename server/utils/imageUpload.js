const path = require("path");

exports.Image = function (req, res) {
  let file;
  let name;
  let ext;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // The name of the input field (i.e. "file") is used to retrieve the uploaded file
  file = req.files.image;
  name = file.name.split(".")[0];
  ext = path.extname(file.name);
  let image = `${name}-${Date.now()}${ext}`;
  let reqPath = path.join(__dirname, "../../");
  let uploadPath = reqPath + "client\\public\\images\\" + image;
  console.log(uploadPath);
  let imgUrl = `/images/${image}`;
  //   Use the mv() method to place the file somewhere on your server
  file.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);
    return res.status(200).send({
      status: "success",
      image: imgUrl,
    });
  });
};
