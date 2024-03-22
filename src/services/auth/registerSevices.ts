import BaseServices from "../baseServices";

const URL = "http://api.training.div3.pgtest.co/api/v1";
class RegisterService extends BaseServices {
  constructor() {
    super(URL, {});
  }

  getLocation() {
    return this.get("/location", {});
  }

  getState(pid: string) {
    return this.get(`/location?pid=${pid}`, {});
  }

  register(data: object = {}) {
    return this.post("/auth/register", data, {});
  }
}

export default RegisterService;
