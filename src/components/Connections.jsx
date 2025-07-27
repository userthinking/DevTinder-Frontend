import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import ConnectionCard from "./ConnectionCard";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      //   console.log(res.data.connections);
      dispatch(addConnections(res.data.connections));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0) return <h1>No Connections Found...</h1>;

  return (
    <div className="flex justify-center my-6 flex-col items-center gap-4 flex-wrap">
      <h1 className="font-semibold text-3xl">Your Connections</h1>
      <div className="flex flex-wrap gap-4 mt-4">
        {connections.map((connection) => (
          <ConnectionCard key={connection._id} user={connection} />
        ))}
      </div>
    </div>
  );
};

export default Connections;
