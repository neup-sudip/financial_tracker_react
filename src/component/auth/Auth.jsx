import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { emitErrorToast, emitSuccessToast } from "../../common/toast/EmitToast";
import FormikInputField from "../../common/form/FormikInput";
import { useDispatch } from "react-redux";
import { SET_USER_PROFILE } from "../../redux/sagas/actions";
import { ApiServices } from "../../http/httpServices";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoginType, setIsLoginType] = useState(true);

  const loginInitial = {
    username: "",
    password: "",
  };

  const signupInitial = {
    username: "",
    password: "",
    email: "",
    fullName: "",
  };

  const [form, setForm] = useState(null);

  const handleSubmit = async (values, action) => {
    const url = isLoginType ? "/auth/login" : "/auth/register";

    const { data, success, message } = await ApiServices.post({
      url: url,
      data: values,
    });
    if (success) {
      emitSuccessToast(message);
      if (isLoginType) {
        dispatch(SET_USER_PROFILE(data));
        navigate("/");
      }
      setIsLoginType(true);
    } else {
      data ? action.setErrors(data) : emitErrorToast(message);
    }
  };

  useEffect(() => {
    if (isLoginType) {
      setForm(loginInitial);
    } else {
      setForm((prev) => ({ ...prev, ...signupInitial }));
    }
    //eslint-disable-next-line
  }, [isLoginType]);

  return (
    <>
      {form && (
        <Formik
          initialValues={form}
          onSubmit={handleSubmit}
          // validationSchema={bookValidation}
          enableReinitialize
        >
          {(formik) => (
            <Form
              className="container shadow rounded"
              style={{ maxWidth: "550px" }}
            >
              <h2 className="text-center">
                {isLoginType ? "Please Login" : "Please Signup"}
              </h2>

              <div className="pb-2">
                <FormikInputField
                  name="username"
                  formik={formik}
                  label="Username"
                  placeholder="Enter username"
                />
                <FormikInputField
                  name="password"
                  formik={formik}
                  label="Password"
                  placeholder="Enter password"
                />
                {!isLoginType && (
                  <>
                    <FormikInputField
                      name="email"
                      formik={formik}
                      label="Email"
                      type="email"
                      placeholder="Enter email"
                    />
                    <FormikInputField
                      name="fullName"
                      formik={formik}
                      label="Full Name"
                      placeholder="Enter full name"
                    />
                  </>
                )}

                <div className="d-flex justify-content-between ">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>

                  <button
                    className="btn btn-secondary btn-block"
                    type="button"
                    onClick={() => {
                      setForm(null);
                      setIsLoginType((prev) => !prev);
                    }}
                  >
                    {isLoginType
                      ? "Don't have account Signup "
                      : "Already have account Login"}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default Auth;
