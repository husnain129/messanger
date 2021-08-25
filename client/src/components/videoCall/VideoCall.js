import React, { useEffect, useRef, useState } from "react";
import { FaPhoneSlash } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import s from "./VideoCall.module.css";

const VideoCall = ({ setCall, call }) => {
  const [stream, setStream] = useState();
  const userVideo = useRef();

  useEffect(() => {
    if (call) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setStream(stream);
          if (userVideo.current) {
            userVideo.current.srcObject = stream;
          }
        });
    }
  }, [call, setCall]);
  return (
    <div className={s.container}>
      <video
        playsInline
        autoPlay
        ref={userVideo}
        className={s.videoContainer}
      />
      <div className={s.btnContainer}>
        <IconContext.Provider value={{ className: s.icons }}>
          <FaPhoneSlash
            size={26}
            onClick={() => {
              if (stream) {
                stream.getTracks().forEach((track) => track.stop());
              }
              setCall(false);
            }}
          />
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default VideoCall;
