const DriversController = require('../controllers/drivers_controller');

module.exports = (app) => {
    // request/route handler used to listen to a particular route
    // listening for a get request on the given route
    // e.g. app.post => listens to post reques
    // req gives us access to elements in the request
    // res is the response object  
    app.get('/api', DriversController.greeting);
    app.post('/api/drivers', DriversController.create);
    app.put('/api/drivers/:id', DriversController.edit);
    app.delete('/api/drivers/:id', DriversController.delete);
    app.get('/api/drivers', DriversController.index);

}

