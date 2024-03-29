import { Field, Form, Formik } from "formik";
import { Button, Modal } from "react-bootstrap";
import { FaStarOfLife } from "react-icons/fa6";

import ProductSevices from "@/src/services/product/productSevices";
import { createProductSchema } from "@/src/utils/formSchema";
import { handleFormatDate, reformatString } from "@/src/utils/format/format";

const ProductSevice = new ProductSevices();

export default function ModalViewDetail(props: any) {
  const { isShowDetail, handleCloseDetail, dataDetail, getProduct } = props;

  const handleSubmit = async (values: object) => {
    const product = await ProductSevice.editProduct(values);
    console.log(product);
    if (product.code < 400) {
      getProduct();
      handleCloseDetail();
    }
  };

  return (
    <Modal show={isShowDetail} size="xl" centered>
      <Modal.Header>
        <Modal.Title>View Product Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            client: dataDetail?.client,
            order: dataDetail?.order,
            status: dataDetail?.status,
            total: dataDetail?.total,
            currency: dataDetail?.currency,
            fundingMethod: dataDetail?.fundingMethod,
          }}
          validationSchema={createProductSchema}
          onSubmit={(values) => handleSubmit({ id: dataDetail.id, ...values })}
        >
          <Form className="row">
            <div className="col-6">
              <div className="mb-2">
                <label htmlFor="client" className="mb-2">
                  Client <FaStarOfLife size={7} color="red" />
                </label>
                <Field
                  id="client"
                  className={`form-control`}
                  name="client"
                  type="text"
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
                />
              </div>
            </div>
            <div className="col-6">
              <div className="mb-2">
                <label htmlFor="currency" className="mb-2">
                  Currency <FaStarOfLife size={7} color="red" />
                </label>
                <Field
                  id="currency"
                  className={`form-control`}
                  name="currency"
                  type="text"
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
                />
              </div>
              <div className="mb-2">
                <label htmlFor="" className="mb-2">
                  Date
                </label>
                <Field
                  type="text"
                  value={handleFormatDate(dataDetail.updatedAt || "")}
                  disabled
                  className={`form-control`}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="" className="mb-2">
                  Invoice #
                </label>
                <Field
                  type="text"
                  disabled
                  className={`form-control`}
                  value={reformatString(dataDetail.invoice || "#qweqweoi123")}
                />
              </div>
            </div>
            <div className="d-flex justify-content-end mt-4 mb-2">
              <Button variant="secondary" onClick={() => handleCloseDetail()}>
                Close
              </Button>
              <Button variant="primary" type="submit" className="ms-3">
                Save Changes
              </Button>
            </div>
          </Form>
        </Formik>
      </Modal.Body>
    </Modal>
  );
}
