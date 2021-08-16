const path = require("path");

exports.Image = function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  let file = req.files.image;
  let profile = imageHelper(req, res, file);
  return res.status(200).json({
    status: "success",
    profile,
  });
};

exports.Images = function (req, res) {
  let files;
  let gallery = [];
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  files = req.files.images;
  if (!Array.isArray(files)) {
    let img = imageHelper(req, res, files);
    gallery.push(img);
  }

  if (Array.isArray(files) && files.length > 0) {
    files.forEach((e) => {
      let img = imageHelper(req, res, e);
      gallery.push(img);
    });
    if (gallery.length === files.length) {
      return res.status(200).json({
        status: "success",
        gallery,
      });
    }
  }
};

const imageHelper = (req, res, e) => {
  let image = e.name.split(".")[0];
  let ext = path.extname(e.name);
  let imageName = `${image}-${Date.now()}${ext}`;
  let reqPath = path.join(__dirname, "../../");
  let imgUrl = `/images/${imageName}`;

  let uploadPath = reqPath + "client\\public\\images\\" + imageName;

  e.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);
  });
  return imgUrl;
};
