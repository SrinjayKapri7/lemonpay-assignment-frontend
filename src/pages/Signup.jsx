import React, { useState, useContext} from "react";
import { signupUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await signupUser(email, password);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  if (isAuthenticated) {
    return <p>You logged in already.</p>; 
  }
  
  return (
    <div className="gradient-background flex justify-end w-full">
      <div className="absolute  w-full  h-auto xs:top-[20px] xs:flex xs:justify-center xs:items-center xs:w-70 sm:w-48 sm:top-[20px] sm:left-[20px]  md:top-[50px] md:left-[27px] md:mx-[27px] md:w-72 lg:w-[329px]">
        <img src="/logo.png" alt="Logo" />
      </div>

      <div className="hidden md:h-auto md:w-full md:flex md:justify-start md:mx-[120px] md:mt-[200px]">
        <h2 className="lemonpay-message ">
          <span className="block text-white">Join 1000 Businesses</span>
          <span className="block text-yellow-400">Powering Growth with</span>
          <span className="block text-white">Lemonpay!</span>
        </h2>
      </div>

      <div className="max-w-md  p-6 rounded  md:me-[200px] lg:me-[200px]">
        <h3 className="welcome-message xs:mt-[50px] md:whitespace-nowrap">
          Welcome Sign Up System
        </h3>
        <h4 className="your-gateway mb-5 mt-5">
          Your gateway to seamless transactions and easy payments.
        </h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500">{error}</p>}

          <div>
            <label
              htmlFor="email"
              className="block mb-1 font-nunito font-semibold text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-1 font-nunito font-semibold text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password (min 6 chars)"
              value={password}
              minLength={6}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="text-white flex justify-end">
            <button type="button" onClick={() => navigate("/login")}>Sign In</button>
          </div>
          <button
            type="submit"
            className="w-full bg-white text-black py-2 rounded"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;