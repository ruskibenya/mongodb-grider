const Driver = require('../models/driver');

module.exports = {
    greeting(req, res){
        res.send({ hi: 'there'  });
    },

    index(req, res, next){
        // will come from query in the https request, params but will do this through get request!
        const { lng, lat } = req.query;
        // lng, lat will be the center point, from the user making the request
        const point = {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
        }

        // give me all the drivers near this one point
        Driver.aggregate([
            {
                $geoNear: {
                    near: point,
                    spherical: true,
                    // max distance is in meters, so 200,000 -> 200km
                    maxDistance: 200000,
                    distanceField: 'dist.calculated'
                }
            }
        ])
        .then(drivers => res.send(drivers))
        .catch(next);
    },

    create(req, res, next){
        const driverProps = req.body;

        Driver.create(driverProps)
            .then(driver => res.send(driver))
            .catch(next);
    },

    edit(req, res, next){
        const driverId = req.params.id;
        const driverProps = req.body;

        Driver.findByIdAndUpdate({ _id: driverId }, driverProps)
            .then(() => Driver.findById({ _id: driverId }))
            .then(driver => res.send(driver))
            .catch(next);
    },

    delete(req, res, next){
        const driverId = req.params.id;

        Driver.findByIdAndRemove({ _id: driverId })
        .then((driver) => res.status(204).send(driver))
        .catch(next);
    }
}