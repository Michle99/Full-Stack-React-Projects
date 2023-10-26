import config from './../config/config';
import app from './express'
import mongoose from 'mongoose';

mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, {
   useNewUrlParser: true, 
   useCreateIndex: true, 
   useUnifiedTopology: true 
})



// making the root template available
// app.get('/', (req, res) => {
//   res.status(200).send(template())
// })

let port = config.port || 3000
app.listen(config.port, function onStart(err) {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port %s.', port)
})

// Database Connection URL
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`)
})