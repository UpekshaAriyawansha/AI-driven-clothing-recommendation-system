import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import * as tmImage from '@teachablemachine/image';

const { Dragger } = Upload;

const modelURL = "https://teachablemachine.withgoogle.com/models/RJdWfGNCv/model.json";
const metadataURL = "https://teachablemachine.withgoogle.com/models/RJdWfGNCv/metadata.json";

const UploadImage = () => {
  const [bodyShape, setBodyShape] = useState("");
  const modelRef = useRef(null);

  const loadModel = async () => {
    if (!modelRef.current) {
      modelRef.current = await tmImage.load(modelURL, metadataURL);
    }
  };

  const classifyImage = async (imgElement) => {
    await loadModel();
    const prediction = await modelRef.current.predict(imgElement);
    const topPrediction = prediction.reduce((prev, current) =>
      prev.probability > current.probability ? prev : current
    );
    setBodyShape(topPrediction.className);
    message.success(`Predicted Body Shape: ${topPrediction.className}`);
  };

  const props = {
    name: 'image',
    multiple: false,
    accept: 'image/*',
    showUploadList: false,
    beforeUpload(file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          classifyImage(img);
        };
      };
      reader.readAsDataURL(file);
      return false;
    },
  };

  return (
    <>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Upload your full body photo to detect your body shape
        </p>
      </Dragger>

      {bodyShape && (
        <div className="text-center mt-4">
          <h3>Detected Body Shape: <strong>{bodyShape}</strong></h3>
          {/* <Link
            to={`/recform?shape=${encodeURIComponent(bodyShape)}`}
            className="btn btn-dark btn-lg rounded mt-3"
            style={{ maxWidth: "300px" }}
          >
            Get Recommendations
          </Link> */}
        </div>
      )}
    </>
  );
};

export default UploadImage;
