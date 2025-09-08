import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import FromTextArea from "../components/FromTextArea";
import Select from "react-select";
import { useCollection } from "../hooks/useCollection";
import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

function CreateTask() {
  const navigate = useNavigate();
  const { data } = useCollection("users");
  const [userOptions, setUserOptions] = useState(null);
  const [attachedUsers, setAttachedUsers] = useState([]);

  useEffect(() => {
    const users = data?.map((user) => {
      return {
        value: user.displayName,
        label: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
      };
    });
    setUserOptions(users);
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const title = formData.get("title");
    const description = formData.get("description");
    const dueTo = formData.get("due-to");

    const task = {
      title,
      description,
      attachedUsers,
      dueTo,
      comments: [],
      timestamp: serverTimestamp(),
    };

    await addDoc(collection(db, "tasks"), {
      ...task,
    }).then(() => {
      navigate("/");
      alert("Q'oshildi !");
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-green-100 to-teal-200 animate-gradient">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/30 transform transition-all hover:scale-[1.01] hover:shadow-green-200">
        <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-teal-500 to-green-700 bg-clip-text text-transparent mb-8 drop-shadow-lg">
          🌿 Create a New Task
        </h1>

        <form onSubmit={handleSubmit} method="post" className="space-y-6">
          <div className="input input-bordered w-full rounded-xl border-2 border-green-300 focus:border-green-500 focus:ring-4 focus:ring-green-200 shadow-sm transition-all duration-300">
            <FormInput label="Title" name="title" type="text" />
          </div>

          <div>
            <FromTextArea label="Description" name="description" />
          </div>

          <div className="input input-bordered w-full rounded-xl border-2 border-green-300 focus:border-green-500 focus:ring-4 focus:ring-green-200 shadow-sm transition-all duration-300">
            <FormInput label="Due to:" name="due-to" type="date" />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-semibold text-gray-700">
                Assign Users 👥
              </span>
            </label>
            <Select
              isMulti
              value={attachedUsers}
              options={userOptions}
              className="react-select-container"
              classNamePrefix="react-select"
              onChange={(selected) => setAttachedUsers(selected)}
              styles={{
                control: (base) => ({
                  ...base,
                  borderRadius: "12px",
                  borderColor: "#34d399",
                  padding: "4px",
                  boxShadow: "0 0 10px rgba(52,211,153,0.2)",
                  "&:hover": {
                    borderColor: "#10b981",
                  },
                }),
              }}
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="btn btn-lg bg-gradient-to-r from-green-400 to-teal-500 text-white border-none rounded-xl shadow-lg hover:scale-105 hover:shadow-teal-300 transition-transform duration-300"
            >
              🌱 Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTask;
