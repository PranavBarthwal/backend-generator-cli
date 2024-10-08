import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    key:String,
});

const model = mongoose.model("Model",schema);

export default model;