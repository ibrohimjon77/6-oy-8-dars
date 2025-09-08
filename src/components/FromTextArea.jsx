import React from "react";

function FormTextArea({ label, name, type }) {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text font-semibold text-gray-700">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        className="input input-bordered w-full rounded-xl border-2 border-green-300 focus:border-green-500 focus:ring-4 focus:ring-green-200 shadow-sm transition-all duration-300"
      />
    </div>
  );
}

export default FormTextArea;
