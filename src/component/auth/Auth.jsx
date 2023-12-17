import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { ApiServices } from "../../api/httpServices";
import { emitErrorToast, emitSuccessToast } from "../../common/toast/EmitToast";
import FormikInputField from "../../common/form/FormikInput";

const Auth = () => {
  const navigate = useNavigate();

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
      isLoginType ? navigate("/") : setIsLoginType(true);
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
            <Form className="container w-75">
              {isLoginType ? <h1>Please Log in</h1> : <h1>Please sign Up</h1>}
              <div>
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
              </div>

              <button type="submit" className="btn btn-primary ">
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
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default Auth;
