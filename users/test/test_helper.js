const mongoose = require('mongoose');

// es6 implementation of promises
// not sure that we need it though, wasn't getting deprication in lecture 25
mongoose.Promise = global.Promise;

// before webhook that is executed one time before connection to mongo is made
before((done) => {
    // connect to mongo, explicitly tell which server of mongo (local server)
    // tells to connect to users_test database in our local instance of mongodb
    // check what useNewUrlParser and useUnifiedTopology do, added because of deprication errors
    mongoose.connect('mongodb://localhost/users_test', { useNewUrlParser: true, useUnifiedTopology: true });
    // when mongoose has finished trying  to make a connection 
    mongoose.connection
        // one time, when mongoose emits event 'open', run this code
        .once('open', () => { done(); })
        // every time mongoose emits event 'error', run this code
        .on('error', () => (error) => {
            console.warn('Warning', error);
        });

});



// add hook to run before each test runs
 beforeEach((done) => {
    // direct connection to users collection inside db
    // drop accepts a callback function to be executed once drop is finished
    mongoose.connection.collections.users.drop(() => {
        // Ready to run the next test!
        // By calling done function, tells mocha to run next test
        done();

    });
 });