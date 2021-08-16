import UseImage from "../hooks/useImage";
const uploadImage = (
  lImage,
  sImage,
  setProfileImg,
  setGallery,
  setSImage,
  setLImage
) => {
  const api = UseImage();
  const image = lImage;
  const images = sImage;
  if (image) {
    let formData = new FormData();
    formData.append("image", image);
    (async () => {
      await api.Image(formData).then((data) => {
        if (data.status === "success") {
          setProfileImg(data.image);
        }
      });
    })();
  }

  if (images.length !== 0) {
    let formData;
    formData = new FormData();
    images.forEach((el) => {
      formData.append(`images`, el.img);
    });
    (async () => {
      try {
        await api
          .Images(formData)
          .then((d) => setGallery(d.gallery))
          .catch((e) => console.log(e));
      } catch (error) {
        console.log("image error = ", error);
      }
    })();
    setSImage([]);
  }
  setLImage(null);
};

export default uploadImage;
