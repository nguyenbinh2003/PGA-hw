import { Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { FaStarOfLife } from "react-icons/fa6";
import { Button } from "react-bootstrap";

import { IRegister } from "@/src/interfaces/auth-interface";
import RegisterService from "@/src/services/auth/registerSevices";
import { registerSchema } from "@/src/utils/formSchema";

const UserServices = new RegisterService();

export default function RegisterForm() {
  const [location, setLocation] = useState<any>([]);
  const [state, setState] = useState<any>([]);
  const navigate = useNavigate();

  const handleChangeValue = async (e: any) => {
    const region: number = parseInt(e.target.value);
    if (region) {
      const getState = await UserServices.getState(String(region));
      setState(getState.data.data);
      console.log(state);
    }
  };
  const handleRegister = async (values: IRegister) => {
    const registerUser = await UserServices.register(values);
    console.log(registerUser);
    if (registerUser.status < 400) {
      Swal.fire({
        title: "Great !",
        text: "Login successfully",
        icon: "success",
      });
      localStorage.setItem("user-token", registerUser.data.data.token);
      navigate("/");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Your email or password is wrong. Try again!",
      });
    }
  };

  async function getLocation() {
    const getLocation = await UserServices.getLocation();
    setLocation(getLocation.data.data);
  }
  useEffect(() => {
    getLocation();
  }, []);
  return (
    <Formik
      initialValues={{
        email: "",
        name: "",
        password: "",
        repeatPassword: "",
        gender: "",
        region: "",
        state: "",
      }}
      validationSchema={registerSchema}
      onSubmit={(values) => handleRegister(values)}
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
              <label htmlFor="email">
                Email <FaStarOfLife size={7} color="red" />
              </label>
              <Field
                name="email"
                id="email"
                className={`form-control ${
                  errors.email && touched.email ? "is-invalid" : ""
                }`}
                type="text"
                placeholder="Email@gmail.com"
                autocomplete="email"
                validateOnChange={false}
              />
              {errors.email && errors.email ? (
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
              <label htmlFor="fullname">
                Full Name <FaStarOfLife size={7} color="red" />
              </label>
              <Field
                name="name"
                id="fullname"
                className={`form-control ${
                  errors.name && touched.name ? "is-invalid" : ""
                }`}
                type="text"
                placeholder="Full Name"
                autocomplete="name"
                validateOnChange={false}
              />
              {errors.name && errors.name ? (
                <div
                  id="validationServerUsernameFeedback"
                  className="invalid-feedback"
                >
                  {errors.name}
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password">
                Password <FaStarOfLife size={7} color="red" />
              </label>

              <Field
                name="password"
                id="password"
                className={`form-control ${
                  errors.password && touched.password ? "is-invalid" : ""
                }`}
                placeholder="Password"
                type="password"
                autocomplete="new-password"
                validateOnChange={false}
              />
              {errors.password && errors.password ? (
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
            <div className="mb-3">
              <label htmlFor="repeatPassword">
                Config Password <FaStarOfLife size={7} color="red" />
              </label>
              <Field
                name="repeatPassword"
                id="repeatPassword"
                className={`form-control ${
                  errors.repeatPassword && touched.repeatPassword
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Config Password"
                type="password"
                autocomplete="current-password"
                validateOnChange={false}
              />
              {errors.repeatPassword && errors.repeatPassword ? (
                <div
                  id="validationServerUsernameFeedback"
                  className="invalid-feedback"
                >
                  {errors.repeatPassword}
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="gender">
                Gender <FaStarOfLife size={7} color="red" />
              </label>
              <Field
                name="gender"
                id="gender"
                as="select"
                className={`form-select ${
                  errors.gender && touched.gender ? "is-invalid" : ""
                }`}
                autocomplete="gender-name"
              >
                <option selected>-- select an option --</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Field>
              {errors.gender && errors.gender ? (
                <div
                  id="validationServerUsernameFeedback"
                  className="invalid-feedback"
                >
                  {errors.gender}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="country">
                Country <FaStarOfLife size={7} color="red" />
              </label>
              <Field
                name="region"
                id="country"
                as="select"
                className={`form-select ${
                  errors.region && touched.region ? "is-invalid" : ""
                }`}
                autocomplete="country-name"
                onClick={handleChangeValue}
              >
                <option selected>-- select an option --</option>
                {location
                  ? location.map((country: any) => (
                      <option key={country.id} value={country.id}>
                        {country.name}
                      </option>
                    ))
                  : ""}
              </Field>
              {errors.region && errors.region ? (
                <div
                  id="validationServerUsernameFeedback"
                  className="invalid-feedback"
                >
                  {errors.region}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="city">
                City <FaStarOfLife size={7} color="red" />
              </label>
              <Field
                name="state"
                id="city"
                as="select"
                className={`form-select ${
                  errors.state && touched.state ? "is-invalid" : ""
                }`}
                autocomplete="city-name"
              >
                <option selected>-- select an option --</option>
                {state
                  ? state.map((state: any) => (
                      <option key={state.id} value={state.id}>
                        {state.name}
                      </option>
                    ))
                  : ""}
              </Field>
              {errors.state && errors.state ? (
                <div
                  id="validationServerUsernameFeedback"
                  className="invalid-feedback"
                >
                  {errors.state}
                </div>
              ) : (
                ""
              )}
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
                  errors.name ||
                  errors.email ||
                  errors.password ||
                  errors.gender ||
                  errors.repeatPassword ||
                  errors.region ||
                  errors.state ||
                  values.email === "" ||
                  values.name === "" ||
                  values.password === "" ||
                  values.repeatPassword === "" ||
                  values.gender === "" ||
                  values.region === "" ||
                  values.state === ""
                    ? "button"
                    : "submit"
                }
                style={{
                  minWidth: "12rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor:
                    errors.name ||
                    errors.email ||
                    errors.password ||
                    errors.gender ||
                    errors.repeatPassword ||
                    errors.region ||
                    errors.state ||
                    values.email === "" ||
                    values.name === "" ||
                    values.password === "" ||
                    values.repeatPassword === "" ||
                    values.gender === "" ||
                    values.region === "" ||
                    values.state === ""
                      ? "no-drop"
                      : "pointer",
                }}
              >
                Sign Up
              </Button>
            </div>
            <div className="d-flex col-12 justify-content-center">
              <Link
                to="/login"
                className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                style={{ textDecoration: "underline" }}
              >
                Or Login Using
              </Link>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
