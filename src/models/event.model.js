const { Schema, model } = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Event';
const COLLECTION_NAME = 'Events';
// Declare the Schema of the Mongo model
const eventSchema = new Schema(
	{
		eventId: {
            type: String,
        },
        description: {
            type: String
        }
	}, { 
		collection: COLLECTION_NAME, 
		timestamps: true
	}
);

//Export the model
module.exports = model(DOCUMENT_NAME, eventSchema);
