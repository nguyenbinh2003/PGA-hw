import { Formik, Form, Field } from "formik";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaStarOfLife } from "react-icons/fa6";
import Swal from "sweetalert2";

import ProductSevices from "@/src/services/product/productSevices";
import { createProductSchema } from "@/src/utils/formSchema";

const ProductSevice = new ProductSevices();

function ModalCreateProduct(props: any) {
  const { getProduct, isShowModalCreate, setIsShowModalCreate } = props;

  const handleSubmit = async (data: object) => {
    const newProduct: any = await ProductSevice.createProduct(data);
    console.log("🚀 ~ handleSubmit ~ newProduct:", newProduct)
    if (newProduct.code < 400) {
      getProduct();
      setIsShowModalCreate(false);
    } 
  };

  return (
    <>
      <Modal
        show={isShowModalCreate}
        onHide={() => setIsShowModalCreate(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal Create</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              client: "",
              order: "",
              status: "",
              total: 0,
              currency: "",
              fundingMethod: "",
            }}
            validationSchema={createProductSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <div className="mb-2">
                <label htmlFor="client" className="mb-2">
                  Client <FaStarOfLife size={7} color="red" />
                </label>
                <Field
                  id="client"
                  className={`form-control`}
                  name="client"
                  type="text"
                  placeholder="Client Name..."
                />
              </div>
              <div className="mb-2">
                <label htmlFor="order" className="mb-2">
                  Order <FaStarOfLife size={7} color="red" />
                </label>
                <Field
                  id="order"
                  className={`form-control`}
                  name="order"
                  type="text"
                  placeholder="Order..."
                />
              </div>
              <div className="mb-2">
                <label htmlFor="status" className="mb-2">
                  Status <FaStarOfLife size={7} color="red" />
                </label>
                <Field
                  id="status"
                  className={`form-select`}
                  name="status"
                  as="select"
                >
                  <option selected>-- select an option --</option>
                  <option value="PROCESSING">PROCESSING</option>
                  <option value="PENDING">PENDING</option>
                  <option value="RECEIVED">RECEIVED</option>
                  <option value="FULFILLED">FULFILLED</option>
                </Field>
              </div>
              <div className="mb-2">
                <label htmlFor="total" className="mb-2">
                  Total <FaStarOfLife size={7} color="red" />
                </label>
                <Field
                  id="total"
                  className={`form-control`}
                  name="total"
                  type="number"
                  placeholder="Total..."
                />
              </div>
              <div className="mb-2">
                <label htmlFor="currency" className="mb-2">
                  Currency <FaStarOfLife size={7} color="red" />
                </label>
                <Field
                  id="currency"
                  className={`form-control`}
                  name="currency"
                  type="text"
                  placeholder="currency Name..."
                />
              </div>
              <div className="mb-2">
                <label htmlFor="fundingMethod" className="mb-2">
                  Funding Method <FaStarOfLife size={7} color="red" />
                </label>
                <Field
                  id="fundingMethod"
                  className={`form-control`}
                  name="fundingMethod"
                  type="text"
                  placeholder="Funding Method..."
                />
              </div>
              <div className="d-flex justify-content-end mt-4 mb-2">
                <Button
                  variant="secondary"
                  onClick={() => setIsShowModalCreate(false)}
                >
                  Close
                </Button>
                <Button variant="primary" type="submit" className="ms-3">
                  Create
                </Button>
              </div>
            </Form>
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalCreateProduct;
