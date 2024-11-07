'use strict';

const { SuccessResponse, CreatedResponse } = require("../core/success.response");
const EventService = require("../services/event.service");

class EventController {
    getAllEvent = async (req, res, next) => {
        new SuccessResponse({
            message: "get all success",
            metadata: await EventService.getAllEvent()
        }).send(res);
    }

    getEventById = async (req, res, next) => {
    
        new SuccessResponse({
            message: "get event success",
            metadata: await EventService.getEventById(req.params.eventId)
        }).send(res);
    }

    createEvent = async (req, res, next) => {
        new CreatedResponse({
            message: "Create event success",
            metadata: await EventService.createNewEvent(req.body)
        }).send(res);
    }

    updateEvent = async (req, res, next) => {
        new SuccessResponse({
            message: "update event success",
            metadata: await EventService.updateEvent({eventId: req.params.eventId, ...req.body})
        }).send(res);
    }

    deleteEvent = async (req, res, next) => {
        console.log(req.params.eventId)
        new SuccessResponse({
            message: "delete event success",
            metadata: await EventService.deleteEvent(req.params.eventId)
        }).send(res);
    }
}

module.exports = new EventController();