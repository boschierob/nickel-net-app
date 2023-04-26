const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    nom: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    unitPrice: { type: Number }
    ,
    unit: {
        type: String
    },
    quantity: {
        type: Number
    },
    totalPrice: { type: Number },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;