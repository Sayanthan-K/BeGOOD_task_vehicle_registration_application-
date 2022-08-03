const Router = require("express").Router;
const router = Router();
const vehicle = require("../Controller/vehicle.controller");
// router
router
  .get("/:_id", vehicle.GetsingleRegistrations)
  .post("/", vehicle.NewRegistrations)
  .get("/", vehicle.GetAllRegistrations)
  .delete("/:_id", vehicle.DeleteRegistrations)
  .put("/", vehicle.UpdateRegistrations);

module.exports = router;
