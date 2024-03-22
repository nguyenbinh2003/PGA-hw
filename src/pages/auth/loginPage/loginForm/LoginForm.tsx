import { Formik, Form, Field } from "formik";
import * as Yub from "yup";
import LoginService from "../../../../services/auth/loginServices";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import { FaStarOfLife } from "react-icons/fa6";
import { Button } from "react-bootstrap";
import { ILogin } from "../../../../interfaces/auth-interface";

const UserServices = new LoginService();

const LoginForm = () => {
  const loginSchema = Yub.object().shape({
    email: Yub.string().email("Invalid email"),
    password: Yub.string().min(6, "Password must be 6 characters long"),
    // .matches(/[0-9]/, "Password requires a number")
    // .matches(/[a-z]/, "Password requires a lowercase letter")
    // .matches(/[A-Z]/, "Password requires an uppercase letter")
    // .matches(/[^\w]/, "Password requires a symbol"),
  });
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        toggle: false,
        checked: [],
      }}
      validationSchema={loginSchema}
      onSubmit={async (values: ILogin) => {
        console.log("🚀 ~ onSubmit={ ~ values:", values);
        setIsLogin(true);
        if (values.email && values.password) {
          const user = await UserServices.login({
            email: values.email,
            password: values.password,
          });
          setIsLogin(false);

          if (user.status < 500) {
            values.toggle
              ? localStorage.setItem("user_cookie", user.data.user_cookie)
              : localStorage.clear();
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
        setIsLogin(false);
      }}
    >
      {({ errors, touched }) => (
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
                  isLogin || errors.email || errors.password
                    ? "button"
                    : "submit"
                }
                style={{
                  minWidth: "12rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor:
                    isLogin || errors.email || errors.password
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
