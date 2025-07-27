import React, { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ user }) => {
  if (!user) return <div className="text-center mt-10">Loading profile...</div>;

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState(user.skills);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);

  const dispatch = useDispatch();

  const handleSaveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.loggedInUser));
      setToast(true);
      setTimeout(() => setToast(false), 2000);
    } catch (error) {
      setError(error.response.data.error);
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center gap-2">
        <div className="flex justify-center p-4">
          <div className="card bg-base-300 w-full max-w-3xl shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center mb-4">Edit Profile</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input w-full"
                    placeholder="Type here"
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input w-full"
                    placeholder="Type here"
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Profile URL</legend>
                  <input
                    type="text"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className="input w-full"
                    placeholder="Type here"
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Age</legend>
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="input w-full"
                    placeholder="Type here"
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Gender</legend>
                  <input
                    type="text"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="input w-full"
                    placeholder="Type here"
                  />
                </fieldset>

                <fieldset className="fieldset col-span-1 md:col-span-2">
                  <legend className="fieldset-legend">About</legend>
                  <input
                    type="text"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="input w-full"
                    placeholder="Type here"
                  />
                </fieldset>
              </div>
              {error && <div className="text-red-500">{error}</div>}
              <div className="card-actions justify-center mt-4">
                <button className="btn btn-primary" onClick={handleSaveProfile}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>

      {toast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
