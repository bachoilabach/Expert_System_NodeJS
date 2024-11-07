const express = require('express');
const asyncHandler = require('../helpers/asyncHandler');
const eventController = require('../controllers/event.controller');
const ruleController = require('../controllers/rule.controller');
const conclusionController = require('../controllers/conclusion.controller');
const router = express.Router();
//Event
router.get("/api/events", asyncHandler(eventController.getAllEvent));
router.post("/api/event", asyncHandler(eventController.createEvent));
router.put("/api/event/:eventId", asyncHandler(eventController.updateEvent));
router.delete("/api/event/:eventId", asyncHandler(eventController.deleteEvent));
// Rule
router.get("/api/rules", asyncHandler(ruleController.getAllRule));
router.post("/api/rule", asyncHandler(ruleController.createRule));
router.put("/api/rule/:ruleId", asyncHandler(ruleController.updateRule));
router.delete("/api/rule/:ruleId", asyncHandler(ruleController.deleteRule));

//Conclusion

router.get("/api/conclusions", asyncHandler(conclusionController.getAllConclusion));
router.post("/api/conclusion", asyncHandler(conclusionController.createConclusion));
router.put("/api/conclusion/:conclusionId", asyncHandler(conclusionController.updateConclusion));
router.delete("/api/conclusion/:conclusionId", asyncHandler(conclusionController.deleteConclusion));

// Consult
router.post("/api/consult", asyncHandler(ruleController.consult));


module.exports = router;