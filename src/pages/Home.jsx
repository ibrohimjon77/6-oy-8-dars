import React from "react";
import useLogout from "../hooks/useLogout";
import { useDispatch, useSelector } from "react-redux";
import { useCollection } from "../hooks/useCollection";

function Home() {
  const { _logout, error, isPending } = useLogout();
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const {data} = useCollection('users')
console.log(data);

  return (
    <div className="">
      <div className="url-img">
        <h1 className="welcome">
          Welcome, <span>{user.displayName}</span>
        </h1>
        <img src={user.photoURL} alt="" width={50} height={50} />
      </div>
      <p className="subtitle">You are successfully logged in </p>

      {error && <p className="error">{error}</p>}

      <div className="btn-group">
        {!isPending && (
          <button className="btn logout" onClick={() => dispatch(_logout())}>
            Logout
          </button>
        )}
        {isPending && (
          <button className="btn logout" disabled>
            Loading...
          </button>
        )}
      </div>
      {data && (
        <div className="users-list">
          {data.map((u) => (
            <div key={u.uid} className="user-card">
              <img src={u.photoURL} alt={u.displayName} />
              <h4>{u.displayName}</h4>
              <p className={`status ${u.online ? "online" : "offline"}`}>
                {u.online ? "Online" : "Offline"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
