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
    return res.status(200).json({
      status: "success",
      image: imgUrl,
    });
  });
};

exports.Images = function (req, res) {
  let files;
  let gallery = [];
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  files = req.files.images;
  files.forEach((e) => {
    let image = e.name.split(".")[0];
    let ext = path.extname(e.name);
    let imageName = `${image}-${Date.now()}${ext}`;
    let reqPath = path.join(__dirname, "../../");
    let imgUrl = `/images/${imageName}`;

    let uploadPath = reqPath + "client\\public\\images\\" + imageName;

    e.mv(uploadPath, function (err) {
      if (err) return res.status(500).send(err);
    });
    gallery.push(imgUrl);
  });

  if (gallery.length === files.length) {
    console.log("gallery = ", gallery);
    return res.status(200).json({
      status: "success",
      gallery,
    });
  }
};
