import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { GoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";
import Cookie from "js-cookie";

function LogoutModal({ show, handleClose, handleLogout }) {
  const history = useHistory();

  const logout = () => {
    Cookie.remove("token");
    handleClose();
    history.push("/auth/login");
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="sm">
        <Modal.Header closeButton>
          <Modal.Title>Ready to Leave?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Select "Logout" below if you are ready to end your current session.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          {/* <Button variant="secondary" onClick={handleLogout}>
						logout
					</Button> */}
          <GoogleLogout
            clientId="1052484586739-rqkqj8g1np4la6slf2r4amrb4nsl0a5f.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={logout}
          ></GoogleLogout>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LogoutModal;
