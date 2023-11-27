import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTER } from "../constant/Router";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { getSingleUser, updateUser } from "../services/user";
import useAxios from "../hooks/useAxios";

const initialState = {
  fullName: "",
  age: 0,
  email: "",
  position: "",
};

const UpdateUser = () => {
  const [editedUser, setEditedUser] = useState(initialState);
  const { userId } = useParams();
  const navigate = useNavigate();

  const { loading, error } = useAxios({
    requestFn: () => getSingleUser(userId),
  });
  
  const fetchUserData = async () => {
    try {
      const response = await getSingleUser(userId);
      setEditedUser(response?.data || initialState);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const handleEditUser = async () => {
    try {
      await updateUser(userId, editedUser);
      toast.success("User updated successfully!", {
        autoClose: 1000,
      });
      navigate(ROUTER.Home);
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user. Please try again.", {
        autoClose: 1000,
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="d-flex justify-content-center align-items-center flex-column ">
      <h1 className="text-white my-4">Edit User</h1>
      <div className="bg-dark-subtle w-50 text-center rounded  border border-primary">
        <div>
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={editedUser.fullName}
            onChange={handleInputChange}
            className="p-2 w-75 my-2 border border-primary rounded"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={editedUser.email}
            onChange={handleInputChange}
            className="p-2 w-75 my-1 border border-primary rounded"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Position"
            name="position"
            value={editedUser.position}
            onChange={handleInputChange}
            className="p-2 w-75 my-1 border border-primary rounded"
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Age"
            name="age"
            value={editedUser.age}
            onChange={handleInputChange}
            className="p-2 w-75 my-1 border border-primary rounded"
          />
        </div>

        <Button className="m-2 px-4" onClick={handleEditUser}>
          Edit User
        </Button>
      </div>
    </div>
  );
};

export default UpdateUser;
