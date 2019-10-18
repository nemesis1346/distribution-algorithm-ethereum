export default class Utils {
    static parseResponse(response) {
        let body = JSON.parse(response.body);

        if (body.status == '200') {
            return body.data;
        } else {
            return body.message;
        }
    }
}