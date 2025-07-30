import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestsSlice";
import RequestCard from "./RequestCard";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequests = async (status, id) => {
    try {
      const res = axios.post(
        `${BASE_URL}/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(id))
    } 
    catch (error) {
      console.log(error);
    }
    
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.requests));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return <h1>Loading...</h1>;
  if (requests.length === 0) return <h1>No requests found</h1>;

  return (
    <div className="flex gap-6 my-8 px-4 flex-wrap">
      {requests.map((request) => (
        <RequestCard key={request.fromUserId._id} user={request.fromUserId} reviewRequests={reviewRequests} id={request._id} />
      ))}
    </div>
  );
};

export default Requests;
