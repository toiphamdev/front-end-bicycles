import { useEffect, useState } from "react";
import _ from "lodash";
import { useParams } from "react-router-dom";
import { getDetailPostService } from "../services/appService";

function DetailPost() {
  const [currentPost, setCurrentPost] = useState({});
  const id = useParams().id;
  useEffect(() => {
    getDetailPost();
  }, [id]);
  const getDetailPost = async () => {
    let post = await getDetailPostService(id);
    if (post && post.errCode === 0) {
      setCurrentPost(post.data);
    }
  };
  return (
    <div>
      <h3>{currentPost.altText}</h3>
      <span>{currentPost.caption}</span>
      <div
        dangerouslySetInnerHTML={{
          __html: currentPost.descriptionHTML,
        }}
      ></div>
    </div>
  );
}

export default DetailPost;
