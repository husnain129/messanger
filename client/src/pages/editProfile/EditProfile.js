import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import ss from "../../Global.module.css";
import useAuth from "../../hooks/useAuth";
import {
  clearState,
  profileSelector,
  updateProfile,
} from "../../redux/ProfileSlice";
import s from "./EditProfile.module.css";
function EditProfile({ children }) {
  const { profile, isSuccess, isError, errorMessage } =
    useSelector(profileSelector);
  const dispatch = useDispatch();
  const api = useAuth();
  const url = "https://api.cloudinary.com/v1_1/hunnykhan/image/upload";

  const history = useHistory();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [lImage, setLImage] = useState(null);
  const [sImage, setSImage] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [profileImg, setProfileImg] = useState();
  const [profileData, setProfile] = useState({
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
  } = profileData;

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const uploadFileHadler = async () => {
    const image = lImage;
    const images = sImage;

    if (image) {
      let formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "messenger_application");
      try {
        axios.post(url, formData).then((res) => {
          setProfileImg(res.data.secure_url);
        });
      } catch (error) {
        console.log(error);
      }
    }

    if (images.length !== 0) {
      let formData;
      formData = new FormData();
      images.forEach(async (el) => {
        formData.append("file", el.img);
        formData.append("upload_preset", "messenger_application");
        (async () => {
          try {
            axios.post(url, formData).then((res) => {
              setGallery((prev) => [...prev, res.data.secure_url]);
            });
          } catch (error) {
            console.log(error);
          }
        })();
      });

      setSImage();
    }
    setLImage(null);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = () => {
  //   (async () => {
  //     await api
  //       .updateProfile({ ...profileData, gallery, image: profileImg })
  //       .then((d) => {
  //         d?.status === "success" && history.push("/");
  //       });
  //   })();
  // };
  const handleSubmit = () => {
    dispatch(updateProfile({ ...profileData, gallery, image: profileImg }));
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      console.log(errorMessage);
    }
    if (isSuccess) {
      console.log("profile page user", profile);
      dispatch(clearState());
      history.push("/");
    }
  }, [isError, isSuccess, dispatch]);

  return (
    <div className={`${s.body} ${ss.container}`}>
      <div className={s.form}>
        <div className={s.btn} onClick={() => openModal()}>
          <p>Add Images</p>
        </div>
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
        <div className={s.btn} onClick={handleSubmit}>
          <p>Save</p>
        </div>
      </div>
      <Modal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        sImage={sImage}
        setSImage={setSImage}
        lImage={lImage}
        setLImage={setLImage}
        uploadFileHadler={uploadFileHadler}
      >
        {children}
      </Modal>
    </div>
  );
}

export default EditProfile;
