export const parseResponse = (response) => {
    let body = JSON.parse(response);
    if (body.status == '200') {
        return body.data;
    } else {
        return body.message;
    }
}