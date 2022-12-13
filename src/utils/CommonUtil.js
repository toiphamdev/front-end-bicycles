export const buildDataSelect = (inputData, type) => {
  let result = [];
  inputData.map((item) => {
    let object = {};
    switch (type) {
      case "PROVINCE":
        object.label = item.value;
        object.value = item.keyMap;
        result.push(object);
        break;
      case "PLACE":
        object.label = item.altText;
        object.value = item.id;
        result.push(object);
        break;
      case "POST":
        object.label = item.altText;
        object.value = item.id;
        result.push(object);
        break;
      case "TYPE":
        object.label = item.name;
        object.value = item.id;
        object.src = item.image;
        result.push(object);
        break;
      default:
        object.label = item.value;
        object.value = item.keyMap;
        result.push(object);
        break;
    }
  });
  return result;
};

export const createPageArr = (pages) => {
  let pageArr = [];
  for (let i = 1; i <= pages; i++) {
    pageArr.push(i);
  }
  return pageArr;
};

export const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
