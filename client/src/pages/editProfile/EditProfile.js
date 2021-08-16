import React, { useState } from "react";
import Modall from "../../components/modal/Modall";
import ss from "../../Global.module.css";
import UseImage from "../../hooks/useImage";
import s from "./EditProfile.module.css";
function EditProfile({ children }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [lImage, setLImage] = useState(null);
  const [sImage, setSImage] = useState([]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const uploadFileHadler = async (e) => {
    const api = UseImage();
    const image = lImage;
    const images = sImage;
    if (images.length !== 0) {
      images.forEach((el) => {
        (async () => {
          let formData = new FormData();
          formData.append("image", el.img);
          await api.Image(formData).then((d) => console.log("gallery = ", d));
        })();
      });
      setSImage([]);
    }

    if (image) {
      let formData = new FormData();
      formData.append("image", image);
      (async () => {
        await api.Image(formData).then((d) => console.log("profile = ", d));
      })();
    }
    setLImage(null);
  };

  return (
    <div className={`${s.body} ${ss.container}`}>
      <div className={s.form}>
        <div className={s.flex}>
          <p>First Name</p>
          <input type="text" className={s.input_long} />
        </div>
        <div className={s.flex}>
          <p>Last Name</p>
          <input type="text" className={s.input_long} />
        </div>
        <div className={s.flex}>
          <p>City</p>
          <input type="text" className={s.input_long} />
        </div>
        <div className={s.flex}>
          <p>Country</p>
          <input type="text" className={s.input_long} />
        </div>
        <div className={s.flex}>
          <p>Facebook Link</p>
          <input type="text" className={s.input_long} />
        </div>
        <div className={s.flex}>
          <p>Twitter Link</p>
          <input type="text" className={s.input_long} />
        </div>
        <div className={s.flex}>
          <p>Instagram Link</p>
          <input type="text" className={s.input_long} />
        </div>
        <div className={s.flex}>
          <p>Phone Number</p>
          <input type="number" className={s.input_long} />
        </div>
        <div className={s.flex}>
          <p>Date Of Birth</p>
          <input type="number" className={s.input_long} />
        </div>
        <div className={s.flex}>
          <p>Gender</p>
          <select
            name="gender"
            className={s.input_long}
            style={{ width: "104%" }}
          >
            <option>Gender</option>
            <option>male</option>
            <option>female</option>
          </select>
        </div>
        <div className={s.btnContainer}>
          <div className={s.btn} onClick={() => openModal()}>
            <p>Add Images</p>
          </div>
          <div className={s.btn} onClick={uploadFileHadler}>
            <p>Save</p>
          </div>
        </div>
      </div>
      <Modall
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        sImage={sImage}
        setSImage={setSImage}
        lImage={lImage}
        setLImage={setLImage}
      >
        {children}
      </Modall>
    </div>
  );
}

export default EditProfile;
