import { useState } from "react";
import { Link } from "react-router-dom";
import { createNewUserService } from "../services/userService";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [isOpenAgreeLabel, setIsOpenAgreeLabel] = useState(false);
  const handleOnChangeInput = (e, type) => {
    switch (type) {
      case "NAME":
        setName(e.target.value);
        break;
      case "EMAIL":
        setEmail(e.target.value);
        break;
      case "PASSWORD":
        setPassword(e.target.value);
        break;
      case "CONFIRM_PASSWORD":
        setConfirmPassword(e.target.value);
        break;
      case "AGREE":
        setAgree(e.target.value);
        break;
      default:
        break;
    }
  };
  const handleSignup = async () => {
    if (!agree) {
      setIsOpenAgreeLabel(true);
    } else {
      const res = await createNewUserService({
        name: name,
        email: email,
        password: password,
      });
      if (res.errCode === 0) {
        alert("Đăng kí thành công!");
      } else {
        alert("Đăng kí thất bại!");
      }
    }
  };
  return (
    <section
      className="vh-100 bg-image"
      style={{
        backgroundImage:
          "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)",
      }}
    >
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-3">
                    Đăng kí tài khoản
                  </h2>

                  <form>
                    <div className="form-outline">
                      <label className="form-label w-100 text-start">
                        Họ và tên
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        value={name}
                        onChange={(e) => handleOnChangeInput(e, "NAME")}
                      />
                    </div>

                    <div className="form-outline">
                      <label className="form-label w-100 text-start">
                        Your Email
                      </label>
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        value={email}
                        onChange={(e) => handleOnChangeInput(e, "EMAIL")}
                      />
                    </div>

                    <div className="form-outline">
                      <label className="form-label w-100 text-start">
                        Mật khẩu
                      </label>
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        value={password}
                        onChange={(e) => handleOnChangeInput(e, "PASSWORD")}
                      />
                    </div>

                    <div className="form-outline">
                      <label className="form-label w-100 text-start">
                        Xác nhận lại mật khẩu
                      </label>
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        value={confirmPassword}
                        onChange={(e) =>
                          handleOnChangeInput(e, "CONFIRM_PASSWORD")
                        }
                      />
                      {confirmPassword !== password && (
                        <label className="text-sm text-danger">
                          Mật khẩu xác nhận không giống nhau
                        </label>
                      )}
                    </div>

                    <div className="form-check d-flex justify-content-center mb-1">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        value={agree}
                        onChange={(e) => handleOnChangeInput(e, "AGREE")}
                      />
                      <label className="form-check-label">
                        I agree all statements in{" "}
                        <Link href="#!" className="text-body">
                          <u>Terms of service</u>
                        </Link>
                      </label>
                      {isOpenAgreeLabel && (
                        <label className="text-sm text-danger">
                          Bạn cần đồng ý với điều khoản của chúng tôi.
                        </label>
                      )}
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        onClick={handleSignup}
                      >
                        Đăng kí
                      </button>
                    </div>

                    <p className="text-center text-muted mt-1 mb-0">
                      Bạn đã có tài khoản?{" "}
                      <Link to="/login" className="fw-bold text-body">
                        <u>Đăng nhập</u>
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
