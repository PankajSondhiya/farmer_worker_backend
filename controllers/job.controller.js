const Job = require("../models/job.model");
const User = require("../models/user.model");

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("employer");
    res.status(200).send(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res
      .status(500)
      .send({ message: "Error fetching jobs", error: error.message });
  }
};

const createJob = async (req, res) => {
  console.log(req.body);
  const job = await Job.create(req.body);

  res.status(201).send(job);
};

async function updateJobById(req, res) {
  try {
    const job_id = req.params.job_id;
    // Destructure worker response fields and "other" fields from req.body
    const { workerId, responseText, ...otherFields } = req.body;

    // Find the job by its id
    const job = await Job.findById(job_id);
    if (!job) {
      return res.status(404).send({ message: "No job found with this ID" });
    }

    // Update any other job fields provided in the request
    Object.keys(otherFields).forEach((field) => {
      job[field] = otherFields[field];
    });

    // If workerId and responseText are provided, update/insert the worker response
    if (workerId && responseText !== undefined) {
      const index = job.workerResponses.findIndex(
        (r) => r.workerId.toString() === workerId
      );
      if (index !== -1) {
        // Update existing worker response
        job.workerResponses[index].responseText = responseText;
        job.workerResponses[index].updatedAt = new Date();
      } else {
        // Add a new worker response
        job.workerResponses.push({
          workerId,
          responseText,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    job.updatedAt = new Date();

    const updatedJob = await job.save();

    return res.status(200).send({
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    console.error("Error updating job:", error);
    return res.status(500).send({
      message: "An error occurred while updating the job",
      error: error.message,
    });
  }
}

async function getWorkerResponse(req, res) {
  const { workerId, jobId } = req.params;
  try {
    const job = await job.findById(jobId);
    if (!job) {
      return res.status(404).send({
        message: `no job found with ${jobId}`,
      });
    }
    const workerResponse = await job.workerResponses.find(
      (res) => res.workerId.toString() === workerId
    );
    return res.status(200).send(workerResponse);
  } catch (error) {
    res.status(500).send("no response found ");
  }
}
async function deleteJobById(req, res) {
  const { id } = req.body;

  await Job.findByIdAnddelete(id);
  res.status(200).send(`job with the id:${id} deleted successfully`);
}

module.exports = {
  createJob,
  updateJobById,
  deleteJobById,
  getAllJobs,
  getWorkerResponse,
};
