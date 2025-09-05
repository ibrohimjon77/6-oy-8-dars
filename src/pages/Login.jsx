import React, { useEffect, useState } from "react";
import { Form, Link, useActionData } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useLogin } from "../hooks/useLogin";
import { fromError } from "../components/ErrorId";
import { useResetPassword } from "../hooks/useResetPassword";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  return data;
}

function Login() {
  const { _login, error:_error, isPending } = useLogin();
  const user = useActionData();
  const [error, setError] = useState(null);
  const {resetPassword} =useResetPassword()
  const [forgetPassword, setForgetPassword] = useState(false)
  useEffect(() => {
    if (user?.email && user?.password) {
      _login(user.email, user.password);
      setError(false);
    } else {
      setError(user ? fromError(user) : false);
    }
    if(user?.emailRecovery){
      resetPassword(user.emailRecovery)
      setError(false)
    }
  }, [user]);

  return (
    <div className="container auth">
      <h1 className="title">Login</h1>
      {!forgetPassword && (
        <Form method="post" className="auth-form">
          <FormInput type="email" label="Email" name="email" />
          <FormInput type="password" label="Password" name="password" />
          {!isPending && <button className="btn primary">Register</button>}
          {isPending && (
            <button className="btn primary" disabled>
              Loading...
            </button>
          )}
        </Form>
      )}

      {forgetPassword && (
        <Form method="post" className="auth-form">
          <FormInput type="email" label="Email" name="emailRecovery" />
          <button className=" btn primary">Send</button>
        </Form>
      )}
      
      {!forgetPassword && (
        <button
          className=" btn primary"
          onClick={() => setForgetPassword(!forgetPassword)}
        >
          Forget Password
        </button>
      )}
      {forgetPassword && (
        <button
          className=" btn primary"
          onClick={() => setForgetPassword(!forgetPassword)}
        >
          Show Login
        </button>
      )}

      {error && <p className="error">{error}</p>}
      {_error && <p className="error">{_error}</p>}

      <p className="switch">
        Don't have an account?
        <Link className="link" to="/register">
          Register
        </Link>
      </p>
    </div>
  );
}

export default Login
