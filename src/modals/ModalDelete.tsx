import { Button, Modal } from "react-bootstrap";

export default function ModalDelete(props: any) {
  const { obj, handleClose, handleDeleteProduct } = props;
  
  return (
    <Modal show={obj.show && obj.idProduct} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete it?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            handleDeleteProduct(obj.idProduct);
            handleClose();
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
