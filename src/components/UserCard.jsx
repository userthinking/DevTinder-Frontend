import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, photoUrl, about, skills } = user;
  const dispatch = useDispatch();
  const handleSendRequest = async (status, id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt={`${firstName}'s profile`} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        {age && gender && (
          <p>
            {age} {gender}
          </p>
        )}
        {skills && skills.length > 0 && (
          <div className="flex flex-wrap gap-2 my-2">
            {skills.map((skill) => (
              <span key={skill} className="badge badge-outline bg-green-800">
                {skill}
              </span>
            ))}
          </div>
        )}
        <p>{about}</p>
        <div className="card-actions justify-center mt-4">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", user._id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", user._id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
