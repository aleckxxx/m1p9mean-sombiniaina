const userRoutes = require('../controllers/user.controller');
const restaurantRoutes = require('../controllers/restaurant.controller');
const orderRoutes = require('../controllers/order.controller');
const parameterRoutes = require('../controllers/parameter.controller');
const restaurantorderRoutes = require('../controllers/restaurantorder.controller');
const prefix = '/api';
function configureRoute(app){    
    app.use(`${prefix}/users`,userRoutes);
    app.use(`${prefix}/restaurants`,restaurantRoutes);
    app.use(`${prefix}/orders`,orderRoutes);
    app.use(`${prefix}/parameters`,parameterRoutes);
    app.use(`${prefix}/restaurantorders`, restaurantorderRoutes);
}

module.exports = configureRoute;