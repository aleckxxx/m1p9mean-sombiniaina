const userRoutes = require('../controllers/user.controller');
const restaurantRoutes = require('../controllers/restaurant.controller');
const orderRoutes = require('../controllers/order.controller');
const prefix = '/api';
function configureRoute(app){    
    app.use(`${prefix}/users`,userRoutes);
    app.use(`${prefix}/restaurants`,restaurantRoutes);
    app.use(`${prefix}/orders`,orderRoutes);
}

module.exports = configureRoute;