const mongoose = require("mongoose");
const User = require("./user.model");

const JobSchema = new mongoose.Schema({
  jobName: {
    type: String,
    required: true,
  },
  employer: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  date: {
    type: String,
    required: true,
  },
  contactDetails: {
    type: Number,
    required: true,
  },
  jobStatus: {
    type: String,
    default: "ACTIVE",
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  workersRequired: {
    type: String,
    required: true,
  },

  workerResponses: [
    {
      _id: false,
      workerId: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
      responseText: { type: String },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    },
  ],

  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

const Job = mongoose.model("JOB", JobSchema);
module.exports = Job;
