import { Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import { FaStarOfLife } from "react-icons/fa6";
import { Button } from "react-bootstrap";

import LoginService from "@/src/services/auth/loginServices";
import { ILogin } from "@/src/interfaces/auth-interface";
import { loginSchema } from "@/src/utils/formSchema";

const UserServices = new LoginService();

const LoginForm = () => {
  const navigate = useNavigate();
  const [isLoadingLogin, setIsLoadingLogin] = useState<boolean>(false);
  const handleLogin = async (values: ILogin) => {
    setIsLoadingLogin(true);
    if (values.email && values.password) {
      const user: any = await UserServices.login({
        email: values.email,
        password: values.password,
      });

      setIsLoadingLogin(false);

      if (user.code < 400) {
        const { token, ...dataUser } = user.data;
        localStorage.setItem("user-token", token);
        localStorage.setItem("user", JSON.stringify(dataUser));
        Swal.fire({
          title: "Great !",
          text: "Login successfully",
          icon: "success",
        });

        navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Your email or password is wrong. Try again!",
        });
      }
    }
    setIsLoadingLogin(false);
  };
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={loginSchema}
      onSubmit={(values) => handleLogin(values)}
    >
      {({ errors, touched, values }) => (
        <Form
          style={{ maxWidth: "560px", width: "100%" }}
          className="row g-3 border rounded p-3"
        >
          <div className="d-flex justify-content-center p-2">
            <img
              src="https://powergategroup.com/wp-content/uploads/elementor/thumbs/Final-Version-03-2-pft12ckj25cdkodfr1hlu5u5blbe7rfuve97ioheuc.png"
              alt="PowerGate Australia Image"
            />
          </div>
          <div>
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">
                Email <FaStarOfLife size={7} color="red" />
              </label>
              <Field
                name="email"
                className={`form-control ${
                  errors.email && touched.email ? "is-invalid" : ""
                }`}
                id="formGroupExampleInput"
                placeholder="Email@gmail.com"
                validateOnBlur
                validateOnChange={false}
              />
              {errors.email && touched.email ? (
                <div
                  id="validationServerUsernameFeedback"
                  className="invalid-feedback"
                >
                  {errors.email}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput2" className="form-label">
                Password <FaStarOfLife size={7} color="red" />
              </label>

              <Field
                name="password"
                className={
                  errors.password && touched.password
                    ? "form-control is-invalid"
                    : "form-control"
                }
                id="formGroupExampleInput"
                placeholder="Password"
                type="password"
                validateOnBlur
                validateOnChange={false}
              />
              {errors.password && touched.password ? (
                <div
                  id="validationServerUsernameFeedback"
                  className="invalid-feedback"
                >
                  {errors.password}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="col-12">
            <div className="form-check">
              <Field
                className="form-check-input"
                name="toggle"
                type="checkbox"
                id="invalidCheck"
              />

              <label className="form-check-label" htmlFor="invalidCheck">
                Remember Me
              </label>
            </div>
          </div>

          <div
            className="row justify-content-md-center"
            style={{ margin: "16px 0" }}
          >
            <div className="d-flex col-12 justify-content-center pb-3">
              <Button
                variant="primary"
                type={
                  isLoadingLogin ||
                  errors.email ||
                  errors.password ||
                  values.email === "" ||
                  values.password === ""
                    ? "button"
                    : "submit"
                }
                style={{
                  minWidth: "12rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor:
                    isLoadingLogin ||
                    errors.email ||
                    errors.password ||
                    values.email === "" ||
                    values.password === ""
                      ? "no-drop"
                      : "pointer",
                }}
              >
                Login
              </Button>
            </div>
            <div className="d-flex col-12 justify-content-center">
              <Link
                to="/sign-up"
                className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                style={{ textDecoration: "underline" }}
              >
                Or Sign Up Using
              </Link>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
