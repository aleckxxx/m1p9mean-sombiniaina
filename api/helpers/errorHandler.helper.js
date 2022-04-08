module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    console.debug(err);
    if (typeof (err) === 'string') {
        // custom application error
        return res.json({status: 400, message: err });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ message: 'Non Autorisé' });
    }

    // default to 500 server error
    return res.json({status: 400, message: err.message });
}