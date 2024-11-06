'use strict';

const { StatusCodes, ReasonPhrases } = require('http-status-codes');

class SuccessResponse {
    constructor({message, statusCode = StatusCodes.OK, reasonPhrase = ReasonPhrases.OK, metadata = {} }) {
        this.message = !message ? reasonPhrase : message;
        this.status = statusCode;
        this.metadata = metadata;
    }

    send(res, headers = {}) {
        return res.status(this.status).json(this);
    }
}

class OkResponse extends SuccessResponse {
    constructor({ message, metadata }){
        super({ message, metadata });
    }
}

class CreatedResponse extends SuccessResponse {
    constructor({ message, statusCode = StatusCodes.CREATED, reasonPhrase = ReasonPhrases.CREATED, metadata }) {
        super({ message, statusCode, reasonPhrase, metadata });
    }
}

module.exports = {
    OkResponse, CreatedResponse, SuccessResponse
}