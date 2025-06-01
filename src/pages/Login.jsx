import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


function Login() {
  const API = "https://683b1e8c43bb370a8674cae2.mockapi.io/chatUsers";
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(API);
      const users = response.data;

      const foundUser = users.find(
        (u) => u.email === user.email && u.password === user.password
      );

      if (!foundUser) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Email or Password is incorrect",
          confirmButtonColor: "#3d9970"
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Login Successful",
        confirmButtonColor: "#3d9970"
      });

      localStorage.setItem("userName", foundUser.name);
      localStorage.setItem("ownerID", foundUser.id);
      localStorage.setItem("userImg", foundUser.userImg);

      navigate("/");
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
      <h1 className="text-3xl font-bold text-gray-800 my-2">Login</h1>

      <input
      required
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="p-2 border rounded min-w-70 focus:outline-green-700"
      />

      <input
      required
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="p-2 border rounded min-w-70 focus:outline-green-700"
      />
      <p className="text-gray-700 ">Don't have an Account?
      <Link
      to = "/register" >
     <span className="px-1 hover:text-green-800 hover:underline ">Register</span></Link>
    </p>
      <button
        onClick={handleLogin}
        className="customGreenColor text-lg px-10 py-2 rounded cursor-pointer shadow-2xl"
      >
        Login
      </button>
    </div>
  );
}

export default Login;
