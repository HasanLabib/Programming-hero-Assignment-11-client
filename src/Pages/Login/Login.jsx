import React, { useContext, useEffect, useRef, useState } from "react";
import { FaEye } from "react-icons/fa";

import { IoEyeOff } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthContext.jsx";
import toast from "react-hot-toast";
import { ClimbingBoxLoader } from "react-spinners";
import axios from "axios";

const Login = () => {
  const { signInWithGoogle, signInUser, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [googleLoading, setGoogleLoading] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);
  const [show, setShow] = useState(false);
  const [userEmail, setuserEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const form = useRef(null);
  const handleChange = (e) => {
    console.log(e.target.value);
    setuserEmail(e.target.value);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(e.target);
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    signInUser(email, password)
      .then((res) => {
        toast.success("Login Successful");
        console.log(res);
        navigate(`${location.state ? location.state : "/"}`);
        form.current.reset();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  const handleGoogleSignin = () => {
    if (googleLoading) return;
    setGoogleLoading(true);
    signInWithGoogle()
      .then((result) => {
        const loggedUser = result.user;
        setUser({
          displayName: loggedUser.displayName,
          email: loggedUser.email,
          photoURL: loggedUser.photoURL,
        });
        axios
          .post(
            "https://programming-hero-assignment-11-serv.vercel.app/googleUsers",
            {
              name: loggedUser.displayName,
              email: loggedUser.email,
              photoURL: loggedUser.photoURL,
            }
          )
          .then((response) => {
            console.log("User data saved:", response.data);
          })
          .catch((error) => {
            console.error("Error saving user data:", error);
          });
        console.log("Google login success:", result.user);
        toast.success("Google Sign-in successful!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Google sign-in error:", error);
        toast.error(error.message || "Google sign-in failed");
      })
      .finally(() => {
        setGoogleLoading(false);
      });
  };

  return loading ? (
    <div className="h-[97vh] flex items-center justify-center">
      <ClimbingBoxLoader color="#e74c3c" />
    </div>
  ) : (
    <>
      <div className="w-11/12 mx-auto flex md:flex-row flex-col-reverse justify-evenly items-center gap-4">
        <section className="flex-1 py-5 place-items-center-safe">
          <div className="card w-full max-w-xl shrink-0 shadow-2xl bg-[#ffffff51]">
            <div className="card-body ">
              <p className="font-bold text-2xl mb-4">Login</p>
              <form
                onSubmit={handleLogin}
                ref={form}
                className="space-y-4 bg-[#ffffff] "
              >
                <fieldset className="fieldset  rounded-box w-full border p-7">
                  <section className="flex justify-between items-center-safe gap-4">
                    <div class="input-floating-label">
                      <label className="label">Email</label>
                      <input
                        type="email"
                        className="input rounded-2xl p-6"
                        name="email"
                        value={userEmail}
                        onChange={handleChange}
                        placeholder="Email"
                      />
                    </div>

                    <div className="relative">
                      <div class="input-floating-label">
                        <label className="label">Password</label>
                        <input
                          type={show ? "text" : "password"}
                          className="input rounded-2xl p-6 "
                          placeholder={show ? "Password" : "******"}
                          name="password"
                        />
                      </div>
                      <span
                        onClick={() => setShow(!show)}
                        className="absolute right-[18px] top-[32px] text-2xl cursor-pointer z-50"
                      >
                        {show ? <FaEye /> : <IoEyeOff />}
                      </span>
                    </div>
                  </section>
                  <div>
                    <Link
                      to={"/forgetpassword"}
                      state={userEmail}
                      className="link link-hover"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <button className="btn btn-neutral rounded-2xl mt-4 px-6">
                    Login
                  </button>
                  <div className="flex items-center justify-center gap-2 my-2">
                    <div className="h-px w-16 bg-slate-800"></div>
                    <span className="text-sm ">or</span>
                    <div className="h-px w-16 bg-slate-800"></div>
                  </div>
                  <button
                    className="btn bg-white text-black border-[#e5e5e5] "
                    onClick={handleGoogleSignin}
                  >
                    <svg
                      aria-label="Google logo"
                      width="16"
                      height="16"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <g>
                        <path d="m0 0H512V512H0" fill="#fff"></path>
                        <path
                          fill="#34a853"
                          d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                        ></path>
                        <path
                          fill="#4285f4"
                          d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                        ></path>
                        <path
                          fill="#fbbc02"
                          d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                        ></path>
                        <path
                          fill="#ea4335"
                          d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                        ></path>
                      </g>
                    </svg>
                    Login with Google
                  </button>
                </fieldset>
              </form>
              <div className="text-center">
                Don't have an account?
                <Link
                  to={`/signup`}
                  className="link link-hover text-blue-400 hover:text-blue-600"
                >
                  {" "}
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;
