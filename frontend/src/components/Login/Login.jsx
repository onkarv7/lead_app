// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(
//         "http://localhost:4000/auth/login",
//         // "https://lead-app-wz8g.onrender.com/auth/login",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         setMessage("Login successful!");
//         localStorage.setItem("token", data.token);
//         navigate("/leads");
//       } else {
//         setMessage(data.message);
//       }
//     } catch (error) {
//       console.error("Error logging in:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-14 md:w-[30%] rounded shadow-md">
//         <h2 className="text-2xl font-bold mb-6">Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-6">
//             <label htmlFor="email" className="block text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full mt-4 px-3 py-2 border rounded"
//             />
//           </div>
//           <div className="mb-6">
//             <label htmlFor="password" className="block text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full px-3 mt-4 py-2 border rounded"
//             />
//           </div>
//           <button
//             type="submit"
//             className="bg-blue-500 mt-4 text-white px-4 py-2 rounded"
//           >
//             Login
//           </button>
//         </form>
//         {message && (
//           <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
//             {message}
//           </div>
//         )}
//         <div className="mt-8 text-gray-500">
//           Not Register{" "}
//           <Link className="text-gray-400 ml-1 underline" to="/">
//             Register here
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
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
        // "http://localhost:4000/auth/login"
        "https://lead-app-wz8g.onrender.com/auth/login",

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
        setMessage("Login successful!");
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", formData.email);

        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  {/* <img
                    className="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                    alt=""
                  /> */}
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {formData.email}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Welcome to SmallBigGrowth
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        ));

        navigate("/leads");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-14 md:w-[30%] rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-4 px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 mt-4 py-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 mt-4 text-white px-4 py-2 rounded"
          >
            Login
          </button>
        </form>
        {message && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
            {message}
          </div>
        )}
        <div className="mt-8 text-gray-500">
          Not Registered?{" "}
          <Link className="text-gray-400 ml-1 underline" to="/">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
