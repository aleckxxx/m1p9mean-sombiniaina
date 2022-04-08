class ValidationError extends Error{
    constructor(){
        super("Une erreur de validation est survenue");
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.errors = {};
    }
}

module.exports = ValidationError;