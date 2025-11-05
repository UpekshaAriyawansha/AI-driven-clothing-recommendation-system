import React, { useState } from "react";
import { Form, Select, Typography } from "antd";

const { Option } = Select;
const { Text } = Typography;

const TestComponent = () => { // Renamed to start with uppercase
  const [selectedHeight, setSelectedHeight] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [heightCategory, setHeightCategory] = useState("");
  const [weightCategory, setWeightCategory] = useState("");

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

  return (
    <Form>
      <Form.Item label="Height">
        <Select
          onChange={handleHeightChange}
          placeholder="Select Height"
          className="rounded"
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
      </Form.Item>

      <Form.Item label="Weight">
        <Select
          onChange={handleWeightChange}
          placeholder="Select Weight"
          className="rounded"
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
      </Form.Item>

      {/* Display Height and Weight Categories */}
      <Form.Item>
        <Text strong>Height Category: </Text>
        <Text>{heightCategory}</Text>
      </Form.Item>

      <Form.Item>
        <Text strong>Weight Category: </Text>
        <Text>{weightCategory}</Text>
      </Form.Item>
    </Form>
  );
};

export default TestComponent; // Export correctly
