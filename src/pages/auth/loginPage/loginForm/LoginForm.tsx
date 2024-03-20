import { Formik, Form, Field } from "formik";
import * as Yub from "yup";
import { loginUser } from "../../../../services/user/login";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import Button from "../../../../components/button/Button";
import { FaStarOfLife } from "react-icons/fa6";

const LoginForm = () => {
  const FormSchema = Yub.object().shape({
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
      validationSchema={FormSchema}
      onSubmit={async (values) => {
        setIsLogin(true);
        const data = await loginUser(values);
        setIsLogin(false);

        if (data.user !== false) {
          values.toggle
            ? localStorage.setItem("user_cookie", data.user_cookie)
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
          // navigate("/error");
        }
      }}
    >
      {({ errors, touched }) => (
        <Form
          style={{ maxWidth: "560px", width: "100%" }}
          className="row g-3 mt-5 border rounded p-3"
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
            <div className="col-auto">
              <Button
                className="btn btn-primary"
                type={
                  isLogin || errors.email || errors.password
                    ? "button"
                    : "submit"
                }
                style={{
                  minWidth: "160px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor:
                    isLogin || errors.email || errors.password
                      ? "no-drop"
                      : "pointer",
                }}
                content="Login"
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
