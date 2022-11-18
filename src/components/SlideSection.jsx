import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

function SlideSection({ ...props }) {
  let navigate = useNavigate();
  const handleOnClickSlideImg = (item) => {
    navigate(`${props.formLink}${item.id}`);
  };
  return (
    <div className="mt-3">
      <div
        className="mb-3"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h3>{props.title}</h3>
        <button
          className="btn btn-primary"
          onClick={() => {
            navigate(`${props.moreLink}`);
          }}
        >
          Xem thêm
        </button>
      </div>
      <div>
        <Slider {...props.settings}>
          {props.data &&
            props.data.length > 0 &&
            props.data.map((item, index) => {
              return (
                <div
                  className="section-body"
                  key={index}
                  onClick={() => handleOnClickSlideImg(item)}
                >
                  <img className="img-thumbnail" src={item.src} />
                  <h3>{item.name}</h3>
                </div>
              );
            })}
        </Slider>
      </div>
    </div>
  );
}

export default SlideSection;
