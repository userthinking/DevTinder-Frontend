import React from "react";

const ConnectionCard = ({ user }) => {
  const { firstName, lastName, photoUrl, about} = user;

  return (
    <div className="card card-side bg-base-200 shadow-md w-96 flex-wrap">
      <figure className="w-40 h-40 object-cover">
        <img
          src={photoUrl}
          alt={`${firstName}'s profile`}
          className="w-full h-full object-cover rounded-l-lg"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-lg font-semibold">
          {firstName} {lastName}
        </h2>

        {about && (
          <p className="text-sm text-gray-400 line-clamp-2">{about}</p>
        )}

        <div className="card-actions justify-end mt-auto">
          <button className="btn btn-primary btn-sm">Chat</button>
        </div>
      </div>
    </div>
  );
};

export default ConnectionCard;
