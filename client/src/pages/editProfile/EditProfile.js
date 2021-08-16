import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Modall from "../../components/modal/Modall";
import ss from "../../Global.module.css";
import useAuth from "../../hooks/useAuth";
import UseImage from "../../hooks/useImage";
import s from "./EditProfile.module.css";

function EditProfile({ children }) {
  const api = useAuth();
  const history = useHistory();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [lImage, setLImage] = useState(null);
  const [sImage, setSImage] = useState([]);
  const [gallery, setGallery] = useState();
  const [profileImg, setProfileImg] = useState();
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    city: "",
    country: "",
    faceBook: "",
    twitter: "",
    gitHub: "",
    phone: "",
    dob: "",
    gender: "",
  });

  const {
    firstName,
    lastName,
    city,
    country,
    faceBook,
    twitter,
    gitHub,
    phone,
    dob,
    gender,
  } = profile;

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const uploadFileHadler = async () => {
    const api = UseImage();
    const image = lImage;
    const images = sImage;

    if (image) {
      let formData = new FormData();
      formData.append("image", image);
      (async () => {
        await api.Image(formData).then((data) => {
          if (data.status === "success") {
            setProfileImg(data.profile);
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
      setSImage();
    }
    setLImage(null);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    (async () => {
      await api
        .updateProfile({ ...profile, gallery, image: profileImg })
        .then((d) => {
          d.status === "success" && history.push("/");
        });
    })();
  };

  return (
    <div className={`${s.body} ${ss.container}`}>
      <div className={s.form}>
        <div className={s.flex}>
          <p>First Name</p>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleChange}
            className={s.input_long}
          />
        </div>
        <div className={s.flex}>
          <p>Last Name</p>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleChange}
            className={s.input_long}
          />
        </div>
        <div className={s.flex}>
          <p>City</p>
          <input
            type="text"
            name="city"
            value={city}
            onChange={handleChange}
            className={s.input_long}
          />
        </div>
        <div className={s.flex}>
          <p>Country</p>
          <input
            type="text"
            name="country"
            value={country}
            onChange={handleChange}
            className={s.input_long}
          />
        </div>
        <div className={s.flex}>
          <p>Facebook Link</p>
          <input
            type="text"
            name="faceBook"
            value={faceBook}
            onChange={handleChange}
            className={s.input_long}
          />
        </div>
        <div className={s.flex}>
          <p>Twitter Link</p>
          <input
            type="text"
            name="twitter"
            value={twitter}
            onChange={handleChange}
            className={s.input_long}
          />
        </div>
        <div className={s.flex}>
          <p>Instagram Link</p>
          <input
            type="text"
            name="gitHub"
            value={gitHub}
            onChange={handleChange}
            className={s.input_long}
          />
        </div>
        <div className={s.flex}>
          <p>Phone Number</p>
          <input
            type="text"
            name="phone"
            value={phone}
            onChange={handleChange}
            className={s.input_long}
          />
        </div>
        <div className={s.flex}>
          <p>Date Of Birth</p>
          <input
            type="text"
            name="dob"
            value={dob}
            onChange={handleChange}
            className={s.input_long}
          />
        </div>
        <div className={s.flex}>
          <p>Gender</p>
          <select
            name="gender"
            value={gender}
            onChange={handleChange}
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
          <div className={s.btn} onClick={handleSubmit}>
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
        uploadFileHadler={uploadFileHadler}
      >
        {children}
      </Modall>
    </div>
  );
}

export default EditProfile;
