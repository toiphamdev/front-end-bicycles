import _ from "lodash";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Modal, Button, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import {
  createOrderService,
  getBicycleByNameService,
} from "../services/appService";

function Search() {
  const [searchInput, setSearchInput] = useState();
  const [item, setItem] = useState({});
  const [modal, setModal] = useState(false);
  const userEmail = useSelector((state) => state.user.userInfo.email);
  const toggle = () => {
    setModal(!modal);
  };
  const handleSearch = async () => {
    let res = await getBicycleByNameService(searchInput);
    if (res && res.errCode === 0) {
      setItem(res.data);
    }
  };
  const createOrder = async () => {
    let res = await createOrderService({
      userEmail: userEmail,
      bicycleId: item.id,
    });
    if (res && res.errCode === 0) {
      toast.success("Thuê thành công!");
    } else {
      toast.error("Thuê thất bại!");
    }
  };
  return (
    <div>
      <div className="input-group d-flex justify-content-center">
        <div className="form-outline">
          <input
            type="search"
            id="form1"
            placeholder="Nhập mã xe"
            className="form-control"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <button
          type="button"
          onClick={() => handleSearch()}
          className="btn btn-primary"
        >
          <i className="fas fa-search"></i>
        </button>
      </div>
      {!_.isEmpty(item) ? (
        <div className="row mt-1 align-items-center">
          <img
            className="col-2 col-sm-2 img-thumbnail"
            src={item.typeData && item.typeData.image}
          />
          <span className="col-4 col-sm-4">{item.name}</span>
          <span className="col-4 col-sm-4">
            {item.isRentting ? "Đã thuê" : "Còn trống"}
          </span>
          <div className="col-2 col-sm-2 ">
            <button
              className={
                item.isRentting ? "btn btn-primary disabled" : "btn btn-primary"
              }
              onClick={() => {
                toggle();
              }}
            >
              Thuê
            </button>
          </div>
        </div>
      ) : (
        <span>Vui lòng nhập đúng mã</span>
      )}
      <Modal
        isOpen={modal}
        modalTransition={{ timeout: 700 }}
        backdropTransition={{ timeout: 1300 }}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Thuê xe</ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-4">
              <label>Mã xe</label>
              <input readOnly value={item.name} className="form-control" />
            </div>
            <div className="col-4">
              <label>Giá tiền theo giờ</label>
              <input
                readOnly
                value={item.typeData && item.typeData.price + ` VNĐ`}
                className="form-control"
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              toggle();
              createOrder();
            }}
          >
            Thuê ngay
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Search;
