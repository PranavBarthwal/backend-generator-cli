import mongoose from 'mongoose';

function connectToDB(URI) {
    mongoose.connect(URI).then(() => {
        console.log("Succesfully connected to the database")
    }).catch(err => {
        console.error("An error Occured : ",err);
    })
}
export default connectToDB;
