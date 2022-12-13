import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  CardTitle,
} from "reactstrap";
import { getOrderPriceService } from "../services/appService";

function History() {
  const userEmail = useSelector((state) => state.user.userInfo.email);
  const [orderArr, setOrderArr] = useState([]);
  const getOrderPrice = async () => {
    const res = await getOrderPriceService(userEmail);
    if (res && res.errCode === 0) {
      setOrderArr(res.data);
    }
  };

  useEffect(() => {
    getOrderPrice();
  }, []);
  return (
    <div>
      <h3>Lịch sử giao dịch</h3>
      <div className="d-flex flex-column align-items-center">
        {orderArr.map((item) => {
          let date = new Date(Number(item.time));
          return (
            <Card
              className="my-2"
              style={{
                width: "24rem",
              }}
              key={item.id}
            >
              <CardBody>
                <CardTitle tag="h5">Hóa đơn thuê xe</CardTitle>
                <CardText>{item.price} VNĐ</CardText>
                <CardText>
                  Ngày giao dịch: {""}
                  {date.toLocaleTimeString()} | {date.toLocaleDateString()}
                </CardText>
              </CardBody>
              <CardFooter>
                {item.isPay ? "Đã thanh toán" : "Chưa thanh toán"}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default History;
