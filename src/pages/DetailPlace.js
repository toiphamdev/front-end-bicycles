import { useEffect, useState } from "react";
import _ from "lodash";
import { useParams } from "react-router-dom";
import { getDetailPlaceService } from "../services/appService";

function DetailPlace() {
  const [currentPlace, setCurrentPlace] = useState({});
  const id = useParams().id;
  useEffect(() => {
    getDetailPlace();
  }, [id]);
  const getDetailPlace = async () => {
    let place = await getDetailPlaceService(id);
    if (place && place.errCode === 0) {
      setCurrentPlace(place.data);
    }
  };
  return (
    <div>
      <h3>{currentPlace.altText}</h3>
      <span>{currentPlace.caption}</span>
      <div
        dangerouslySetInnerHTML={{
          __html: currentPlace.descriptionHTML,
        }}
      ></div>
    </div>
  );
}

export default DetailPlace;
