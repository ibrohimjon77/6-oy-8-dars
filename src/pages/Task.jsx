import React from "react";
import { useParams } from "react-router-dom";
import useDocument from "../hooks/useDocument";
import { db } from "../firebase/config";
import { useSelector } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";

function Task() {
  const { id } = useParams();
  const { data } = useDocument("tasks", id);
  const { user } = useSelector((store) => store.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const comment = formData.get("comment");

    const newComment = {
      text: comment,
      uid: user.uid,
      id: Math.random(),
      photoURL: user.photoURL,
      displayName: user.displayName,
    };

    e.target.reset();

    const commentRef = doc(db, "tasks", data.id);
    await updateDoc(commentRef, {
      comments: [...(data.comments || []), newComment],
    });
  };

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-green-100 via-teal-200 to-blue-200">
        <span className="loading loading-spinner loading-lg text-teal-600"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-teal-200 to-blue-200 py-12 px-4">
      <div className="max-w-3xl mx-auto p-8 bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl border border-white/40">
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-green-600 to-teal-700 bg-clip-text text-transparent mb-8 drop-shadow-md">
          {data.title}
        </h1>

        {/* Comments */}
        <div className="space-y-5">
          <h2 className="text-lg font-semibold text-gray-800">💬 Comments</h2>
          {(!data.comments || data.comments.length === 0) && (
            <p className="text-gray-500 italic">
              No comments yet. Be the first! 🌱
            </p>
          )}

          {data.comments &&
            data.comments.map((comment) => (
              <div
                key={comment.id}
                className="flex items-start gap-4 p-4 bg-white/70 rounded-xl shadow-md border border-gray-100 hover:shadow-teal-200 transition-all duration-300"
              >
                <img
                  src={comment.photoURL}
                  alt={comment.displayName}
                  className="w-12 h-12 rounded-full border-2 border-teal-400 shadow-sm"
                />
                <div>
                  <p className="font-semibold text-teal-700">
                    {comment.displayName}
                  </p>
                  <p className="text-sm text-gray-600">{comment.text}</p>
                </div>
              </div>
            ))}
        </div>

        {/* Add Comment */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 flex items-center gap-3 bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-md border border-gray-100"
        >
          <input
            type="text"
            name="comment"
            placeholder="Type your thoughts..."
            className="input input-bordered w-full rounded-lg border-teal-400 focus:ring-2 focus:ring-teal-300 shadow-sm"
            required
          />
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-green-500 text-white font-semibold shadow-md hover:scale-105 hover:shadow-green-300 transition-transform duration-300"
          >
            ➕ Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default Task;
