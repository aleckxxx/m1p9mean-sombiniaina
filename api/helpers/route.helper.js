const userRoutes = require('../controllers/user.controller');
const prefix = '/api';
function configureRoute(app){    
    app.use(`${prefix}/users`,userRoutes);
}

module.exports = configureRoute;