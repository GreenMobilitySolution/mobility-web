import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBus, FaUser, FaCar } from 'react-icons/fa';

const GetStarted: React.FC = () => {
  const navigate = useNavigate();

  const handleSelection = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold mb-6">Get Started</h1>
      <p className="text-lg mb-6">How would you like to register?</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => handleSelection('/register-company')}
        >
          <FaBus className="text-4xl text-blue-500 mb-4" />
          <h2 className="text-xl font-medium">Public Transportation Company</h2>
        </div>
        <div
          className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => handleSelection('/register-passenger')}
        >
          <FaUser className="text-4xl text-green-500 mb-4" />
          <h2 className="text-xl font-medium">Passenger</h2>
        </div>
        <div
          className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => handleSelection('/register-driver')}
        >
          <FaCar className="text-4xl text-red-500 mb-4" />
          <h2 className="text-xl font-medium">Private Driver</h2>
        </div>
        {/* Add more options as needed */}
      </div>
    </div>
  );
};

export default GetStarted;