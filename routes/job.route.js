const { verifyToken } = require("../middleware/auth.jwt");
const {
  getAllJobs,
  deleteJobById,
  updateJobById,
  createJob,
  getWorkerResponse,
} = require("../controllers/job.controller");
module.exports = function (app) {
  app.post("/farmer/api/v1/job/create", [verifyToken], createJob);
  app.put("/farmer/api/v1/job/:job_id", updateJobById);
  app.get("/farmer/api/v1/job/:jobId/:workerId", getWorkerResponse);
  app.delete("/farmer/api/v1/job/:id", [verifyToken], deleteJobById);
  app.get("/farmer/api/v1/jobs/", [verifyToken], getAllJobs);
};
