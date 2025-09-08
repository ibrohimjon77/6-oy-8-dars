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
  const { _login, error: _error, isPending } = useLogin();
  const user = useActionData();
  const [error, setError] = useState(null);
  const { resetPassword } = useResetPassword();
  const [forgetPassword, setForgetPassword] = useState(false);

  useEffect(() => {
    if (user?.email && user?.password) {
      _login(user.email, user.password);
      setError(false);
    } else {
      setError(user ? fromError(user) : false);
    }
    if (user?.emailRecovery) {
      resetPassword(user.emailRecovery);
      setError(false);
    }
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-teal-200 to-blue-200 p-6">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl border border-white/40 p-8">
        <h1 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-teal-500 to-green-600 bg-clip-text text-transparent drop-shadow-md">
          🌱 Login
        </h1>

        {!forgetPassword && (
          <Form method="post" className="space-y-5">
            <FormInput type="email" label="Email" name="email" />
            <FormInput type="password" label="Password" name="password" />

            {!isPending && (
              <button className="w-full py-3 rounded-xl bg-gradient-to-r from-green-400 to-teal-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-green-300 transition-transform duration-300">
                Login
              </button>
            )}
            {isPending && (
              <button
                disabled
                className="w-full py-3 rounded-xl bg-gradient-to-r from-green-400 to-teal-500 text-white font-semibold shadow-lg opacity-70"
              >
                Loading...
              </button>
            )}
          </Form>
        )}

        {forgetPassword && (
          <Form method="post" className="space-y-5">
            <FormInput type="email" label="Email" name="emailRecovery" />
            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-green-400 to-teal-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-green-300 transition-transform duration-300">
              Send Reset Link
            </button>
          </Form>
        )}

        <div className="mt-5 flex justify-center">
          <button
            type="button"
            className="text-sm text-teal-600 hover:underline"
            onClick={() => setForgetPassword(!forgetPassword)}
          >
            {forgetPassword ? "← Back to Login" : "Forgot Password?"}
          </button>
        </div>

        {(error || _error) && (
          <div className="mt-4 text-center text-red-500 text-sm">
            {error && <p>{error}</p>}
            {_error && <p>{_error}</p>}
          </div>
        )}

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-teal-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
