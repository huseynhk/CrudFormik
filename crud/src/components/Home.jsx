import React, { useEffect, useCallback } from "react";
import EditUser from "./EditUser";
import { Link } from "react-router-dom";
import { ROUTER } from "../constant/Router";
import { toast } from "react-toastify";
import { useGlobalContext } from "../contexts/GlobalContext";
import DeleteModal from "./DeleteModal";
import useAxios from "../hooks/useAxios";
import { getUsers, removeUser } from "../services/user";

const Home = () => {
  const {
    isModalOpen,
    editedItem,
    openModal,
    openDeleteModal,
    closeDeleteModal,
    users,
    setUsers,
    handleSortUsers,
  } = useGlobalContext();

  const updateUsers = useCallback(async () => {
    try {
      const res = await getUsers();
      setUsers(res?.data.filter((item) => item.id > 100));
    } catch (error) {
      console.error("Error updating users:", error);
    }
  }, [setUsers]);

  const { loading } = useAxios({
    requestFn: getUsers,
    onSuccess: () => updateUsers(),
  });

  const deleteUser = useCallback(
    async (userId) => {
      try {
        await removeUser(userId);
        await updateUsers();
        toast.success("User deleted successfully!", {
          autoClose: 1000,
        });
        closeDeleteModal();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    },
    [updateUsers, closeDeleteModal]
  );

  const resetSortedData = useCallback( async () => {
    try {
      await updateUsers();
    } catch (error) {
      console.error("Error resetting sorted data:", error);
    }
  },[updateUsers])

  useEffect(() => {
    updateUsers();
  }, [isModalOpen]);

  return (
    <>
      <div className="d-flex justify-content-center align-items-center flex-column">
        <h1 className="text-white mt-2">User List</h1>
        <div className="d-flex justify-content-center align-items-center my-3">
          <select
            className="px-6 py-2 rounded bg-info-subtle "
            onChange={handleSortUsers}
          >
            <option value="A-Z">A-Z Fullname</option>
            <option value="Z-A">Z-A Fullname</option>
            <option value="Low-to-High">Low To High Age</option>
            <option value="High-to-Low">High To Low Age</option>
          </select>

          <button
            className="btn btn-danger ms-2 py-2 px-3"
            onClick={resetSortedData}
          >
            Reset Sort
          </button>
        </div>

        <table className="table table-striped  w-75 fs-4">
          <thead>
            <tr>
              <th>S.No</th>
              <th>FullName</th>
              <th>Age</th>
              <th>Email Address</th>
              <th>Position</th>
              <th>Phone</th>
              <th>Updates</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.fullName}</td>
                  <td>{user.age}</td>
                  <td>{user.email}</td>
                  <td>{user.position}</td>
                  <td>{user.phone}</td>
                  <td>
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => openModal(user)}
                    >
                      Modal
                    </button>
                    <Link
                      className="btn btn-primary"
                      to={`${ROUTER.UpdateUser}/${user.id}`}
                    >
                      Page
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger me-2"
                      onClick={() => openDeleteModal(user)}
                    >
                      Delete
                    </button>
                    <Link
                      className="btn btn-info text-white"
                      to={`${ROUTER.Detail}/${user.id}`}
                    >
                      Info
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <h1>Not Found</h1>
            )}
          </tbody>
        </table>

        {editedItem && <EditUser />}
        <DeleteModal deleteUser={deleteUser} />
      </div>
    </>
  );
};

export default Home;
