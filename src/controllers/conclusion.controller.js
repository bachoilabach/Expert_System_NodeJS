'use strict';

const { SuccessResponse, CreatedResponse } = require("../core/success.response");
const ConclusionService = require("../services/conclusion.service");

class ConclusionController {
    getAllConclusion = async (req, res, next) => {
        new SuccessResponse({
            message: "get all success",
            metadata: await ConclusionService.getAllConclusion()
        }).send(res);
    }

    getConclusionById = async (req, res, next) => {
        new SuccessResponse({
            message: "get conclusion success",
            metadata: await ConclusionService.getConclusionById(req.params.conclusionId)
        }).send(res);
    }

    createConclusion = async (req, res, next) => {
        new CreatedResponse({
            message: "Create conclusion success",
            metadata: await ConclusionService.createNewConclusion({...req.body})
        }).send(res);
    }

    updateConclusion = async (req, res, next) => {
        new SuccessResponse({
            message: "update conclusion success",
            metadata: await ConclusionService.updateConclusion({conclusionId: req.params.conclusionId, ...req.body})
        }).send(res);
    }

    deleteConclusion = async (req, res, next) => {
        new SuccessResponse({
            message: "delete conclusion success",
            metadata: await ConclusionService.deleteConclusion(req.params.conclusionId)
        }).send(res);
    }
}

module.exports = new ConclusionController();