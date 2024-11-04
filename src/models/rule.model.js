const { Schema, model } = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Rule';
const COLLECTION_NAME = 'Rules';
// Declare the Schema of the Mongo model
const ruleSchema = new Schema(
	{
		ruleId: {
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
module.exports = model(DOCUMENT_NAME, ruleSchema);
