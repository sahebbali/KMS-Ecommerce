// import mongoose from "mongoose";

// const connect = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     clg("connection Successfull")
//   } catch (error) {
//     throw new Error("Connection failed!");
//   }
// };

// export default connect;

import mongoose from 'mongoose';

// let uri = "mongodb+srv://sahebbali253:saheb123@cluster0.oravphg.mongodb.net/?retryWrites=true&w=majority"; // track the connection
// let uri = "mongodb+srv://nft:KWS1234kws@nftkws.odaj3gs.mongodb.net/?retryWrites=true&w=majority"; // track the connection
let uri = "mongodb+srv://fnt:KWS1234kws@cluster0.vbeiqi8.mongodb.net/?retryWrites=true&w=majority"; // track the connection

const connect = async () => {
  mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start your application or perform other operations
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });
}
export default connect; 