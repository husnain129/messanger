import React from "react";
import { BiImageAdd } from "react-icons/bi";
import { BsFillTrash2Fill } from "react-icons/bs";
import Modal from "react-modal";
import { v4 as uuidv4 } from "uuid";
import s from "./Modall.module.css";
Modal.setAppElement("#root");
function Modall({
  modalIsOpen,
  closeModal,
  children,
  sImage,
  setSImage,
  lImage,
  setLImage,
}) {
  const customStyles = {
    content: {
      top: "50%",
      zIndex: "10",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "70vw",
      height: "70vh",
      outline: "none",
      border: "none",
      borderRadius: "5px",
      position: "absolute",
      scrollBar: "none",
      boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 20px rgba(0,0,0,0.23)",
    },
  };
  const imageLarge = (e) => {
    var img = e.target.files[0];
    setLImage(img);
  };
  const imageSmall = (e) => {
    var img = e.target.files[0];

    setSImage([
      ...sImage,
      {
        id: uuidv4(),
        img,
      },
    ]);
  };

  const imageFilter = (i) => {
    setSImage(sImage.filter((_v, _i) => _i !== i));
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className={s.modalContainer}>
        <div className={s.modal_header}>
          <p className={s.modal_text}>Add Images</p>
        </div>
        <div className={s.modal_body}>
          <div className={s.modal_bl}>
            <p className={s.modal_text}>Product Profile Image</p>
            <label
              for="profileImage"
              className={s.bl_image}
              style={{ border: lImage && "none" }}
            >
              {lImage === null && (
                <>
                  <BiImageAdd size={30} color="rgb(102, 100, 100)" />
                  <p>Drop your image</p>
                </>
              )}
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                style={{ display: "none" }}
                onChange={imageLarge}
              />
              {lImage && (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={URL.createObjectURL(lImage)}
                    alt="car"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
            </label>
          </div>
          <div className={s.modal_br}>
            {sImage.map((v, i) => (
              <div key={i} className={s.update_small_img}>
                <img
                  src={URL.createObjectURL(v.img)}
                  alt="car"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div className={s.update_icon}>
                  <BsFillTrash2Fill
                    color="white"
                    size={25}
                    style={{ cursor: "pointer" }}
                    onClick={() => imageFilter(i)}
                  />
                </div>
              </div>
            ))}
            <label for="smallImage" className={s.br_image}>
              <BiImageAdd size={30} color="rgb(102, 100, 100)" />
              <input
                type="file"
                id="smallImage"
                style={{ display: "none" }}
                onChange={imageSmall}
              />
            </label>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default Modall;
