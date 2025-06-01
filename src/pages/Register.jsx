import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Register() {
  const API = "https://683b1e8c43bb370a8674cae2.mockapi.io/chatUsers";
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (user.name.length < 3) {
     Swal.fire({
    icon: "warning",
    title: "Invalid Name",
    text: "Name must be at least 3 characters long",
    confirmButtonColor: "#3d9970",
  });
  return;
}
    if (user.password.length < 6) {
     Swal.fire({
    icon: "warning",
    title: "Weak Password",
    text: "Password must be at least 6 characters long",
    confirmButtonColor: "#3d9970",
  });
  return;
    }

    try {
      await axios.post(API, {
        name: user.name,
        email: user.email,
        password: user.password,
        userImg: "",
      });

      localStorage.setItem("isLoggedIn", true);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Sign Up Successful",
          confirmButtonColor: "#3d9970"
      });
      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again later!",
        confirmButtonColor: "#3d9970"
      });
    }
  };

  return (
    <div className="customBageColor min-h-screen flex flex-col items-center justify-center gap-4 w-full">
      <h1 className="text-3xl font-bold text-gray-800 my-2">Register</h1>
      <input
        type="text"
        required
        placeholder="Name"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        className="p-2 border rounded min-w-70 focus:outline-green-700"
      />
      <input
        type="email"
        required
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="p-2 border rounded min-w-70 focus:outline-green-700"
      />
      <input
        type="password"
        required
        placeholder="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="p-2 border rounded min-w-70 focus:outline-green-700"
      />
      <p className="text-gray-700">
        Already have an Account?
        <Link to="/login">
          <span className="px-1 hover:text-green-800 hover:underline">Log In</span>
        </Link>
      </p>
      <button
        onClick={handleSignUp}
        className="customGreenColor text-lg px-10 py-2 rounded cursor-pointer shadow-2xl"
      >
        Sign Up
      </button>
    </div>
  );
}

export default Register;
