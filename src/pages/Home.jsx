import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


function Home() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <div className="h-screen customBageColor">
      <div className="pt-20 md:pt-40">
        <div className="container mx-auto px-8 lg:flex flex">
          <div className="text-center lg:text-left lg:w-1/2">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-none text-gray-800">
              Let's Chat
            </h1>
            <p className="text-xl lg:text-2xl mt-6 font-light text-gray-900">
              Connect with friends or meet new people anytime! Our chat platform
              lets you share messages, photos, and links effortlessly. Just sign
              up and start chatting – it’s safe, simple, and designed to help
              you express yourself freely.
            </p>
            <div className="flex gap-5 justify-center lg:justify-start">
              {!isLoggedIn && (
                <p className="mt-8 md:mt-12">
                  <Link to="/register">
                    <button
                      type="button"
                      className="text-lg font-bold py-4 w-30 customGreenColor cursor-pointer rounded"
                    >
                      Sign Up
                    </button>
                  </Link>
                </p>
              )}

              <p className="mt-8 md:mt-12">
                <Link
                  to={isLoggedIn ? "/chat" : "#"}
                  onClick={(e) => {
                    if (!isLoggedIn) {
                      e.preventDefault();
                      Swal.fire({
                        icon: "error",
                        title: "Login Required",
                        text: "You Need to Log In First.",
                        confirmButtonColor: "#3d9970",
                      });
                    }
                  }}
                >
                  <button
                    type="button"
                    className="text-lg font-bold py-4 w-30 customGreenColor cursor-pointer rounded"
                  >
                    Chat
                  </button>
                </Link>
              </p>
            </div>
          </div>

          <div className="lg:w-1/2 ">
            <img
              className="mx-auto h-90 hidden lg:flex"
              src="/lets-chat-logo.png"
              alt="logo"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
