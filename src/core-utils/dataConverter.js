
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
            data[key]?.map((value, i) => {
                if (key === "portfolio"||key==="images") {
                    formData.append(`${key}`, value);

                } else {

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