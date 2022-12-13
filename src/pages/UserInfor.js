import { useSelector } from "react-redux";

function UserInfo() {
  const userInfo = useSelector((state) => state.user.userInfo);
  console.log(userInfo);
  return (
    <div>
      <h3>Thông tin cá nhân</h3>
      <div className="text-start px-5">
        <p>
          <span className="text-secondary">Họ và tên</span> :{" "}
          {userInfo.name ? userInfo.name : "Chưa cập nhật"}
        </p>
        <p>
          <span className="text-secondary">Địa chỉ email</span> :{" "}
          {userInfo.email ? userInfo.email : "Chưa cập nhật"}
        </p>
        <p>
          <span className="text-secondary">Ngày sinh</span> :{" "}
          {userInfo.birthDay ? userInfo.birthDay : "Chưa cập nhật"}
        </p>
        <p>
          <span className="text-secondary">Số điện thoại</span> :{" "}
          {userInfo.phoneNumber ? userInfo.phoneNumber : "Chưa cập nhật"}
        </p>
      </div>
    </div>
  );
}

export default UserInfo;
