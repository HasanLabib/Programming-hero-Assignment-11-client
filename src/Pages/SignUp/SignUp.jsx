import React, { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router";
import { ClimbingBoxLoader } from "react-spinners";
import { AuthContext } from "../../Provider/AuthContext";
import backgroundImg from "../../assets/backgroundImg.png";
import axios from "axios";

//https://programming-hero-assignment-11-serv.vercel.app/users

const SignUp = () => {
  const [show, setShow] = useState(false);
  const [loadingSpin, setLoadingSpin] = useState(true);
  const [googleLoading, setGoogleLoading] = useState(false);

  const { signInWithGoogle, createUser, updateUser, setUser, setLoading } =
    useContext(AuthContext);

  const form = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoadingSpin(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();

    const name = e.target.name.value.trim();
    const photoFile = e.target.photo.files[0];
    const email = e.target.email.value.trim();
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!name) return toast.error("Name is required");
    if (!email) return toast.error("Email is required");
    if (!photoFile) return toast.error("Profile photo is required");

    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password must be 6+ chars with uppercase & lowercase letters"
      );
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const imgForm = new FormData();
      imgForm.append("image", photoFile);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
        imgForm
      );

      const photoURL = imgRes?.data?.data?.display_url;
      if (!photoURL) throw new Error("Image upload failed");
      const result = await createUser(email, password);

      await updateUser({
        displayName: name,
        photoURL,
      });

      setUser({
        ...result.user,
        displayName: name,
        photoURL,
      });

      await axios.post(
        "https://programming-hero-assignment-11-serv.vercel.app/users",
        {
          name,
          email,
          photoURL,
        }
      );

      toast.success("Account created successfully 🎉");
      navigate("/");
      setLoading(false);
      form.current.reset();
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error("Email already exists");
          break;
        case "auth/invalid-email":
          toast.error("Invalid email format");
          break;
        case "auth/weak-password":
          toast.error("Password is too weak");
          break;
        case "auth/network-request-failed":
          toast.error("Network error. Try again");
          break;
        default:
          toast.error(error.message || "Signup failed");
      }
    }
  };

  const handleGoogleSignin = () => {
    if (googleLoading) return;
    setGoogleLoading(true);

    signInWithGoogle()
      .then(async (result) => {
        const user = result.user;

        setUser({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });

        await axios.post(
          "https://programming-hero-assignment-11-serv.vercel.app/googleUsers",
          {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          }
        );

        toast.success("Google Sign-in successful");
        navigate("/");
      })
      .catch(() => toast.error("Google sign-in failed"))
      .finally(() => setGoogleLoading(false));
  };

  if (loadingSpin) {
    return (
      <div className="h-[97vh] flex items-center justify-center">
        <ClimbingBoxLoader color="#e74c3c" />
      </div>
    );
  }

  return (
    <div className="mx-auto md:flex-row justify-evenly items-center gap-4">
      <section
        className="flex-1 py-5 bg-cover bg-center flex justify-center items-center"
        style={{ backgroundImage: `url('${backgroundImg}')` }}
      >
        <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
          <div className="card-body">
            <p className="font-bold text-2xl mb-4">Create Account</p>

            <form onSubmit={handleSignup} ref={form} className="space-y-4">
              <fieldset className="fieldset rounded-box w-full border p-7 space-y-2">
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
                  name="email"
                  placeholder="Email"
                  className="input rounded-2xl p-6"
                />

                <div className="relative">
                  <label className="label">Password</label>
                  <input
                    type={show ? "text" : "password"}
                    name="password"
                    placeholder="******"
                    className="input rounded-2xl p-6"
                  />
                  <span
                    onClick={() => setShow(!show)}
                    className="absolute right-[18px] top-[32px] text-2xl cursor-pointer"
                  >
                    {show ? <FaEye /> : <IoEyeOff />}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    At least 6 characters, 1 uppercase & 1 lowercase
                  </p>
                </div>
                <div className="relative">
                  <label className="label">Confirm Password</label>
                  <input
                    type={show ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="******"
                    className="input rounded-2xl p-6"
                  />
                  <span
                    onClick={() => setShow(!show)}
                    className="absolute right-[18px] top-[32px] text-2xl cursor-pointer"
                  >
                    {show ? <FaEye /> : <IoEyeOff />}
                  </span>
                </div>

                <label className="label">Profile Photo</label>
                <input
                  type="file"
                  name="photo"
                  className="file-input file-input-bordered rounded-2xl"
                />

                <button className="btn btn-neutral rounded-2xl mt-4">
                  Sign Up
                </button>
              </fieldset>
            </form>

            <div className="flex items-center justify-center gap-2 my-3">
              <div className="h-px w-16 bg-slate-800"></div>
              <span className="text-sm">or</span>
              <div className="h-px w-16 bg-slate-800"></div>
            </div>

            <button
              disabled={googleLoading}
              onClick={handleGoogleSignin}
              className="btn bg-white text-black border"
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
              </svg>{" "}
              Sign up with Google
            </button>

            <div className="text-center mt-2">
              Already have an account?
              <Link
                to="/login"
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
  );
};

export default SignUp;
