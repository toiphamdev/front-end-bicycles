import { useEffect, useState } from "react";
import Select from "react-select";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import {
  createPostService,
  deletePlaceService,
  getDetailPostService,
  getPostService,
  updatePostService,
} from "../services/appService";
import { toast } from "react-toastify";
import { buildDataSelect, convertBase64 } from "../utils/CommonUtil";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { fecthDataEnd, fecthDataStart } from "../redux/actions/appAction";

function ManagePost() {
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  const [status, setStatus] = useState("CREATE");
  const [postArr, setPostArr] = useState([]);
  const [selectedPost, setSelectedPost] = useState({});
  const [altText, setAltText] = useState("");
  const [caption, setCaption] = useState("");
  const [descriptionMarkdown, setDescriptionMarkdown] = useState("");
  const [descriptionHTML, setDescriptionHTML] = useState("");
  const [previewImageURL, setPreviewImageURL] = useState("");
  const [src, setSrc] = useState("");
  const dispatch = useDispatch();

  const getAllPost = async () => {
    let data = await getPostService();
    if (data && data.errCode === 0) {
      const dataSelect = buildDataSelect(data.data, "POST");
      setPostArr(dataSelect);
    }
  };
  const getDetailPost = async (id) => {
    dispatch(fecthDataStart);
    let data = await getDetailPostService(id);
    if (data && data.errCode === 0) {
      let place = data.data;

      setAltText(place.altText);
      setCaption(place.caption);
      setPreviewImageURL(place.src);
      setDescriptionMarkdown(place.descriptionMarkdown);
      setDescriptionHTML(place.descriptionHTML);
      setSrc(place.src);
    }
    dispatch(fecthDataEnd);
  };

  useEffect(() => {
    if (!_.isEmpty(selectedPost) && status === "UPDATE") {
      getDetailPost(selectedPost.value);
    }
  }, [selectedPost]);
  useEffect(() => {
    getAllPost();
  }, []);
  const handleChangeSelection = (selectedOption, type) => {
    switch (type) {
      case "POST":
        setSelectedPost(selectedOption);

        break;
      default:
        break;
    }
  };
  const handleEditorChange = ({ html, text }) => {
    setDescriptionHTML(html);
    setDescriptionMarkdown(text);
  };
  const handleChangeInput = async (e, type) => {
    switch (type) {
      case "ALTTEXT":
        setAltText(e.target.value);
        break;
      case "CAPTION":
        setCaption(e.target.value);
        console.log(e.target.value);
        break;
      case "SRC":
        let data = e.target.files;
        let file = data[0];
        if (file) {
          let base64 = await convertBase64(file);
          let objectURL = URL.createObjectURL(file);
          setSrc(base64);
          setPreviewImageURL(objectURL);
        }
        break;
      default:
        break;
    }
  };
  const handleUpdatePost = async (e) => {
    e.preventDefault();
    dispatch(fecthDataStart);
    let res = await updatePostService({
      id: selectedPost.value,
      descriptionHTML: descriptionHTML,
      descriptionMarkdown: descriptionMarkdown,
      caption: caption,
      altText: altText,
      src: src,
    });
    if (res && res.errCode === 0) {
      toast.success("Cập nhật thông tin bài viết thành công!");
    }
  };
  const handleCreatePost = async (e) => {
    e.preventDefault();
    dispatch(fecthDataStart);
    let res = await createPostService({
      descriptionHTML: descriptionHTML,
      descriptionMarkdown: descriptionMarkdown,
      caption: caption,
      altText: altText,
      src: src,
    });
    if (res && res.errCode === 0) {
      toast.success("Tạo bài viết thành công!");
    }
    dispatch(fecthDataEnd);
  };
  const handleDeletePlace = async (e) => {
    e.preventDefault();
    dispatch(fecthDataStart);
    let res = await deletePlaceService(selectedPost.value);
    if (res && res.errCode === 0) {
      toast.success("Xoá bài viết thành công!");
      await getAllPost();
    }
    dispatch(fecthDataEnd);
  };
  return (
    <div className="mx-3">
      <h2 className="h2">Quản lí bài viết</h2>
      <div className="d-flex flex-start">
        {status === "CREATE" && (
          <button
            className="btn btn-primary"
            onClick={() => {
              setStatus("UPDATE");
            }}
          >
            Tạo mới
          </button>
        )}
        {status === "UPDATE" && (
          <button
            className="btn btn-primary"
            onClick={() => {
              setStatus("CREATE");
            }}
          >
            Chỉnh sửa
          </button>
        )}
      </div>
      <form className="mt-3">
        <div className="row">
          {status === "UPDATE" && (
            <div className="form-group col-sm-6">
              <label className="text-start w-100">Chọn bài viết</label>
              <Select
                aria-label=".form-select-lg example"
                value={selectedPost}
                onChange={(e) => handleChangeSelection(e, "POST")}
                options={postArr}
              />
            </div>
          )}
        </div>
        <div className="mt-3 row">
          <div className="custom-file col-sm-2">
            <input
              type="file"
              className="custom-file-input"
              id="inputGroupFile01"
              onChange={(e) => handleChangeInput(e, "SRC")}
              style={{ display: "none" }}
            />
            <label
              className="custom-file-label btn-primary btn"
              htmlFor="inputGroupFile01"
            >
              Choose file
            </label>
          </div>
          <div className="col-sm-4">
            <img
              alt={altText}
              className="img-thumbnail"
              style={{ width: "200px", height: "120px" }}
              src={previewImageURL}
            />
          </div>
          <div className="col-sm-6">
            <div className="form-group col-sm-12">
              <label className="text-start w-100">Tiêu đề</label>
              <input
                className="form-control"
                value={altText}
                onChange={(e) => handleChangeInput(e, "ALTTEXT")}
              ></input>
            </div>
            <div className="form-group col-sm-12">
              <label className="text-start w-100">Giới thiệu</label>
              <input
                className="form-control"
                value={caption}
                onChange={(e) => handleChangeInput(e, "CAPTION")}
              ></input>
            </div>
          </div>
        </div>
        <div className="row mt-3 mx-0">
          <label className="w-100 text-start"> Mô tả chi tiết</label>
          <MdEditor
            style={{ height: "300px" }}
            renderHTML={(text) => mdParser.render(text)}
            value={descriptionMarkdown}
            onChange={handleEditorChange}
          />
        </div>
        <div className="row">
          <div className="col-sm-6 mt-3">
            {status === "UPDATE" && (
              <button
                onClick={(e) => handleDeletePlace(e)}
                className="btn btn-danger"
              >
                Xóa
              </button>
            )}
          </div>
          <div className="col-sm-6 mt-3">
            {status === "UPDATE" && (
              <button
                onClick={(e) => handleUpdatePost(e)}
                className="btn btn-primary"
              >
                Lưu
              </button>
            )}
            {status === "CREATE" && (
              <button
                className="btn btn-primary"
                onClick={(e) => handleCreatePost(e)}
              >
                Tạo
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default ManagePost;
