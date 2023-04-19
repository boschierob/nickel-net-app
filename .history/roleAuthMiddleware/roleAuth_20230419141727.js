module.exports = function roleAuth (msg, next) { 
    return msg.toString();
    next();
};