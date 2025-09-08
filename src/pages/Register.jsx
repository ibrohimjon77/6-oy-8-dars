import React, { useEffect, useState } from "react";
import { Form, Link, useActionData } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useRegister } from "../hooks/useRegister";
import { fromError } from "../components/ErrorId";
import { useGoogle } from "../hooks/useGoogle";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  return data;
}

function Register() {
  const user = useActionData();
  const [error, setError] = useState(null);
  const { register, isPending, error: _error } = useRegister();
  const {
    googleProvider,
    isPending: isPendingGoogle,
    error: errorGoogle,
  } = useGoogle();

  useEffect(() => {
    if (user?.name && user?.email && user?.password) {
      register(user.name, user.email, user.password);
      setError(false);
    } else {
      setError(user ? fromError(user) : false);
    }
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-teal-200 to-blue-200 p-6">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl border border-white/40 p-8">
        <h1 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-green-500 to-teal-600 bg-clip-text text-transparent drop-shadow-md">
          🌿 Register
        </h1>

        <Form method="post" className="space-y-5">
          <FormInput   type="text" label="Name" name="name" />
          <FormInput type="email" label="Email" name="email" />
          <FormInput type="password" label="Password" name="password" />

          <div className="flex flex-col gap-3">
            {!isPending && (
              <button className="w-full py-3 rounded-xl bg-gradient-to-r from-green-400 to-teal-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-green-300 transition-transform duration-300">
                Register
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

            {!isPendingGoogle && (
              <button
                type="button"
                onClick={googleProvider}
                className="w-full py-3 rounded-xl border border-gray-300 bg-white text-gray-700 font-semibold shadow hover:scale-105 hover:shadow-md transition-transform duration-300"
              >
                Continue with Google
              </button>
            )}
            {isPendingGoogle && (
              <button
                disabled
                className="w-full py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-400 font-semibold shadow opacity-70"
              >
                Loading...
              </button>
            )}
          </div>
        </Form>

        {(error || _error || errorGoogle) && (
          <div className="mt-4 text-center text-red-500 text-sm">
            {error && <p>{error}</p>}
            {_error && <p>{_error}</p>}
            {errorGoogle && <p>{errorGoogle}</p>}
          </div>
        )}

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-teal-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
