const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
  workers: [{ type: Schema.Types.ObjectId, ref:'User'}]
});

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;