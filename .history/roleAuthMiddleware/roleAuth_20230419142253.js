function roleAuth (req, res, next) { 
    if (req.user === null){
        req.status = 403;
        return res.send('you need to sign in')
    };
    next();
};