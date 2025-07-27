import React from "react";

const RequestCard = ({ user, reviewRequests, id }) => {
  const { photoUrl, firstName, lastName, about } = user;
  return (
    <div className="card card-side bg-base-200 shadow-md w-96">
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

        {about && <p className="text-sm text-gray-400 line-clamp-2">{about}</p>}

        <div className="card-actions justify-end mt-auto">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => reviewRequests("rejected", id)}
          >
            Reject
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => reviewRequests("accepted", id)}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
