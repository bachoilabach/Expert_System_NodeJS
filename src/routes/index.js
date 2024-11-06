const express = require('express');
const asyncHandler = require('../helpers/asyncHandler');
const eventController = require('../controllers/event.controller');
const router = express.Router();

router.get("/api/events", asyncHandler(eventController.getAllEvent));
router.post("/api/event", asyncHandler(eventController.createEvent));
router.put("/api/event/:eventId", asyncHandler(eventController.updateEvent));
router.delete("/api/event/:eventId", asyncHandler(eventController.deleteEvent));

module.exports = router;