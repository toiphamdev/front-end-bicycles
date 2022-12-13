import { useEffect, useState } from "react";
import _ from "lodash";
import Pagination from "@atlaskit/pagination";
import { useParams } from "react-router-dom";
import {
  createOrderService,
  getBicycleByPlaceService,
  getDetailPlaceService,
} from "../services/appService";
import { createPageArr } from "../utils/CommonUtil";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function DetailPlace() {
  // const [checkout, setCheckOut] = useState(false);
  const [currentPlace, setCurrentPlace] = useState({});
  const [currentBicycleArr, setCurrentBicycleArr] = useState([]);
  const [toltalBicycle, setTotalBicycle] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [modal, setModal] = useState(false);
  const [selectedBicycle, setSelectedBicycle] = useState({});
  const userEmail = useSelector((state) => state.user.userInfo.email);
  const toggle = () => setModal(!modal);

  const id = useParams().id;
  useEffect(() => {
    getDetailPlace();
    getBicycleByPlace();
  }, [id]);

  const getDetailPlace = async () => {
    let place = await getDetailPlaceService(id);
    if (place && place.errCode === 0) {
      setCurrentPlace(place.data);
    }
  };
  const createOrder = async () => {
    let res = await createOrderService({
      userEmail: userEmail,
      bicycleId: selectedBicycle.id,
    });
    if (res && res.errCode === 0) {
      toast.success("Thuê thành công!");
      getBicycleByPlace();
    } else {
      toast.error("Thuê thất bại!");
    }
  };
  const getBicycleByPlace = async () => {
    let pageSize = 4;
    let bicycle = await getBicycleByPlaceService(id, currentPage, 4);
    if (bicycle && bicycle.errCode === 0) {
      setCurrentBicycleArr(bicycle.data.rows);
      setTotalBicycle(bicycle.data.count);
      setTotalPages(Math.ceil(bicycle.data.count / pageSize));
    }
  };
  return (
    <div>
      <h3>{currentPlace.altText}</h3>
      <span>{currentPlace.caption}</span>
      <div className="row">
        <div className="col-sm-6">
          <img className="img-thumbnail" src={currentPlace.src} />
        </div>
        <div className="col-sm-6 position-relative">
          <h5>Xe đạp hiện có: {toltalBicycle}</h5>
          <div className="mb-5">
            {currentBicycleArr.map((item) => {
              return (
                <div key={item.id} className="row mt-1 align-items-center">
                  <img
                    className="col-2 col-sm-2 img-thumbnail"
                    src={item.typeData && item.typeData.image}
                  />
                  <span className="col-8 col-sm-8">{item.name}</span>
                  <div className="col-2 col-sm-2 ">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        toggle();
                        setSelectedBicycle(item);
                      }}
                    >
                      Thuê
                    </button>
                  </div>
                </div>
              );
            })}
            {totalPages > 0 && (
              <div
                className="mt-3 position-absolute bottom-0 end-50 "
                style={{ tranform: "translateX(50%)" }}
              >
                <Pagination
                  pages={createPageArr(totalPages)}
                  max={totalPages >= 6 ? 5 : totalPages}
                  value={currentPage}
                  onChange={(e, page) => setCurrentPage(page)}
                  style={{
                    fontSize: "12px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
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
              <input
                readOnly
                value={selectedBicycle.name}
                className="form-control"
              />
            </div>
            <div className="col-4">
              <label>Giá tiền theo giờ</label>
              <input
                readOnly
                value={
                  selectedBicycle.typeData &&
                  selectedBicycle.typeData.price + ` VNĐ`
                }
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
      <div
        dangerouslySetInnerHTML={{
          __html: currentPlace.descriptionHTML,
        }}
      ></div>
    </div>
  );
}

export default DetailPlace;
