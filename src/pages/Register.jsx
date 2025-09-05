import React, { useEffect, useState } from "react";
import { Form, Link, useActionData } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useRegister } from "../hooks/useRegister";
import { fromError } from "../components/ErrorId";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  return data;
}

function Register() {
  const user = useActionData();
  const [error, setError] = useState(null);
  const { register, isPending, error: _error } = useRegister();

  useEffect(() => {
    if (user?.name && user?.email && user?.password) {
      register(user.name, user.email, user.password);
      setError(false);
    } else {
      setError(user ? fromError(user) : false);
    }
  }, [user]);

  return (
    <div className="container auth">
      <h1 className="title">Register</h1>
      <Form method="post" className="auth-form">
        <FormInput type="text" label="Name" name="name" />
        <FormInput type="email" label="Email" name="email" />
        <FormInput type="password" label="Password" name="password" />
        {!isPending && <button className="btn primary">Register</button>}
        {isPending && (
          <button className="btn primary" disabled>
            Loading...
          </button>
        )}
      </Form>
      {error && <p className="error">{error}</p>}
      {_error && <p className="error">{_error}</p>}
      <p className="switch">
        Already have an account?
        <Link className="link" to="/login">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;
