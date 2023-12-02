import React, { useState } from "react";
import { updateUser } from "../services/user";
import { Modal, Form, Button } from "react-bootstrap";
import { useGlobalContext } from "../contexts/GlobalContext";
import { toast } from "react-toastify";

const EditUser = () => {
  const { isModalOpen, editedItem, closeModal } = useGlobalContext();
  const [editedUser, setEditedUser] = useState(editedItem);

  const editUser = async () => {
    await updateUser(editedUser.id, editedUser);
    closeModal();
    toast.success("User updated successfully!", {
      autoClose: 1000,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };
  return (
    <div>
      <Modal show={isModalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={editedUser.fullName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="phone"
                name="phone"
                value={editedUser.phone}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                name="position"
                value={editedUser.position}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={editedUser.age}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center align-items-center">
          <Button variant="primary" className="py-2 px-5" onClick={editUser}>
            Save User
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditUser;
