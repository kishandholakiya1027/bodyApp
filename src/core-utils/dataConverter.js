
export const convertToUrlEncoded = (data) => {
    let formBody = []
    for (let property in data) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(data[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    return formBody
}

export const convertToformData = (data) => {
    let formData = new FormData();
    for (const key in data) {
        if (key === "profile_img") {
            formData.append(key, data[key], data[key]?.fileName);
        } else if (Array.isArray(data[key])) {
            console.log("🚀 ~ file: dataConverter.js:21 ~ data[key]?.map ~ data[key]:", data[key])
            data[key]?.map((value, i) => {
                if (key === "portfolio") {
                    formData.append(`${key}`, value);

                } else {

                    console.log("🚀 ~ file: dataConverter.js:28 ~ data[key]?.map ~ `${key}[${i}]`:", `${key}[${i}]`)
                    formData.append(`${key}[${i}]`, value);
                }

            })
        }
        else {
            formData.append(key, data[key]);
        }
    }

    return formData
}