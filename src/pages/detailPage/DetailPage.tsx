import { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa6";

import { useAppSelector, useAppDispatch } from "@/src/hooks/hooks";
import UserService from "@/src/services/user/userSevices";
import { addUserStore } from "@/src/stores/userReducer";
import ModalUpdateImg from "./modalUpdateImg/ModalUpdateImg";

const UserSevices = new UserService();
export default function DetailPage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const { email, name, description, region, state, avatar } = user;
  const getUser = async () => {
    const user = await UserSevices.getUser();
    const { token, ...data } = user.data;
    dispatch(addUserStore(data));
  };

  const [isToggleAvatar, setIsToggleAvatar] = useState<boolean>(false);
  const handleClose = () => setIsToggleAvatar(false);

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div
      className="d-flex justify-content-center row border rounded"
      style={{ width: "60%" }}
    >
      <div style={{ padding: "2rem" }} className="col-8">
        <h3>Email</h3>
        <p>{email}</p>
        <h3>User Name</h3>
        <p>{name}</p>
        <h3>Description</h3>
        <p>{description}</p>
        <h3>Region</h3>
        <p>{region}</p>
        <h3>State</h3>
        <p>{state}</p>
      </div>
      <div style={{ padding: "2rem" }} className="col-4">
        <img
          className="rounded-circle"
          src={
            avatar
              ? `http://api.training.div3.pgtest.co/${avatar}`
              : "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
          }
          alt=""
          style={{ maxWidth: "10rem" }}
          onClick={() => setIsToggleAvatar(true)}
        />
        <div></div>
        <ModalUpdateImg
          style={{ transition: ".3s" }}
          show={isToggleAvatar}
          onHide={handleClose}
          handleClose={handleClose}
          getUser={getUser}
        />
      </div>
    </div>
  );
}
