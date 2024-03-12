const mongoose = require("mongoose");
const validator = require("validator");

const schemas = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "this is required"],
      trim: true,
      validate: [validator.isAlpha, "moust b validate"],
    },
    age: {
      type: Number,
      required: [true, "this is required"],
      validate: {
        validator: function (value) {
          return value >= 1 && value <= 10;
        },
        message: "meust {VALUE} b lessthan 1 or greathan 10",
      },
    },
    greg: {
      type: [String],
      required: [true, "this is required"],
    },
    time: {
      type: Date,
    },
  }, 
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);   

schemas.pre(/find/,function(){
  this.find({time:{$lte:Date.now}})
})
schemas.pre('aggregate',function(){
  this.pipeline.unshift({$match:{time:{$let:Date.now}}})
})

module.exports = mongoose.model("doc", schemas);
