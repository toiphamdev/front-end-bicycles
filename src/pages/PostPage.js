import _ from "lodash";
import { useEffect, useState } from "react";
import { Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";
import {
  getAllPostService,
  getPlaceByProviceService,
} from "../services/appService";
import Pagination from "@atlaskit/pagination";
import { createPageArr } from "../utils/CommonUtil";
import { useDispatch } from "react-redux";
import { fecthDataEnd, fecthDataStart } from "../redux/actions/appAction";
import { useNavigate } from "react-router-dom";

function PostPage() {
  const [postArr, setPostArr] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    getAllPost();
  }, [currentPage]);
  const getAllPost = async () => {
    dispatch(fecthDataStart);
    const pageSize = 12;
    let data = await getAllPostService(currentPage, pageSize);
    setPostArr(data.data.rows);
    setTotalPages(Math.ceil(data.data.count / pageSize));
    dispatch(fecthDataEnd);
  };
  const handleRedirect = (place) => {
    navigate(`../detail-post/${place.id}`);
  };
  return (
    <div>
      <div className="w-100 my-3">
        <h3>Bài viết - Tin Tức</h3>
      </div>
      <div className="mt-5">
        <div className="my-3">
          {postArr.length > 0 ? (
            postArr.map((item) => {
              return (
                <Card
                  onClick={() => handleRedirect(item)}
                  style={{
                    width: "18rem",
                    cursor: "pointer",
                    objectFit: "cover",
                  }}
                  key={item.id}
                  className="my-2 w-100 d-flex flex-row"
                >
                  <CardImg
                    alt={item.altText}
                    src={item.src}
                    style={{
                      height: "240px",
                      width: "40%",
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
                      {item.altText}
                    </CardTitle>
                    <CardText className="text-start">{item.caption}</CardText>
                  </CardBody>
                </Card>
              );
            })
          ) : (
            <span className="text-center text-danger fs-3">
              Hiện chưa có bài viết mới.
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

export default PostPage;
