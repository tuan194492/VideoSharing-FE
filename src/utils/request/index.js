const createHeaderRequestFormDataWithToken = (token) => {
    return {
        headers: {
            accept: '*/*',
            authorization: `Bearer ${token}`,
            'content-type': 'multipart/form-data'
        }
    }
}

const createHeaderRequestWithJson = (token) => {
    return {
        headers: {
            accept: '*/*',
            authorization: `Bearer ${token}`,
            'content-type': 'application/json'
        }
    }
}

function createFormDataFromObject(object) {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
}

export const RequestFactory = {
    createHeaderRequestFormDataWithToken,
    createHeaderRequestWithJson,
    createFormDataFromObject
}