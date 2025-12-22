import React, { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import { FaEye } from "react-icons/fa";

import { IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router";
import { ClimbingBoxLoader } from "react-spinners";
import { AuthContext } from "../../Provider/AuthContext";
import backgroundImg from "../../assets/backgroundImg.png";
import axios from "axios";

const SignUp = () => {
  const [show, setShow] = useState(false);
  const { signInWithGoogle, createUser, updateUser, setUser, setLoading } =
    useContext(AuthContext);
  const form = useRef(null);
  const navigate = useNavigate();
  const [loadingSpin, setLoadingSpin] = useState(true);
  const [googleLoading, setGoogleLoading] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setLoadingSpin(false), 1500);
    return () => clearTimeout(timer);
  }, []);
  const handleSignup = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.files[0];
    const email = e.target.email.value;
    const password = e.target.password.value;
    //console.log(email, password, name, photoUrl);
    const regx = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
      {
        image: photo,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const photoUrl = res.data.data.display_url;
    console.log(photoUrl);

    if (!name) {
      toast.error("Enter your name");
      return;
    }
    if (!photoUrl) {
      toast.error("Enter your photoUrl");
      return;
    }
    if (!email) {
      toast.error("Enter your email");
      return;
    }
    if (!regx.test(password)) {
      toast.error(
        "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter"
      );
      return;
    }

    if (res.data.success) {
      const userData = {
        displayName: name,
        photoURL: photoUrl,
      };
      createUser(email, password)
        .then((result) => {
          console.log(result.user);
          const user = result.user;
          updateUser(userData)
            .then((res) => {
              setUser({ ...user, displayName: name, photoURL: photoUrl });
              axios
                .post(
                  "https://programming-hero-assignment-11-serv.vercel.app/users",
                  {
                    name: name,
                    email: email,
                    password: password,
                    photoURL: photoUrl,
                  }
                )
                .then((response) => {
                  console.log("User data saved:", response.data);
                })
                .catch((error) => {
                  console.error("Error saving user data:", error);
                });
              toast.success("SignUP Successful");
              console.log(res);
              navigate("/");
              setLoading(false);
              form.current.reset();
            })
            .catch((error) => toast.error(error.message));
        })
        .catch((e) => {
          switch (e.code) {
            case "auth/email-already-in-use":
              toast.error("User already exists in the database.");
              break;
            case "auth/weak-password":
              toast.error("At least 6 ta digit password required");
              break;
            case "auth/invalid-email":
              toast.error("Invalid email format. Please check your email.");
              break;
            case "auth/user-not-found":
              toast.error("User not found. Please sign up first.");
              break;
            case "auth/wrong-password":
              toast.error("Wrong password. Please try again.");
              break;
            case "auth/user-disabled":
              toast.error("This user account has been disabled.");
              break;
            case "auth/too-many-requests":
              toast.error("Too many attempts. Please try again later.");
              break;
            case "auth/operation-not-allowed":
              toast.error("Operation not allowed. Please contact support.");
              break;
            case "auth/network-request-failed":
              toast.error("Network error. Please check your connection.");
              break;
            default:
              toast.error(e.message || "An unexpected error occurred.");
          }
        });
    }
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

  const formRest = (e) => {
    e.preventDefault();
    form.current.reset();
  };
  return loadingSpin ? (
    <div className="h-[97vh] flex items-center justify-center">
      <ClimbingBoxLoader color="#e74c3c" />
    </div>
  ) : (
    <>
      <div className=" mx-auto  md:flex-row justify-evenly items-center gap-4">
        <section
          className=" flex-1 py-5 place-items-center-safe bg-no-repeat w-full bg-cover bg-center flex justify-center items-center"
          style={{ backgroundImage: `url('${backgroundImg}')` }}
        >
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <p className="font-bold text-2xl mb-4">Sign Up</p>
              <form onSubmit={handleSignup} ref={form} className="space-y-4">
                <fieldset className="fieldset rounded-box w-full border p-7">
                  <label className="label">Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    className="input rounded-2xl p-6"
                  />
                  <label className="label">Email</label>
                  <input
                    type="email"
                    className="input rounded-2xl p-6"
                    name="email"
                    placeholder="Email"
                  />

                  <div className="relative">
                    <label className="label">Password</label>
                    <input
                      type={show ? "text" : "password"}
                      className="input rounded-2xl p-6"
                      placeholder={show ? "Password" : "******"}
                      name="password"
                    />
                    <span
                      onClick={() => setShow(!show)}
                      className="absolute right-[18px] top-[32px] text-2xl cursor-pointer z-50"
                    >
                      {show ? <FaEye /> : <IoEyeOff />}
                    </span>
                  </div>
                  <div>
                    <label className="label">Photo</label>
                    <input
                      type="file"
                      name="photo"
                      placeholder="Your photo here"
                      className="input rounded-2xl p-6"
                    />
                  </div>

                  <div className="flex items-center justify-evenly">
                    <button className="btn btn-neutral rounded-4xl mt-4 px-6">
                      Sign Up
                    </button>
                    <button
                      onClick={formRest}
                      className="btn btn-neutral  rounded-4xl mt-4 px-6"
                    >
                      Reset
                    </button>
                  </div>
                </fieldset>
              </form>
              <section className="flex flex-col gap-5 w-full">
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
              </section>
              <div className="text-center">
                Already have an account?
                <Link
                  to={`/login`}
                  className="link link-hover text-blue-400 hover:text-blue-600"
                >
                  {" "}
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SignUp;
