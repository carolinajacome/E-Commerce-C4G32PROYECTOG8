const mongoose = require('mongoose');

const connectDatabase = async () => {
    const connection = await mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useCreateIndex: true,
    });
    console.log(`MongoDB Connected: ${connection.connection.host}`);
};


const connectDatabaseMongo = async () => {
    const connection = await mongoose.connect(process.env.DB_MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useCreateIndex: true,
    }).then((response) => {
        console.log(`MongoDB Connected: ${response.connection.host}`);
    }).catch((error) => {
        console.log(error);
    });
};


module.exports = connectDatabase;