import React, { useState } from "react";
import TpkLogo from "../../assets/tpk-logo.png";
import { useNavigate } from "react-router";
import Swal from 'sweetalert2';
import api from '../../service/api'
import { StartLoading } from "../../utils/swal2";
import { isAuth, setAuth } from "../../utils/token";
import { useFormik } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { TextField, IconButton } from "@mui/material";
import { Helmet } from "react-helmet";
import style from './style.module.css'
import * as Yup from "yup";
import AOS from "aos";
import "aos/dist/aos.css";
const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Username harus di isi"),
      password: Yup.string().required("Password harus di isi"),
    }),
    onSubmit: (values) => {
      handleLogin(values);
    },
  });
  const handleLogin = async (values) => {
    setIsLoading(true);

    if (!values.username || !values.password) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post("/Auth/login", values);

      if (response.status === 200) {
        const user = response.data;
        setAuth(user.token);
        localStorage.setItem("fullname", user.email);
        localStorage.setItem("role", user.role);
        StartLoading("Please Wait...");
        const allowedRoles = ["CUSMOD", "ADMINISTRATOR", "P2", "BCP2"];
        const userRoles = user.role.split(",").map(role => role.trim());
        if (userRoles.some(role => allowedRoles.includes(role))) {
          navigate("/dashboard");
        } 
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: response.data.message || 'Unknown error occurred',
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid username or password',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: error.response ? error.response.data : 'Unexpected error occurred',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };


  AOS.init();
  AOS.refresh();
  return (
    <>
      <Helmet>
        <title>TPK AUTOGATE Monitoring | Login</title>
      </Helmet>
      <div className={`relative ${style.bgjictbg} bg-cover bg-no-repeat w-full h-screen`}>
        <div className="absolute w-full h-screen"></div>
        <div className="z-10 absolute flex flex-col items-center justify-center m-auto left-0 right-0 top-0 bottom-0 md:h-screen lg:py-0">
          <div data-aos="zoom-in-up"
            data-aos-duration="1000" className="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 md: sm:max-w-md xl:p-0  ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <img data-aos="zoom-in-left"
                data-aos-duration="1000" className="w-86" src={TpkLogo} alt="logo" />
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={formik.handleSubmit}
              >
                <div className="flex flex-col space-y-2">
                  <label
                    className="form-label"
                    data-aos="zoom-in-right"
                    data-aos-duration="1000"
                  >
                    User Name
                  </label>
                  <TextField
                    id="username"
                    name="username"
                    type="text"
                    className={`form-control ${formik.touched.username && formik.errors.username ? 'invalid' : ''}`}
                    placeholder="Masukkan User Name"
                    {...formik.getFieldProps("username")}

                  />
                  {formik.touched.username && formik.errors.username && (
                    <div className="invalid-feedback text-red-500 text-xs">
                      {formik.errors.username}
                    </div>
                  )}
                </div>
                <div className="flex flex-col space-y-2">
                  <label
                    className="form-label"
                    data-aos="zoom-in-right"
                    data-aos-duration="1000"
                  >
                    Password
                  </label>
                  <TextField
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className={`form-control ${formik.touched.password && formik.errors.password ? 'invalid' : ''}`}
                    placeholder="Password"
                    {...formik.getFieldProps("password")}

                    InputProps={{
                      endAdornment: (
                        <IconButton
                          style={{ cursor: "pointer", background: "none" }}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      ),
                    }}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="invalid-feedback text-red-500 text-xs">
                      {formik.errors.password}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  data-aos="zoom-in-left"
                  data-aos-duration="1000"
                  className="w-full text-white bg-[#004AAD] transition-all hover:bg-[#26ACFA] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-t-2 border-white rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
              <div className="mt-2">
                <p className="text-center text-xs">&copy; 2024 Autogate Monitoring System</p>
                <p className="text-center text-xs">All Rights Reserved | TERMINAL PETIKEMAS IPC TPK</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default Login;
