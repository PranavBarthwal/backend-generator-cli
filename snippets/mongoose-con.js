import mongoose from 'mongoose';

function connectToDB(URI) {
    mongoose.connect(URI).then(() => {
        console.log("Connection to the db succesful");
    }).catch(err => {
        console.error("An error occcured : ",err);
    })
}
export default connectToDB;
