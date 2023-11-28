import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "../constant/Router";
import { toast } from "react-toastify";
import { useGlobalContext } from "../contexts/GlobalContext";
import { addUser } from "../services/user";
import { useFormik } from "formik";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const initialValues = {
  fullName: "",
  age: 0,
  email: "",
  position: "",
};
const validate = (values) => {
  let errors = {};
  if (!values.fullName) {
    errors.fullName = "Must be between 3 and 20 characters";
  } else if (values.fullName.length < 3) {
    errors.name = "Must be 3 characters or less";
  } else if (values.fullName.length > 20) {
    errors.name = "Must be 20 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.position) {
    errors.position = "Required";
  }

  if (!values.age) {
    errors.age = "Required";
  }

  return errors;
};

const AddUser = () => {
  const { inputRef, setFocus } = useGlobalContext();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      await addUser(values);
      toast.success("User added successfully!", {
        autoClose: 1000,
      });
      formik.resetForm();
      setTimeout(() => {
        navigate(ROUTER.Home);
      }, 1250);
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Error adding user. Please try again.", {
        autoClose: 1000,
      });
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });
  const disableBtn = !!Object.values(formik.errors).length;

  useEffect(() => {
    setFocus();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center align-items-center flex-column ">
        <h1 className="text-white my-4">Add User</h1>
        <form
          onSubmit={formik.handleSubmit}
          className="bg-dark-subtle w-50 text-center rounded  border border-primary"
        >
          <div>
            <input
              type="text"
              placeholder="Full Name"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              className="p-2 w-75 my-2 border border-primary rounded"
              ref={inputRef}
            />
            {formik.errors.fullName && (
              <p className="text-danger fw-bold fs-4 mb-0">
                {formik.errors.fullName}
              </p>
            )}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="p-2 w-75 my-1 border border-primary rounded"
            />
            {formik.errors.email && (
              <p className="text-danger fw-bold fs-4 mb-0">
                {formik.errors.email}
              </p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="Position"
              name="position"
              value={formik.values.position}
              onChange={formik.handleChange}
              className="p-2 w-75 my-1 border border-primary rounded"
            />
            {formik.errors.position && (
              <p className="text-danger fw-bold fs-4 mb-0">
                {formik.errors.position}
              </p>
            )}
          </div>
          <div>
            <input
              type="number"
              placeholder="Age"
              name="age"
              value={formik.values.age}
              onChange={formik.handleChange}
              className="p-2 w-75 my-1 border border-primary rounded"
            />
            {formik.errors.age && (
              <p className="text-danger fw-bold fs-4 mb-0">
                {formik.errors.age}
              </p>
            )}
          </div>

          <button
            className="btn btn-primary rounded my-3 px-5 py-2 fs-5 "
            type="submit"
            disabled={disableBtn}
          >
            Add User
          </button>
        </form>
      </div>
    </>
  );
};

export default AddUser;
