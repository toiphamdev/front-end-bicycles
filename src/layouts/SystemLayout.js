import Footter from "../components/Footter";
import SystemHeader from "../components/SystemHeader";

function SystemLayout({ children, ...props }) {
  return (
    <div>
      <SystemHeader />
      <div>{children}</div>
      <div className="mt-3">
        <Footter />
      </div>
    </div>
  );
}

export default SystemLayout;
