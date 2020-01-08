const mongoose = require('mongoose');


before(done => {
    mongoose.connect('mongodb://localhost/muber_test', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
    mongoose.connection
        .once('open', () => done())
        .on('error', err => {
            console.warn('Warning', error);
        });
});


beforeEach(done => {
    const { drivers } = mongoose.connection.collections;
    drivers.drop()
    // patch to fix the mocha/mongo problem with testing the geo properties of coordinates (video 126)
    .then(() => drivers.ensureIndex({ 'geometry.coordinates': '2dsphere' }))
    .then(() => done())
    // very first time the test suite is run and collection doesn't exist,
    // we will receive an error(can't drop collection that doesn't exist)
    // catch handles the error and allows us to keep going
    .catch(() => done());
})