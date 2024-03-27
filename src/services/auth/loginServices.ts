import BaseServices from "../baseServices";

const URL = "http://api.training.div3.pgtest.co/api/v1";
class LoginService extends BaseServices {
  constructor() {
    super(URL, {});
  }
  login(data: object = {}) {
    return this.post("/auth/login", data, {});
  }
}

export default LoginService;
