import React, { useState } from 'react';
import axios from 'axios';

const TestComponent = () => { 
  
const [formData, setFormData] = useState({
        image: null, skinColor: "", age: "", gender: "", height: "", weight: "", typeOfOccasion: ""
    });
    const [recommendations, setRecommendations] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });

        const response = await axios.post('http://localhost:5000/recommend', data);
        setRecommendations(response.data);
    };

    return (
        <div className="app">
            <h1>FABRIQ - AI Fashion Recommendation</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" name="image" onChange={handleFileChange} />
                <input type="text" name="skinColor" placeholder="Skin Color" onChange={handleChange} />
                <input type="text" name="age" placeholder="Age" onChange={handleChange} />
                <input type="text" name="gender" placeholder="Gender" onChange={handleChange} />
                <input type="text" name="height" placeholder="Height" onChange={handleChange} />
                <input type="text" name="weight" placeholder="Weight" onChange={handleChange} />
                <input type="text" name="typeOfOccasion" placeholder="Occasion Type" onChange={handleChange} />
                <button type="submit">Get Recommendation</button>
            </form>

            {recommendations && (
                <div>
                    <h2>Recommendations</h2>
                    <p>Fabrics: {recommendations.fabrics.join(", ")}</p>
                    <p>Colors: {recommendations.colors.join(", ")}</p>
                    <p>Patterns: {recommendations.patterns.join(", ")}</p>
                </div>
            )}
        </div>
    );
};

export default TestComponent; 