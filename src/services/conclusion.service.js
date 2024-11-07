'use strict';

const { BadRequestError } = require('../core/error.response');
const conclusionModel = require('../models/conclusion.model');

class ConclusionEvent {
    static getAllConclusion = async () => {
        return await conclusionModel.find({}).lean();
    }

    static getConclusionById = async (conclusionId) => {
        return await conclusionModel.findOne({conclusionId: conclusionId}).lean();
    }

    static createNewConclusion = async ({ ...conclusion }) => {
        // Lấy event cuối cùng từ database
        const lastConclusion = await conclusionModel.findOne().sort({ _id: -1 });
        // Xác định số thứ tự mới
        let newConclusionIdNumber = 1; // Mặc định là 1 nếu không có sự kiện nào trong DB
        if (lastConclusion && lastConclusion.conclusionId) {
            // Lấy số thứ tự từ eventId cuối cùng
            const lastConclusionNumber = parseInt(lastConclusion.conclusionId.slice(2), 10);
            newConclusionIdNumber = lastConclusionNumber + 1;
        }
        
        // Tạo eventId mới
        const newConclusionId = `KL${newConclusionIdNumber}`;
    
        // Tạo event mới với eventId tự động
        const newConclusion = await conclusionModel.create({ conclusionId: newConclusionId, ...conclusion });
        if (!newConclusion) {
            return new BadRequestError("Thêm ket luan thất bại!");
        }
        return newConclusion;
    }

    static updateConclusion = async ({conclusionId, description}) => {
        return await conclusionModel.updateOne({
            conclusionId: conclusionId
        }, {
            description: description
        });
    }

    static deleteConclusion = async (conclusionId) => {
        await conclusionModel.deleteOne({
            conclusionId: conclusionId
        });
    }
}

module.exports = ConclusionEvent;