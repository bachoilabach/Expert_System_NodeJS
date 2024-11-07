'use strict';

const { BadRequestError } = require('../core/error.response');
const conclusionModel = require('../models/conclusion.model');
const ruleModel = require('../models/rule.model');
const { 
    formatDescription, 
    parseDescriptionToEventsAndConclusion, 
    isSubset 
} = require('../utils');

class RuleService {
    static getAllRule = async () => {
        return await ruleModel.find({}).lean();
    }

    static getRuleById = async (ruleId) => {
        return await ruleModel.findOne({ruleId: ruleId}).lean();
    }

    static createNewRule = async ({ description, conclusion, ...rule }) => {
        // Lấy rule cuối cùng từ database
        const lastRule = await ruleModel.findOne().sort({ ruleId: -1 });
        
        // Xác định số thứ tự mới
        let newRuleIdNumber = 1; // Mặc định là 1 nếu không có rule nào trong DB
        if (lastRule && lastRule.ruleId) {
            // Lấy số thứ tự từ ruleId cuối cùng
            const lastRuleNumber = parseInt(lastRule.ruleId.slice(1), 10);
            newRuleIdNumber = lastRuleNumber + 1;
        }
    
        // Tạo ruleId mới
        const newRuleId = `L${newRuleIdNumber}`;
    
        // Xử lý description thành dạng "(M1^M2) -> KL=KL+1"
        const klValue = conclusion;
        const formattedDescription = formatDescription(description, klValue);
    
        // Tạo rule mới với ruleId tự động và description đã xử lý
        const newRule = await ruleModel.create({
            ruleId: newRuleId,
            description: formattedDescription,
            ...rule
        });
    
        if (!newRule) {
            throw new BadRequestError("Thêm sự kiện thất bại!");
        }
        return newRule;
    }
    

    static updateRule = async ({ruleId, description}) => {
        return await ruleModel.updateOne({
            ruleId: ruleId
        }, {
            description: description
        });
    }

    static deleteRule = async (ruleId) => {
        await ruleModel.deleteOne({
            ruleId: ruleId
        });
    }

    static getConsultance = async (eventData) => {
        console.log("EVENT DATA::", eventData);
        const foundRules = await ruleModel.find({}).select({ruleId: 1, description: 1}).lean();

        const parsedRules = foundRules.map(rule => ({
            ...rule,
            parsedDescription: parseDescriptionToEventsAndConclusion(rule.description)
        }));

        const matchingRule = parsedRules.find((rule) => {
            const { events, conclusion } = rule.parsedDescription;
            console.log({ events, conclusion });
            // return isSubset(events, eventData);
            return isSubset(eventData, events);
        });

        const foundConclusion = conclusionModel.findOne({conclusionId: matchingRule.parsedDescription.conclusion});

        return foundConclusion;
    }
}

module.exports = RuleService;