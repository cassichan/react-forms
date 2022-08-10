import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Form from "../Components/Form";

export default function Contact() {
  const [show, setShow] = useState(false);
  const [stateFromChild, setStateFromChild] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log("stateFromChild =>", stateFromChild);
  return (
    <>
      <h3>This is contact -> hi {stateFromChild.title}</h3>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Contact Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            handleClose={handleClose}
            setStateFromChild={setStateFromChild}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
