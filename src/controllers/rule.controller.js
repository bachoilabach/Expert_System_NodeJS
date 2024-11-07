'use strict';

const { SuccessResponse, CreatedResponse } = require("../core/success.response");
const RuleService = require("../services/rule.service");

class RuleController {
    getAllRule = async (req, res, next) => {
        new SuccessResponse({
            message: "get all success",
            metadata: await RuleService.getAllRule()
        }).send(res);
    }
    createRule = async (req, res, next) => {
        new CreatedResponse({
            message: "Create event success",
            metadata: await RuleService.createNewRule(req.body)
        }).send(res);
    }

    updateRule = async (req, res, next) => {
        new SuccessResponse({
            message: "update event success",
            metadata: await RuleService.updateRule({ruleId: req.params.ruleId, ...req.body})
        }).send(res);
    }

    deleteRule = async (req, res, next) => {
        new SuccessResponse({
            message: "delete event success",
            metadata: await RuleService.deleteRule(req.params.ruleId)
        }).send(res);
    }

    consult = async (req, res, next) => {
        new SuccessResponse({
            message: "Consult success",
            metadata: await RuleService.getConsultance(req.body)
        }).send(res);
    }
}

module.exports = new RuleController();