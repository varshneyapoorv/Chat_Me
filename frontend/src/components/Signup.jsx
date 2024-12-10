import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  // store the user deatils in the state
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  // const payload   = {
  //   fullname: user.fullname,
  //   username: "",
  //   password: "",
  //   confirmPassword: "",
  // }

  const navigate = useNavigate();
  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      console.log(user)
      const res = await axios.post(
        `http://localhost:1234/api/v1/user/register`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if(res.data.success){
        navigate("/login");
        toast.success(res.data.message)
      }

      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)

    }

    // setUser({
    //   fullname: "",
    //   username: "",
    //   password: "",
    //   confirmPassword: "",
    //   gender: "",
    // });
  };

  return (
    <div className="min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-gray-300">
          Sign Up
        </h1>
        <form action="" onSubmit={onSubmitHandler}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              value={user.fullname}
              onChange={(e) => setUser({ ...user, fullname: e.target.value })}
              type="text"
              placeholder="Enter your Full Name"
              className="w-full input input-bordered h-10"
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              type="text"
              placeholder="Enter your Username"
              className="w-full input input-bordered h-10"
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              placeholder="Enter your password"
              className="w-full input input-bordered h-10"
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              type="password"
              placeholder="Confirm your password"
              className="w-full input input-bordered h-10"
            />
          </div>

          <div className="flex items-center gap-3 my-4">
            <div className="flex items-center gap-1">
              <p className="font-bold">Male</p>
              <input
                type="checkbox"
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
                className="checkbox bg-white"
              />
            </div>

            <div className="flex items-center gap-1">
              <p className="font-bold">Female</p>
              <input
                type="checkbox"
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
                className="checkbox bg-white"
              />
            </div>
          </div>

          <div className="text-center my-2">
            <Link to="/login" className=" text-black font-bold">
              Already have an account? Login
            </Link>
          </div>
          <button
            type="submit"
            className="btn btn-block btn-sm mt-2 border border-slate-700"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
