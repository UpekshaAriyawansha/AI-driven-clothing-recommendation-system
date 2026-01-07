// src/components/UploadImage.js
import React, { useRef } from "react";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import * as tmImage from "@teachablemachine/image";
import "../styles/main.scss";

const { Dragger } = Upload;

const modelURL = "https://teachablemachine.withgoogle.com/models/RJdWfGNCv/model.json";
const metadataURL = "https://teachablemachine.withgoogle.com/models/RJdWfGNCv/metadata.json";

const UploadImage = ({ onDetect }) => {
  const modelRef = useRef(null);

  const loadModel = async () => {
    if (!modelRef.current) {
      modelRef.current = await tmImage.load(modelURL, metadataURL);
    }
  };

  const classifyImage = async (img) => {
    await loadModel();
    const prediction = await modelRef.current.predict(img);
    const top = prediction.reduce((a, b) => (a.probability > b.probability ? a : b));
    message.success(`Body Shape Detected: ${top.className}`);
    onDetect(top.className);
  };

  const uploadProps = {
    beforeUpload(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => classifyImage(img);
      };
      reader.readAsDataURL(file);
      return false; 
    },
    accept: "image/*",
    maxCount: 1,
  };

  return (
    <Dragger {...uploadProps} className="mb-3 upload-dragger">
      <p>
        <InboxOutlined className="ant-upload-drag-icon"/>
      </p>
      <p className="ant-upload-text text-white">Upload full body image to detect body shape</p>
    </Dragger>
  );
};

export default UploadImage;
