class ApiResponse {
    constructor(
        statuscode,
        data,
        message = 'Success',
        success = true
    ){
        this.statuscode = statuscode;
        this.data = data;
        this.message = message;
        this.success = statuscode >= 200 && statuscode < 300 ? true : false;
    }
}

export {ApiResponse};