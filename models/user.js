const mongoose = require('mongoose')

const UserRole = Object.freeze({
    ADMIN: 'admin',
    EMPLOYEE: 'employee',
    MANAGER:'manager',
    CUSTOMER: 'customer',
  });

const Project = require('./project');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
      },
    password:{
        type: String,
        required: true
    },
    refresh_token: {
        type: String,
        default: null,
      },
    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.USER,
      },
      projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    registrationDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const User = mongoose.model('User', UserSchema);

module.exports = { User,Project, UserRole };