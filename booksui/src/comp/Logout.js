import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaPowerOff } from "react-icons/fa"; // Importing the logout icon from react-icons

export default function Logout(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function logout() {
    localStorage.removeItem("accessToken");
    setShow(false); 
    props.settoken(null);
  }

  return (
    <>
      <div onClick={handleShow} style={{ cursor: "pointer" }}>
        <FaPowerOff size={20} /> 
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={logout}>
            Log Out
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
