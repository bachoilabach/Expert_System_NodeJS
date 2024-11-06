'use strict';

const { BadRequestError } = require('../core/error.response');
const eventModel = require('../models/event.model');

class EventService {
    static getAllEvent = async () => {
        return await eventModel.find({}).lean();
    }

    static getEventById = async (eventId) => {
        return await eventModel.findOne({eventId: eventId}).lean();
    }

    static createNewEvent = async ({ ...event }) => {
        console.log("BODY::", event);
        // Lấy event cuối cùng từ database
        const lastEvent = await eventModel.findOne().sort({ eventId: -1 });
        
        // Xác định số thứ tự mới
        let newEventIdNumber = 1; // Mặc định là 1 nếu không có sự kiện nào trong DB
        if (lastEvent && lastEvent.eventId) {
            // Lấy số thứ tự từ eventId cuối cùng
            const lastEventNumber = parseInt(lastEvent.eventId.slice(1), 10);
            newEventIdNumber = lastEventNumber + 1;
        }
        
        // Tạo eventId mới
        const newEventId = `X${newEventIdNumber}`;
    
        // Tạo event mới với eventId tự động
        const newEvent = await eventModel.create({ eventId: newEventId, ...event });
        if (!newEvent) {
            return new BadRequestError("Thêm sự kiện thất bại!");
        }
        return newEvent;
    }    

    static updateEvent = async ({eventId, description}) => {
        return await eventModel.updateOne({
            eventId: eventId
        }, {
            description: description
        });
    }

    static deleteEvent = async (eventId) => {
        await eventModel.deleteOne({
            eventId: eventId
        });
    }
}

module.exports = EventService;