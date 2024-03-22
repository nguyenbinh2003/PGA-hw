import BaseServices from "../baseServices";

const URL = "https://api.gearfocus.div4.pgtest.co/api/authentication";
class LoginService extends BaseServices {
  constructor() {
    super(URL, {});
  }
  login(data: object = {}) {
    return this.post("/login", data, {});
  }
}

export default LoginService;
