const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  position: {
    type: String,
    required: true,
  },
  hireDate: {
    type: Date,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  projects: [{
    type: Schema.Types.ObjectId,
    ref: 'Project'
  }]
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
