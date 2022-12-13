import _ from "lodash";
import { useEffect, useState } from "react";
import Select from "react-select";
import { Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";
import {
  getAllCodeService,
  getPlaceByProviceService,
} from "../services/appService";
import Pagination from "@atlaskit/pagination";
import { buildDataSelect, createPageArr } from "../utils/CommonUtil";
import { useDispatch } from "react-redux";
import { fecthDataEnd, fecthDataStart } from "../redux/actions/appAction";
import { useNavigate } from "react-router-dom";

function PlacePage() {
  const [provinceArr, setProvinceArr] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState({});
  const [placeArr, setPlaceArr] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    getAllProvince();
  }, []);
  useEffect(() => {
    if (!_.isEmpty(selectedProvince)) {
      getPlaceByProvice();
    }
  }, [selectedProvince, currentPage]);
  const getAllProvince = async () => {
    let data = await getAllCodeService("PROVINCE");
    if (data && data.errCode === 0) {
      data.data.unshift({
        keyMap: "ALL",
        type: "PROVINCE",
        value: "Toàn quốc",
      });
      let provinces = buildDataSelect(data.data, "PROVINCE");
      setProvinceArr(provinces);
      setSelectedProvince(provinces[0]);
    }
  };
  console.log(provinceArr);
  const getPlaceByProvice = async () => {
    dispatch(fecthDataStart);
    const pageSize = 12;
    let data = await getPlaceByProviceService(
      currentPage,
      pageSize,
      selectedProvince.value
    );
    setPlaceArr(data.data.rows);
    setTotalPages(Math.ceil(data.data.count / pageSize));
    dispatch(fecthDataEnd);
  };
  const handleChangeSelection = (selectedOption) => {
    setSelectedProvince(selectedOption);
    setCurrentPage(1);
  };
  const handleRedirect = (place) => {
    navigate(`../detail-place/${place.id}`);
  };
  return (
    <div>
      <div className="w-25 my-3">
        <label className="text-start w-100">Chọn tỉnh thành</label>
        <Select
          aria-label=".form-select-lg example"
          value={selectedProvince}
          onChange={(e) => handleChangeSelection(e)}
          options={provinceArr}
          placeholder={"Chọn tỉnh thành"}
        />
      </div>
      <div className="mt-5">
        <div className="my-3">
          {placeArr.length > 0 ? (
            placeArr.map((place) => {
              return (
                <Card
                  onClick={() => handleRedirect(place)}
                  style={{
                    width: "18rem",
                    cursor: "pointer",
                    objectFit: "cover",
                  }}
                  key={place.id}
                  className="my-2 w-100 d-flex flex-row"
                >
                  <CardImg
                    alt={place.altText}
                    src={place.src}
                    style={{
                      height: `100%`,
                      width: `40%`,
                    }}
                    top
                    width="100%"
                  />
                  <CardBody>
                    <CardTitle
                      className="text-start"
                      style={{ color: "#0dcaf0" }}
                      tag="h5"
                    >
                      {place.altText}
                    </CardTitle>
                    <CardText className="text-start">{place.caption}</CardText>
                  </CardBody>
                </Card>
              );
            })
          ) : (
            <span className="text-center text-danger fs-3">
              Không có cơ sở nào ở tỉnh thành này.
            </span>
          )}
        </div>
      </div>
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

export default PlacePage;
