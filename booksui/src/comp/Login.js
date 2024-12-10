import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Alert from "@mui/material/Alert";

export default function Login(props) {
  const [showAlert, setShowAlert] = useState(false);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const userData = {
      username: values.username,
      password: values.password,
    };

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';


      const response = await fetch(`${apiUrl}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();

      if (data.token) {
        const accessToken = data.token.access;
        const refreshToken = data.token.refresh;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setShowAlert(true);
        props.settoken(true);
      }
      
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div
        style={{
          maxWidth: "400px",
          margin: "50px auto",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2
          style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}
        >
          Login
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div style={{ marginBottom: "15px" }}>
                <label
                  htmlFor="username"
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  Username
                </label>
                <Field
                  type="text"
                  name="username"
                  placeholder="Username"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    fontSize: "16px",
                    boxSizing: "border-box",
                  }}
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  style={{ color: "red", fontSize: "12px", marginTop: "5px" }}
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label
                  htmlFor="password"
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    fontSize: "16px",
                    boxSizing: "border-box",
                  }}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  style={{ color: "red", fontSize: "12px", marginTop: "5px" }}
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "none",
                  backgroundColor: "#ff6666",
                  color: "#fff",
                  fontSize: "16px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </div>

      {showAlert && (
        <Alert
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            width: "450px",
            marginRight: "20px",
            float: "none",
          }}
          variant="filled"
          severity="success"
          onClose={() => setShowAlert(false)}
        >
          Logged in successfully
        </Alert>
      )}
    </>
  );
}
