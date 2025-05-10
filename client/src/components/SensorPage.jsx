import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SensorPage = ({ setPredictionData }) => {
  const [formData, setFormData] = useState({
    air_temperature: '',
    process_temperature: '',
    rotational_speed: '',
    torque: '',
    tool_wear: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Only allow non-negative numbers (including empty)
    if (value === '' || (!isNaN(value) && Number(value) >= 0)) {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePredict = async () => {
    try {
      const resp = await fetch('https://iot-4u4v.onrender.com/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!resp.ok) {
        console.error('Prediction request failed:', resp.statusText);
        return;
      }

      const data = await resp.json();
      setPredictionData(data);
      navigate('/Analytics');
    } catch (err) {
      console.error('Error fetching prediction:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-teal-400">
          Enter Sensor Data
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: 'air_temperature', label: 'Air Temperature (K)', placeholder: 'e.g. 25.4' },
            { name: 'process_temperature', label: 'Process Temperature (K)', placeholder: 'e.g. 140.0' },
            { name: 'rotational_speed', label: 'Rotational Speed (RPM)', placeholder: 'e.g. 1500' },
            { name: 'torque', label: 'Torque (Nm)', placeholder: 'e.g. 40' },
          ].map(({ name, label, placeholder }) => (
            <div key={name} className="flex flex-col">
              <label htmlFor={name} className="mb-2 text-gray-300">
                {label}
              </label>
              <input
                id={name}
                name={name}
                type="number"
                value={formData[name]}
                onChange={handleInputChange}
                placeholder={placeholder}
                className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
          ))}
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="tool_wear" className="mb-2 text-gray-300">
              Tool Wear (min)
            </label>
            <input
              id="tool_wear"
              name="tool_wear"
              type="number"
              value={formData.tool_wear}
              onChange={handleInputChange}
              placeholder="e.g. 200"
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
          <button
            onClick={handlePredict}
            className="md:col-span-2 bg-teal-400 text-gray-900 font-semibold rounded-lg py-3 mt-4 hover:bg-teal-300 transition"
          >
            Predict Failure
          </button>
        </div>
      </div>
    </div>
  );
};

export default SensorPage;
