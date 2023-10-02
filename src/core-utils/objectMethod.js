// import { IMAGE_URL } from "../config";

const emptyObjectValue = obj => {
    return obj && !Object.values(obj).every(item => item?.length > 0)
};

const emptyObject = obj => {
    return obj && Object.keys(obj)?.length === 0
}

const getMediaPath = (url) => {
    // if (url && url !== '') return { uri: `${IMAGE_URL}${url}` }
    // else return Images.defaultImage
}

export { emptyObjectValue, getMediaPath, emptyObject }
