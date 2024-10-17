import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://lead-app-wz8g.onrender.com/auth/register",
        // "http://localhost:4000/auth/register",

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("User registered successfully!");
        toast.success("Successfully toasted!");
        console.log("JWT Token:", data.token);

        navigate("/login");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="min-h-screen w-full flex  items-center justify-center bg-gray-200">
      <div className="bg-white md:w-[30%] p-14 rounded shadow-md">
        <h2 className="text-2xl text-center  font-bold mb-10">Register </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 mb-4">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-4">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 f"
          >
            Register
          </button>
        </form>
        {message && (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
            {message}
          </div>
        )}
        <div className="mt-8 text-gray-500">
          Already Register{" "}
          <Link className="text-gray-400 ml-1 underline" to="/login">
            Login in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
