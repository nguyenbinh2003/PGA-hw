import { Formik, Form, Field, useField } from "formik";
import * as Yub from "yup";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
// import { FaStarOfLife } from "react-icons/fa6";
import { Button } from "react-bootstrap";
import { IRegister } from "../../../../interfaces/auth-interface";
import RegisterService from "../../../../services/auth/registerSevices";

const UserServices = new RegisterService();

export default function RegisterForm() {
  const registerSchema = Yub.object().shape({
    email: Yub.string().email("Invalid email"),
    fullName: Yub.string().min(2, "Too Short!").max(50, "Too Long!"),
    password: Yub.string().min(6, "Password must be 6 characters long"),
    repeatPassword: Yub.string().min(6, "Password must be 6 characters long"),
    gender: Yub.string(),
    region: Yub.string(),
    state: Yub.string(),
  });
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

  useEffect(() => {
    async function getLocation() {
      const getLocation = await UserServices.getLocation();
      setLocation(getLocation.data.data);
    }
    getLocation();
  }, []);
  return (
    <Formik
      initialValues={{
        email: "",
        fullName: "",
        password: "",
        repeatPassword: "",
        gender: "",
        region: "",
        state: "",
      }}
      validationSchema={registerSchema}
      onSubmit={async (values: IRegister) => {
        const registerUser = await UserServices.register(values);
        console.log(registerUser);
        if (registerUser.status < 400) {
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
      }}
    >
      {(errors) => (
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
              <label htmlFor="email">Email</label>
              <Field
                name="email"
                id="email"
                className={`form-control`}
                type="text"
                placeholder="Email@gmail.com"
                autocomplete="email"
                validateOnChange={false}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="fullname">Full Name</label>
              <Field
                name="fullName"
                id="fullname"
                className={`form-control `}
                type="text"
                placeholder="Full Name"
                autocomplete="name"
                validateOnChange={false}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password">Password</label>

              <Field
                name="password"
                id="password"
                className={`form-control `}
                placeholder="Password"
                type="password"
                autocomplete="new-password"
                validateOnChange={false}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="repeatPassword">Config Password</label>
              <Field
                name="repeatPassword"
                id="repeatPassword"
                className={`form-control `}
                placeholder="Config Password"
                type="password"
                autocomplete="current-password"
                validateOnChange={false}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="gender">Gender</label>
              <Field
                name="gender"
                id="gender"
                as="select"
                className="form-select"
                autocomplete="gender-name"
              >
                <option selected>-- select an option --</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Field>
            </div>
            <div className="mb-3">
              <label htmlFor="country">Country</label>
              <Field
                name="region"
                id="country"
                as="select"
                className="form-select"
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
            </div>
            {state.length === 0 ? (
              ""
            ) : (
              <div className="mb-3">
                <label htmlFor="city">City</label>
                <Field
                  name="state"
                  id="city"
                  as="select"
                  className="form-select"
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
              </div>
            )}
          </div>

          <div
            className="row justify-content-md-center"
            style={{ margin: "16px 0" }}
          >
            <div className="d-flex col-12 justify-content-center pb-3">
              <Button
                variant="primary"
                type="submit"
                style={{
                  minWidth: "12rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
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
