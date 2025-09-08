import React from "react";
import useLogout from "../hooks/useLogout";
import { useDispatch, useSelector } from "react-redux";
import { useCollection } from "../hooks/useCollection";
import { Link } from "react-router-dom";

function Home() {
  const { _logout, error, isPending } = useLogout();
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const { data } = useCollection("users");
  const { data: tasks } = useCollection("tasks", "desc");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-teal-200 to-blue-200 animate-gradient py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/30">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-green-600 to-teal-700 bg-clip-text text-transparent">
            Welcome, {user.displayName} 🌿
          </h1>
          <img
            src={user.photoURL}
            alt={user.displayName}
            className="w-14 h-14 rounded-full border-2 border-green-400 shadow-md"
          />
        </div>

        <p className="mb-6 text-gray-700 text-lg">
          You are successfully logged in ✅
        </p>

        <div className="flex gap-4 mb-10">
          <Link
            to="/create"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-400 to-green-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-green-300 transition-transform duration-300"
          >
            ➕ Create Task
          </Link>

          {!isPending && (
            <button
              className="px-6 py-3 rounded-xl bg-red-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-red-300 transition-transform duration-300"
              onClick={() => dispatch(_logout())}
            >
              🚪 Logout
            </button>
          )}
          {isPending && (
            <button className="btn btn-error loading">Logging out...</button>
          )}
        </div>

        {error && <p className="text-red-500 mb-6">{error}</p>}

        <h2 className="text-2xl font-bold mb-6 text-teal-700 drop-shadow-sm">
          👥 Users
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {data &&
            data.map((u) => (
              <div
                key={u.uid}
                className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 flex flex-col items-center border border-white/30 hover:scale-105 hover:shadow-green-200 transition-all duration-300"
              >
                <img
                  src={u.photoURL}
                  alt={u.displayName}
                  className="w-20 h-20 rounded-full mb-3 shadow-md border-2 border-teal-400"
                />
                <h4 className="font-semibold text-gray-800">{u.displayName}</h4>
                <p
                  className={`badge mt-3 px-3 py-1 rounded-full text-sm ${
                    u.online
                      ? "bg-green-500/20 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {u.online ? "Online" : "Offline"}
                </p>
              </div>
            ))}
        </div>

        <h2 className="text-2xl font-bold mb-6 text-teal-700 drop-shadow-sm">
          📋 Tasks
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tasks &&
            tasks.map((task) => (
              <Link
                key={task.id}
                to={`/task/${task.id}`}
                className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/30 p-6 hover:scale-105 hover:shadow-green-300 transition-all duration-300 block"
              >
                <h5 className="text-xl font-bold text-teal-700 mb-2">
                  {task.title}
                </h5>
                <div className="flex flex-wrap gap-2">
                  {task.attachedUsers?.map((user) => (
                    <span
                      key={user.uid}
                      className="flex items-center gap-2 bg-teal-50 px-3 py-1 rounded-full shadow-sm"
                    >
                      <img
                        src={user.photoURL}
                        alt={user.name}
                        className="w-6 h-6 rounded-full border border-teal-300"
                      />
                      <span className="text-sm text-gray-700">{user.name}</span>
                    </span>
                  ))}
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
