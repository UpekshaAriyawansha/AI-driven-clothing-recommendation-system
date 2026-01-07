// src/RecommendationForm.js
import React, { useState } from "react";
import { getRecommendation } from "../api/recommendationAPI";
import { message, Spin } from "antd";
import UploadImage from "../components/UploadImage";
import RecommendationModal from "../components/RecommendationModal";
import SelectInput from "../components/SelectInput";
import background from "../images/background.webp";
import "../styles/main.scss";


const RecommendationForm = () => {
  const [bodyShape, setBodyShape] = useState("");
  const [skinColor, setSkinColor] = useState("");
  const [gender, setGender] = useState("");
  const [ageCategory, setAgeCategory] = useState("");
  const [heightCategory, setHeightCategory] = useState("");
  const [weightCategory, setWeightCategory] = useState("");
  const [occasionType, setOccasionType] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = async () => {
    if (!bodyShape || !skinColor || !gender || !ageCategory || !heightCategory || !weightCategory || !occasionType) {
      message.warning("Please fill in all fields and detect your body shape.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        body_shape: bodyShape.toLowerCase(),
        skin_tone: skinColor.toLowerCase(),
        gender: gender.toLowerCase(),
        age_group: ageCategory.toLowerCase(),
        height: heightCategory.toLowerCase(),
        weight: weightCategory.toLowerCase(),
        occasion: occasionType.toLowerCase(),
      };

      const res = await getRecommendation(payload);
      setResult(res);
      setModalVisible(true);
      message.success("Recommendation generated successfully!");
    } catch (err) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const selectOptions = {
    skinColor: [
      { label: "Fair", value: "fair" },
      { label: "Medium", value: "medium" },
      { label: "Olive", value: "olive" },
      { label: "Tan", value: "tan" },
    ],
    gender: [
      { label: "Female", value: "female" },
      { label: "Male", value: "male" },
    ],
    ageCategory: [
      { label: "13-19", value: "teenagers" },
      { label: "20-29", value: "young" },
      { label: "30+", value: "adults" },
    ],
    heightCategory: [
      { label: "Short", value: "short" },
      { label: "Normal", value: "normal" },
      { label: "Tall", value: "tall" },
    ],
    weightCategory: [
      { label: "Thin", value: "thin" },
      { label: "Normal", value: "normal" },
      { label: "Fat", value: "fat" },
    ],
    occasionType: [
      { label: "Formal", value: "formal" },
      { label: "Party", value: "party" },
      { label: "Sport", value: "sport" },
      { label: "Smart", value: "smart" },
    ],
  };

  return (
    <section
      className="py-5 body-background"
      style={{
        minHeight: "85vh",
        backgroundImage: `url(${background})`,
      }}
    >
    <div className="background-shadow"/>
      <div className="container container-sup" style={{ position: "relative", zIndex: 2 }}>
        <h4 className="text-center fw-bold display-6 mb-4">FABRIQ Personalized Recommendation</h4>
        <div className="card bg-black text-white shadow-lg p-4 rounded-4">
          <UploadImage onDetect={setBodyShape} />
          <input
            type="text"
            className="form-control mb-3 bg-black text-white fw-bold"
            placeholder="Detected Body Shape"
            value={bodyShape}
            disabled
          />

          <div className="row g-3">
            <SelectInput label="Skin Tone" options={selectOptions.skinColor} value={skinColor} onChange={setSkinColor} />
            <SelectInput label="Gender" options={selectOptions.gender} value={gender} onChange={setGender} />
            <SelectInput label="Age Group" options={selectOptions.ageCategory} value={ageCategory} onChange={setAgeCategory} />
            <SelectInput label="Height" options={selectOptions.heightCategory} value={heightCategory} onChange={setHeightCategory} />
            <SelectInput label="Weight" options={selectOptions.weightCategory} value={weightCategory} onChange={setWeightCategory} />
            <SelectInput label="Occasion" options={selectOptions.occasionType} value={occasionType} onChange={setOccasionType} />
          </div>

          <button
            className="btn-custom btn btn-outline-light btn-lg rounded-pill px-4 w-100 mt-4"
                
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <Spin /> : "Generate Recommendation"}
          </button>
        </div>
      </div>

      {result && (
        <RecommendationModal visible={modalVisible} onClose={() => setModalVisible(false)} result={result} />
      )}
    </section>
  );
};

export default RecommendationForm;
