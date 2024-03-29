import BaseServices from "../baseServices";

const URL = "http://api.training.div3.pgtest.co/api/v1";

class ProductSevices extends BaseServices {
  constructor() {
    super(URL, {});
  }
  getProduct() {
    return this.get("/product", {});
  }

  getProductDetail(id: number) {
    return this.get(`/product/${id}`, {});
  }

  editProduct(data: object) {
    return this.put("/product", data, {});
  }

  createProduct(data: object) {
    return this.post("/product", data, {});
  }

  deleteProduct(id: number) {
    return this.delete(`/product/${id}`);
  }
}

export default ProductSevices;
