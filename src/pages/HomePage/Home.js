import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";
import SlideSection from "../../components/SlideSection";
import { getHomePostService, getPlaceService } from "../../services/appService";

function Home() {
  const items = [
    {
      src: "http://dichvuxedap.com/wp-content/uploads/2017/05/bgr64.jpg",
      altText: "Slide 1",
      caption: "Slide 1",
    },
    {
      src: "http://dichvuxedap.com/wp-content/uploads/2017/05/bgr60.jpg",
      altText: "Slide 2",
      caption: "Slide 2",
    },
    {
      src: "http://dichvuxedap.com/wp-content/uploads/2017/05/bgr65.jpg",
      altText: "Slide 3",
      caption: "Slide 3",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [placeArr, setPlaceArr] = useState([]);
  const [postArr, setPostArr] = useState([]);
  useEffect(() => {
    getAllPlace();
    getHomePost();
  }, []);
  const onExiting = () => {
    setAnimating(true);
  };

  const onExited = () => {
    setAnimating(false);
  };
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem onExiting={onExiting} onExited={onExited} key={item.src}>
        <img className="img-fluid" src={item.src} alt={item.altText} />
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.caption}
        />
      </CarouselItem>
    );
  });
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
  };

  const getAllPlace = async () => {
    let place = await getPlaceService();
    if (place && place.errCode === 0) {
      setPlaceArr(place.data);
    }
  };

  const getHomePost = async () => {
    let post = await getHomePostService();
    if (post && post.errCode === 0) {
      setPostArr(post.data);
      console.log(post);
    }
  };

  return (
    <div>
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        />
      </Carousel>
      <SlideSection
        title={"Các cơ sở"}
        settings={settings}
        formLink={"../detail-place"}
        moreLink={"../place"}
        data={placeArr}
      />
      <SlideSection
        title={"Các bài viết liên quan"}
        settings={settings}
        formLink={"../detail-post/"}
        moreLink={"../post"}
        data={postArr}
      />
    </div>
  );
}

export default Home;
