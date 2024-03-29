import BaseServices from "../baseServices";

const URL = "http://api.training.div3.pgtest.co/api/v1";

class UserService extends BaseServices {
  constructor() {
    super(URL, {});
  }
  getUser() {
    return this.get("/user", {});
  }

  uploadAvatar(data: any) {
    return this.putAvatar("/user", data);
  }
}

export default UserService;
