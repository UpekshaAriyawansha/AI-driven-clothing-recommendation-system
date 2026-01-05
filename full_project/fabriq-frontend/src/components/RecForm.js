import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import {
  Form,
  Select,
  message,
  Input,
  Button,
  Upload,
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import * as tmImage from '@teachablemachine/image';

const { Option } = Select;
const { Dragger } = Upload;

const modelURL = "https://teachablemachine.withgoogle.com/models/RJdWfGNCv/model.json";
const metadataURL = "https://teachablemachine.withgoogle.com/models/RJdWfGNCv/metadata.json";


const RecForm = () => {

    const [selectedHeight, setSelectedHeight] = useState(null);
    const [selectedWeight, setSelectedWeight] = useState(null);
    const [selectedAge, setSelectedAge] = useState(null);
    
    const [heightCategory, setHeightCategory] = useState("");
    const [weightCategory, setWeightCategory] = useState("");
    const [ageCategory, setAgeCategory] = useState("");
    
    // Add state for skinColor, gender, and occasionType
    const [skinColor, setSkinColor] = useState('');
    const [gender, setGender] = useState('');
    const [occasionType, setOccasionType] = useState('');
    
    const ageCategories = {
        teenagers: "Teenagers",
        young: "Young",
        adults: "Adults",
    };
    
    const heightCategories = {
        below: "Short",
        "155": "Normal",
        above: "Tall",
    };
    
    const weightOptions = {
        below: [
            { value: "below40", label: "Below 40 kg" },
            { value: "40", label: "40 - 50 kg" },
            { value: "above50", label: "Above 50 kg" },
        ],
        "155": [
            { value: "below48", label: "Below 48 kg" },
            { value: "48", label: "48 - 65 kg" },
            { value: "above65", label: "Above 65 kg" },
        ],
        above: [
            { value: "below55", label: "Below 55 kg" },
            { value: "55", label: "55 - 75 kg" },
            { value: "above75", label: "Above 75 kg" },
        ],
    };
    
    const weightCategories = {
        below40: "Thin",
        "40": "Normal",
        above50: "Fat",
        below48: "Thin",
        "48": "Normal",
        above65: "Fat",
        below55: "Thin",
        "55": "Normal",
        above75: "Fat",
    };
    
    const handleAgeChange = (value) => {
        setSelectedAge(value);
        setAgeCategory(ageCategories[value] || "");
    };
    
    const handleHeightChange = (value) => {
        setSelectedHeight(value);
        setHeightCategory(heightCategories[value] || "");
        setSelectedWeight(null); // Reset weight when height changes
        setWeightCategory("");
    };
    
    const handleWeightChange = (value) => {
        setSelectedWeight(value);
        setWeightCategory(weightCategories[value] || "");
    };

    // Handle skinColor, gender, and occasionType changes
    const handleSkinColorChange = (value) => {
        setSkinColor(value);
    };
    
    const handleGenderChange = (value) => {
        setGender(value);
    };
    
    const handleOccasionChange = (value) => {
        setOccasionType(value);
    };

    const handleSubmit = async () => {
      try {
            const formData = {
            body_shape:bodyShape.toLowerCase(),                  // mapped from bodyShape
            skin_tone: skinColor.toLowerCase(),        // mapped from skinColor
            gender: gender.toLowerCase(),              // no change
            age_group: ageCategory.toLowerCase(),      // mapped from ageCategory
            height: heightCategory.toLowerCase(),      // mapped from heightCategory
            weight: weightCategory.toLowerCase(),      // mapped from weightCategory
            occasion: occasionType.toLowerCase()       // mapped from occasionType
            };
          
          console.log(formData);  
  
          const response = await axios.post('http://127.0.0.1:5000/api/recommendation/add', formData);
          message.success('Recommendation submitted successfully');
      } catch (error) {
          message.error('There was an error submitting your recommendation');
          console.error(error);  
      }
  };  

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

    




    const [recommendationResult, setRecommendationResult] = useState(null);
    
    const handleRec = async () => {
  try {
    const formData = {
      body_shape: bodyShape.toLowerCase(),
      skin_tone: skinColor.toLowerCase(),
      gender: gender.toLowerCase(),
      age_group: ageCategory.toLowerCase(),
      height: heightCategory.toLowerCase(),
      weight: weightCategory.toLowerCase(),
      occasion: occasionType.toLowerCase(),
    };

    console.log("Submitting: ", formData);

    const response = await axios.post(
      'http://127.0.0.1:5000/api/recommendation/add',
      formData
    );

    message.success('Recommendation submitted successfully');

    // Assuming response contains recommendations like { fabrics: [], colors: [], patterns: [] }
    setRecommendationResult(response.data);
  } catch (error) {
    message.error('There was an error submitting your recommendation');
    console.error(error);
  }
};





    return (
        <>     
            <Form
                className='mt-3 mb-5'
                labelCol={{ span: 9 }}
                wrapperCol={{ span: 15 }}
                layout="horizontal"
                style={{ marginBottom: "160px" }}
            > 
                <Dragger {...props} style={{height:"10px"}}>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Upload your full body photo to detect your body shape
                    </p>
                </Dragger>

                <hr style={{color:"gray"}}/>
                

                <Form.Item label="Body Shape">
                    <Input value={bodyShape} placeholder='' className='rounded' style={{ width: "332px", border: "solid", borderColor: "#ebebe0", borderWidth: "0.1px" }} />
                </Form.Item>                 
                <Form.Item label="Skin Color">
                    <Select 
                        value={skinColor}
                        onChange={handleSkinColorChange}
                        placeholder='Olive Skin' 
                        className='rounded text-start' 
                        style={{ width: "332px", border: "solid", borderColor: "#ebebe0", borderWidth: "0.1px" }}
                    >
                        <Select.Option value="fair">Fair Skin</Select.Option>
                        <Select.Option value="medium">Medium Skin</Select.Option>
                        <Select.Option value="olive">Olive Skin</Select.Option>
                        <Select.Option value="tan">Tan Skin</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Gender">
                    <Select 
                        value={gender}
                        onChange={handleGenderChange}
                        placeholder='female' 
                        className='rounded text-start' 
                        style={{ width: "332px", border: "solid", borderColor: "#ebebe0", borderWidth: "0.1px" }}
                    >
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="female">Female</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Age">
                    <Select 
                        onChange={handleAgeChange} 
                        value={selectedAge}
                        placeholder='20-29 years' 
                        className='rounded text-start' 
                        style={{ width: "332px", border: "solid", borderColor: "#ebebe0", borderWidth: "0.1px" }}
                    >
                        <Select.Option value="teenagers">13-19 years</Select.Option>
                        <Select.Option value="young">20-29 years</Select.Option>
                        <Select.Option value="adults">Above 30 years</Select.Option>
                    </Select>
                    {/* <caption>{ageCategory}</caption> */}
                </Form.Item>

                <Form.Item label="Height">
                    <Select
                        onChange={handleHeightChange}
                        value={selectedHeight}
                        placeholder="155 - 170 cm"
                        className="rounded text-start"
                        style={{
                            width: "332px",
                            border: "solid",
                            borderColor: "#ebebe0",
                            borderWidth: "0.1px",
                        }}
                    >
                        <Option value="below">Below 155 cm</Option>
                        <Option value="155">155 - 170 cm</Option>
                        <Option value="above">Above 170 cm</Option>
                    </Select>
                    {/* <caption className="hiding">{heightCategory}</caption> */}
                </Form.Item>

                <Form.Item label="Weight">
                    <Select
                        onChange={handleWeightChange}
                        value={selectedWeight}
                        placeholder="Below 48 kg"
                        className="rounded text-start"
                        style={{
                            width: "332px",
                            border: "solid",
                            borderColor: "#ebebe0",
                            borderWidth: "0.1px",
                        }}
                        disabled={!selectedHeight}
                    >
                        {selectedHeight &&
                            weightOptions[selectedHeight].map((option) => (
                                <Option key={option.value} value={option.value}>
                                    {option.label}
                                </Option>
                            ))}
                    </Select>
                    {/* <caption>{weightCategory}</caption> */}
                </Form.Item>

                <Form.Item label="Types of Occasion">
                    <Select 
                        value={occasionType} 
                        onChange={handleOccasionChange}
                        placeholder='formal' 
                        className='rounded mb-4 text-start' 
                        style={{ width: "332px", border: "solid", borderColor: "#ebebe0", borderWidth: "0.1px" }}
                    >
                        <Select.Option value="formal">Formal</Select.Option>
                        <Select.Option value="smart">Smart</Select.Option>
                        <Select.Option value="sport">Sport</Select.Option>
                        <Select.Option value="party">Party</Select.Option>
                    </Select>
                </Form.Item>

                <hr className='mt-4' style={{ color: "gray" }} />

                <div className="text-center d-flex flex-row-reverse">
                    <Button
                        onClick={handleRec}
                        className="btn btn-dark btn-lg rounded mt-3"
                        style={{ maxWidth: "300px", height:"50px"}}
                    >
                        View Recommendation
                    </Button>
                </div>
            </Form> 






{recommendationResult && (
  <div className="mt-5 text-center">
    <h4>Recommended Fashion Preview</h4>

    {/* Render Images */}
    <div className="d-flex justify-content-center flex-wrap gap-3 mt-4">
      {recommendationResult.generated_images.map((imgPath, index) => (
        <img
          key={index}
        //   src={`http://127.0.0.1:5000/${imgPath.replace(/\\/g, "/")}`} // Convert backslashes to slashes
        src={`http://127.0.0.1:5000${imgPath}`}
          alt={`Fashion Preview ${index + 1}`}
          style={{
            width: "300px",
            height: "auto",
            borderRadius: "12px",
            border: "1px solid #ccc",
            padding: "5px"
          }}
        />
      ))}
    </div>


    {/* Recommendations */}
    <div className="mt-4 text-start mx-auto" style={{ maxWidth: "500px" }}>
    <h5>Recommended Item: <strong>{recommendationResult.recommendations.clothing_item}</strong></h5>
    <p><strong>Fabrics:</strong> {recommendationResult.recommendations.fabric.slice(0, 3).join(", ")}</p>
    <p><strong>Colors:</strong> {recommendationResult.recommendations.color.slice(0, 3).join(", ")}</p>
    <p><strong>Patterns:</strong> {recommendationResult.recommendations.pattern.slice(0, 3).join(", ")}</p>
    </div>



    {/* Recommendations
    <div className="mt-4 text-start mx-auto" style={{ maxWidth: "500px" }}>
      <h5>Recommended Item: <strong>{recommendationResult.recommendations.clothing_item}</strong></h5>
      <p><strong>Fabrics:</strong> {recommendationResult.recommendations.fabric.join(", ")}</p>
      <p><strong>Colors:</strong> {recommendationResult.recommendations.color.join(", ")}</p>
      <p><strong>Patterns:</strong> {recommendationResult.recommendations.pattern.join(", ")}</p>
    </div> */}
  </div>
)}







{/* {recommendationResult && (
  <div className="mt-5 p-4 border rounded" style={{ background: "#f9f9f9" }}>
    <h4 className="mb-3">🎯 Your Personalized Recommendations</h4>
    
    <p><strong>Body Shape:</strong> {bodyShape}</p>
    <p><strong>Skin Tone:</strong> {skinColor}</p>
    <p><strong>Gender:</strong> {gender}</p>
    <p><strong>Age Group:</strong> {ageCategory}</p>
    <p><strong>Height:</strong> {heightCategory}</p>
    <p><strong>Weight:</strong> {weightCategory}</p>
    <p><strong>Occasion:</strong> {occasionType}</p>

    <hr />
    <h5>👗 Recommended Fabrics:</h5>
    <ul>
      {recommendationResult.fabrics?.map((fabric, idx) => (
        <li key={idx}>{fabric}</li>
      ))}
    </ul>

    <h5>🎨 Recommended Colors:</h5>
    <ul>
      {recommendationResult.colors?.map((color, idx) => (
        <li key={idx}>{color}</li>
      ))}
    </ul>

    <h5>🌀 Recommended Patterns:</h5>
    <ul>
      {recommendationResult.patterns?.map((pattern, idx) => (
        <li key={idx}>{pattern}</li>
      ))}
    </ul>
  </div>
)} */}




        </>
    );
}

export default RecForm;
