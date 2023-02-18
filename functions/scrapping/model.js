const mongoose = require('mongoose');
const {model, Schema} = mongoose;

//schema creation
const sourceSchema = new Schema(
    {
     provider: {type: String, unique: true, required: true}
    }, {timestamps: true}
);

const headlinesSchema = new Schema({
   title: {type: String, unique:true},
   link: {type: String, unique:true},
   imageLink: {type: String},
   provider: {type: String},
   createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// headlinesSchema.set('timestamps',true);

//model
const sourceModel = model("Source", sourceSchema);
const headlinesModel = model("Headlines", headlinesSchema);


module.exports = { sourceModel,headlinesModel }; 