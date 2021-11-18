const mongoose = require ('mongoose');

const connectDatabase = () => {

    mongoose.connect(process.env.DB_LOCAL_URI,
        {
            useNewURlParser: true,
            useUnifiedTopology:true
          //  useCreateIndex: true
        }).then(con=> { 

            console.log (`Base de datos MongoDB conectada al HOST: ${con.connection.host}`)
        })

}
module.exports= connectDatabase