const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async() =>
{
    try
    {
        // 'useNewUrlParser: true, useUnifiedTopology: true ' is to remove the deprecate d warning
        await mongoose.connect(db, 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            });
        console.log('MongoDB Connected...');
    }
    catch(err)
    {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;

 

