import React, { Fragment, useState } from "react";
import styles from "./ManageOrderItem.module.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Order Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>
          Address: {props.order.address} Pincode: {props.order.pincode}
        </h5>
        <h5>Items</h5>
        <table className="table">
          <thead>
            <tr className="thead-dark">
              <th>Name</th>
              <th>Quantity</th>
              <th>HB Price</th>
            </tr>
          </thead>
          <tbody>
            {props.order.orderItems.map((item) => {
              return (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.hbPrice}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const ManageOrderItem = ({ data }) => {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <tr>
      <td>{data.o_id}</td>
      <td>{data.date}</td>
      <td>{data.name}</td>
      <td>{data.amount}</td>
      <td>{data.status === "true" ? "Paid" : "Not paid"}</td>
      <td>{data.method}</td>
      <td>
        <i
          className="fa fa-plus"
          onClick={() => setModalShow(true)}
          style={{ cursor: "pointer" }}
        />
      </td>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        order={data}
      />
    </tr>
  );
};

export default ManageOrderItem;
