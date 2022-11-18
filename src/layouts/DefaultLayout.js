import { useSelector } from "react-redux";
import Header from "../components/Header";
import Loader from "react-js-loader";
import Footter from "../components/Footter";

function DefaultLayout({ children, ...props }) {
  let isLoading = useSelector((state) => state.app.isLoading);
  let styleApp = isLoading ? { opacity: 0.5 } : {};
  return (
    <div style={styleApp}>
      <Header />
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: "45%",
            left: "47%",
            zIndex: "100",
          }}
        >
          <Loader
            type="spinner-circle"
            bgColor={"#3399FF"}
            title={"Vui lòng đợi một chút"}
            color={"#9999FF"}
            size={100}
          />
        </div>
      )}
      <div className="mx-3" style={{ marginTop: "92px" }}>
        {children}
      </div>
      <div className="mt-3">
        <Footter />
      </div>
    </div>
  );
}

export default DefaultLayout;
