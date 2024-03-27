import BaseServices from "../baseServices";

const URL = "http://api.training.div3.pgtest.co/api/v1";

class UserService extends BaseServices {
  constructor() {
    super(URL, {});
  }
  getUser() {
    return this.get("/user", {});
  }

  getProduct() {
    return this.get("/product", {});
  }

  uploadAvatar(dataForm: object) {
    return this.put("/user", dataForm);
  }
}

export default UserService;
