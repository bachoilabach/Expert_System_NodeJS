const { Schema, model } = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Conclusion';
const COLLECTION_NAME = 'Conclusions';
// Declare the Schema of the Mongo model
const conclusionSchema = new Schema(
	{
		conclusionId: {
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
module.exports = model(DOCUMENT_NAME, conclusionSchema);
