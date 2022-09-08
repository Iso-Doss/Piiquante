class ApiResponse {

    #success = "";

    #message = "";

    #data = {};

    constructor(success, message, data = {}) {

        this._success = success;
        this._message = message;
        this._data = data;

    }

    get success() {
        return this._success;
    }

    set success(value) {
        this._success = value;
    }

    get message() {
        return this._message;
    }

    set message(value) {
        this._message = value;
    }

    get data() {
        return this._data;
    }

    set data(value) {
        this._data = value;
    }

    get apiResponse() {

        return {

            "success": this.success,

            "message": this.message,

            "data": this.data

        };

    }

}

module.exports = ApiResponse;