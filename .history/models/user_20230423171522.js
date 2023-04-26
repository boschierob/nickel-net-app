const mongoose = require('mongoose')

const UserRole = Object.freeze({
    ADMIN: 'admin',
    EMPLOYEE: 'employee',
    MANAGER:'manager',
    CUSTOMER: 'customer',
  });

  const ProjectSchema = new Schema({
    nom: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  });

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
    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.USER,
      },
      projets: [ProjectSchema],
    registrationDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Subscriber', subscriberSchema)
const User = mongoose.model('User', UserSchema);

module.exports = { User, UserRole };