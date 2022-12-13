import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardText,
  CardTitle,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { fecthNotify } from "../redux/actions/appAction";
import {
  getAllTypeBicycleService,
  getOrderService,
  updateBicycleService,
  updateOrderService,
} from "../services/appService";

function Bicycle() {
  const userEmail = useSelector((state) => state.user.userInfo.email);
  const [orderArr, setOrderArr] = useState([]);
  const [load, setLoad] = useState(0);
  const [typeArr, setTypeArr] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);
  const dispatch = useDispatch();
  const toggle = () => {
    setModal(!modal);
  };
  const getOrder = async () => {
    const res = await getOrderService(userEmail);
    if (res && res.errCode === 0) {
      setOrderArr(res.data);
    }
  };
  const getAllType = async () => {
    let data = await getAllTypeBicycleService();
    if (data && data.errCode === 0) {
      const dataType = data.data;
      setTypeArr(dataType);
    }
  };

  const handleBlock = async (item) => {
    let res = await updateBicycleService({
      id: item.bicycleData.id,
      isLocked: !item.bicycleData.isLocked,
    });
    if (res && res.errCode === 0) {
      toast.success("Đã thay đổi trạng thái xe!");
      getOrder();
    } else {
      toast.error("Thay đổi thất bại!");
    }
  };
  const handlePay = async (price) => {
    let res = await updateOrderService({
      id: selectedItem.id,
      price: price,
      bicycleId: selectedItem.bicycleData.id,
      userEmail: userEmail,
    });

    if (res && res.errCode === 0) {
      toast.success("Đã trả xe!");
      getOrder();
      dispatch(fecthNotify);
    } else {
      toast.error("Trả xe thất bại!");
    }
  };
  const priceUSD = selectedPrice / 20000;

  useEffect(() => {
    getOrder();
  }, []);
  useEffect(() => {
    getAllType();
  }, []);
  useEffect(() => {
    const id = setInterval(() => {
      setLoad((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div>
      <h3>XE ĐANG THUÊ</h3>
      <div className="d-flex flex-column align-items-center">
        {orderArr.map((item) => {
          let time = new Date(Number(item.time)).getTime();
          let currentTime = new Date().getTime();
          let totalTime = Math.floor((currentTime - time) / 1000);
          let feeTime = Math.floor(totalTime / 3600);
          let price =
            typeArr.length > 0
              ? typeArr.filter((etem) => {
                  return etem.id == item.bicycleData.type;
                })[0].price
              : 0;
          return (
            <Card
              className="my-2"
              style={{
                width: "24rem",
              }}
              key={item.id}
            >
              <CardBody>
                <CardTitle tag="h5">{item.bicycleData.name}</CardTitle>

                <CardText>
                  Thời gian thuê: {Math.floor(totalTime / 3600)} giờ{" "}
                  {Math.floor((totalTime % 3600) / 60)} phút{" "}
                  {Math.floor((totalTime % 3600) % 60)} giây
                </CardText>
                <CardText>
                  Tổng tiền: {Math.floor(feeTime * price)} VNĐ
                </CardText>
                <CardText>
                  Trạng thái:
                  {item.bicycleData.isLocked ? " Đang khóa" : " Đang mở"}
                </CardText>
              </CardBody>
              <CardFooter>
                <Button
                  onClick={() => {
                    handleBlock(item);
                  }}
                >
                  {item.bicycleData.isLocked ? "Mở" : "Khóa"}
                </Button>
                <Button
                  style={{ marginLeft: "5px" }}
                  className={item.bicycleData.isLocked ? "" : "disabled"}
                  onClick={() => {
                    setSelectedItem(item);
                    setSelectedPrice(Math.floor(feeTime * price));
                    toggle();
                  }}
                >
                  Thanh toán và trả xe
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      <Modal
        isOpen={modal}
        modalTransition={{ timeout: 700 }}
        backdropTransition={{ timeout: 1300 }}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Hóa đơn</ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-12">
              <label>Tổng phí: {selectedPrice} VNĐ</label>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          {priceUSD >= 0.1 && (
            <PayPalScriptProvider
              options={{
                "client-id":
                  "AVk760dqZT3jxnp2NE-HwtaEePYpWbTVPpmLlEKlgJLfvREfZyEKf9HOdhytwzDG9AmXnh5VJyU3VAPp",
                currency: "USD",
                intent: "capture",
              }}
            >
              <PayPalButtons
                style={{ layout: "horizontal" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: priceUSD,
                        },
                      },
                    ],
                  });
                }}
                onApprove={async (data, actions) => {
                  const order = await actions.order.capture();
                  handlePay(priceUSD * 20000);
                  toggle();
                }}
                onError={(err) => {
                  console.log(err);
                }}
              />
            </PayPalScriptProvider>
          )}
          <Button
            className={priceUSD >= 0.1 ? "disabled" : ""}
            color="primary"
            onClick={() => {
              toggle();
              handlePay(0);
            }}
          >
            Trả xe
          </Button>
          <Button color="secondary" onClick={toggle}>
            Hủy
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Bicycle;
