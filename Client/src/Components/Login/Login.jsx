import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../Styles/styles";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../server";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post(
        `${server}/login-user`,
        { email, password },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Login Success!!!");
        window.location.reload(true);
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div
      className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg
    px-8"
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to Your Account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md bg-yellow-500">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 ">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="mt-1">
                <input
                  className="block w-full px-3 py-2 border-gray-300 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm bg-gray-100"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  className="block w-full px-3 py-2 border-gray-300 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm bg-gray-100"
                  type={visible ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                {visible ? (
                  <AiOutlineEye
                    onClick={() => setVisible(false)}
                    size={25}
                    className="absolute right-2 top-2 cursor-pointer"
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    onClick={() => setVisible(true)}
                    size={25}
                    className={`absolute right-2 top-2 cursor-pointer ${
                      password ? "block" : "hidden"
                    } }`}
                  />
                )}
              </div>
            </div>

            <div className={`${styles.normalFlex}`}>
              <div className={`${styles.normalFlex}`}>
                <input
                  className="h-4 w-4 text-blue-600  border-gray-300 rounded "
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                />
                <label
                  className="ml-2 block text-sm text-gray-900"
                  htmlFor="remember-me"
                >
                  Remember Me
                </label>
              </div>
              <div className="text-sm">
                <Link
                  className="font-medium text-blue-600 hover:text-blue-500 ml-2 underline"
                  to="forgot-password"
                >
                  Forgot Your Password
                </Link>
              </div>
            </div>
            <div>
              <button
                className="group  w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                type="submit"
              >
                Login
              </button>
            </div>
            <div className={`${styles.normalFlex} w-full`}>
              <h4>Don't have an account?</h4>
              <Link className="text-blue-600 pl-2" to="/sign-up">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
