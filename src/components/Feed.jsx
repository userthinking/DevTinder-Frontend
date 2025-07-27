import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });
      //   console.log(res.data);
      dispatch(addFeed(res?.data?.users));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  
  if (!feed) return <h1>Loading...</h1>;
  if (feed.length === 0) return <h1>No users found</h1>;

  return (
    feed && feed.length > 0 &&(
      <div className="flex justify-center my-10">
        <UserCard key={feed._id} user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
