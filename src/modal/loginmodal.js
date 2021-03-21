import React from "react";
import "./modal.scss";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

export default class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.userRef = React.createRef();
  }
  storeUser = (val) => {
    sessionStorage.setItem("isLoggedIn", true);
    this.props.closeModal();
  };

  render() {
    return (
      <Modal open={this.props.modalIsOpen} onClose={this.props.closeModal}>
        <div className="modal" id="modal">
          <h2>Please login </h2>
          <div className="content">
            <label>Name</label>
            <input type="text" ref={this.userRef} />
          </div>
          <div className="actions">
            <button className="toggle-button" onClick={this.storeUser}>
              Submit
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}
