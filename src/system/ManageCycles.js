import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import { fecthDataEnd, fecthDataStart } from "../redux/actions/appAction";
import {
  createBicycleService,
  deleteBicycleService,
  getAllCodeService,
  getAllTypeBicycleService,
  getBicycleByPlaceAdminService,
  getBicycleByPlaceService,
  getPlaceSelectService,
  updateBicycleService,
} from "../services/appService";
import { buildDataSelect, createPageArr } from "../utils/CommonUtil";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";
import Pagination from "@atlaskit/pagination";

function ManageCycles() {
  const [status, setStatus] = useState("CREATE");
  const [provinceArr, setProvinceArr] = useState([]);
  const [placeArr, setPlaceArr] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState({});
  const [selectedProvince, setSelectedProvince] = useState({});
  const [typeArr, setTypeArr] = useState([]);
  const [selectedType, setSelectedType] = useState({});
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const previewImg = selectedType.src ? selectedType.src : "";
  const toggle = () => setModal(!modal);
  const [bicycleArr, setBicycleArr] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedId, setSelecteId] = useState("");

  const getAllProvince = async () => {
    let data = await getAllCodeService("PROVINCE");
    if (data && data.errCode === 0) {
      const dataSelect = buildDataSelect(data.data, "PROVINCE");
      setProvinceArr(dataSelect);
      setSelectedProvince(dataSelect[0]);
    }
  };
  const getPlaceByProvince = async () => {
    let data = await getPlaceSelectService(selectedProvince.value);
    if (data && data.errCode === 0) {
      const dataPlace = buildDataSelect(data.data, "PLACE");
      setPlaceArr(dataPlace);
    }
  };
  const getAllType = async () => {
    let data = await getAllTypeBicycleService();
    if (data && data.errCode === 0) {
      const dataType = buildDataSelect(data.data, "TYPE");
      setTypeArr(dataType);
    }
  };

  const getBicycleByPlace = async () => {
    dispatch(fecthDataStart);
    let pageSize = 8;
    let data = await getBicycleByPlaceAdminService(
      selectedPlace.value,
      currentPage,
      pageSize
    );
    if (data && data.errCode === 0) {
      console.log(data);
      setBicycleArr(data.data.rows);
      setTotalPages(Math.ceil(data.data.count / pageSize));
    }
    dispatch(fecthDataEnd);
  };

  const handleUpdateOrCreateBicycle = () => {
    console.log(status);
    if (status === "CREATE") {
      createBicycle();
    }
    if (status === "UPDATE") {
      updateBicycle();
    }
  };

  const createBicycle = async () => {
    let data = await createBicycleService({
      type: selectedType.value,
      name: name,
      placeId: selectedPlace.value,
    });
    if (data && data.errCode === 0) {
      toast.success("T???o th??nh c??ng!");
      getBicycleByPlace();
    } else {
      toast.error("T???o th???t b???i");
    }
  };

  const updateBicycle = async () => {
    let data = await updateBicycleService({
      id: selectedId,
      type: selectedType.value,
      name: name,
      placeId: selectedPlace.value,
    });
    if (data && data.errCode === 0) {
      toast.success("C???p nh???t th??nh c??ng!");
      getBicycleByPlace();
    } else {
      toast.error("C???p nh???t th???t b???i");
    }
  };

  const deleteBicycle = async (id) => {
    let data = await deleteBicycleService(id);
    if (data && data.errCode === 0) {
      toast.success("X??a th??nh c??ng!");
      getBicycleByPlace();
    } else {
      toast.error("X??a th???t b???i");
    }
  };

  useEffect(() => {
    getAllProvince();
    getAllType();
  }, []);
  useEffect(() => {
    getPlaceByProvince();
  }, [selectedProvince]);
  useEffect(() => {
    if (!_.isEmpty(selectedPlace)) {
      getBicycleByPlace();
    }
  }, [selectedPlace, currentPage]);

  const handleChangeSelection = (selectedOption, type) => {
    switch (type) {
      case "PROVINCE":
        setSelectedProvince(selectedOption);

        break;
      case "PLACE":
        setSelectedPlace(selectedOption);

        break;
      case "TYPE":
        setSelectedType(selectedOption);

        break;
      default:
        break;
    }
  };
  const handleChangeInput = async (e, type) => {
    switch (type) {
      default:
        break;
    }
  };
  return (
    <div className="mx-3">
      <h2 className="h2">Qu???n l?? xe ?????p</h2>
      <form className="mt-3">
        <div className="row">
          <div className="form-group col-sm-6">
            <label className="text-start w-100">Ch???n t???nh</label>
            <Select
              aria-label=".form-select-lg example"
              value={selectedProvince}
              onChange={(e) => handleChangeSelection(e, "PROVINCE")}
              options={provinceArr}
            />
          </div>
          <div className="form-group col-sm-6">
            <label className="text-start w-100">Ch???n c?? s???</label>
            <Select
              aria-label=".form-select-lg example"
              value={selectedPlace}
              onChange={(e) => handleChangeSelection(e, "PLACE")}
              options={placeArr}
            />
          </div>
        </div>
        <div className="col-3 mt-3">
          <button
            className={
              selectedPlace.value
                ? "btn btn-primary"
                : "btn btn-primary disabled"
            }
            onClick={(e) => {
              e.preventDefault();
              toggle();
              setStatus("CREATE");
            }}
          >
            Th??m
          </button>
        </div>
        <div className="col-12 mt-3">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">M?? xe ?????p</th>
                <th scope="col">Lo???i xe ?????p</th>
                <th scope="col">Tr???ng th??i</th>
                <th scope="col">T??y ch???n</th>
              </tr>
            </thead>
            <tbody>
              {bicycleArr.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.typeData.name}</td>
                    <td>{item.isRentting ? "??ang thu??" : "??? b??i"}</td>
                    <td>
                      <button
                        className="btn btn-outline-warning"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelecteId(item.id);
                          toggle();
                          setName(item.name);
                          setSelectedType({
                            label: item.typeData.name,
                            value: item.typeData.id,
                          });
                          setStatus("UPDATE");
                        }}
                      >
                        S???a
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        style={{ marginLeft: "5px" }}
                        onClick={(e) => {
                          e.preventDefault();
                          setSelecteId(item.id);
                          deleteBicycle(item.id);
                        }}
                      >
                        X??a
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </form>
      <Modal
        isOpen={modal}
        modalTransition={{ timeout: 700 }}
        backdropTransition={{ timeout: 1300 }}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>
          {status === "CREATE" ? "T???O TH??M XE" : "S???A TH??NG TIN"}
        </ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-6">
              <label>Lo???i xe</label>
              <Select
                aria-label=".form-select-lg example"
                value={selectedType}
                onChange={(e) => handleChangeSelection(e, "TYPE")}
                options={typeArr}
              />
            </div>
            <div className="col-6">
              <label>Nh???p m?? xe</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-6 mt-3">
              <img className="img-thumbnail" src={previewImg} />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              toggle();
              handleUpdateOrCreateBicycle();
            }}
          >
            {status === "CREATE" ? "T???o" : "L??u thay ?????i"}
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      {totalPages > 0 && (
        <div className="mt-3">
          <Pagination
            pages={createPageArr(totalPages)}
            max={totalPages >= 10 ? 8 : totalPages}
            value={currentPage}
            onChange={(e, page) => setCurrentPage(page)}
            style={{
              fontSize: "16px",
              display: "flex",
              justifyContent: "center",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ManageCycles;
