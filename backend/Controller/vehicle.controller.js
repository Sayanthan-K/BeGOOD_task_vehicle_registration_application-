const vehicle = require("../Models/vehicle.models");
//
// NewRegistrations
exports.NewRegistrations = async (req, res) => {
  const { vehicle_number } = req.body;

  //decalre varible
  var number_type;

  // using Regular Expressions
  var pattern_Vintage = /^\d{2}[ ]ශ්‍රී[ ]\d{4}/i;
  var pattern_Old = /^\d{2,3}[- ]\d{4}$/i;
  var pattern_Modern = /^[a-z ]{1,6}[- ]\d{4}/i;
  // using if else check that
  if (pattern_Vintage.test(vehicle_number)) {
    number_type = "vintage";
  } else if (pattern_Old.test(vehicle_number)) {
    number_type = "old";
  } else if (pattern_Modern.test(vehicle_number)) {
    number_type = "modern";
  } else {
    number_type = "notvaild";
  }
  // create object
  const new_registation = new vehicle({
    vehicle_number,
  });
  if (
    number_type == "modern" ||
    number_type == "old" ||
    number_type == "vintage"
  ) {
    // added the database
    await new_registation
      .save()
      .then((data) => {
        return res.status(200).json({ type: number_type, inserted: true });
      })
      .catch(() => {
        return res.status(200).json({ type: number_type, inserted: false });
      });
  } else if (number_type == "notvaild") {
    return res.status(200).json({ type: "notvaild", inserted: false });
  }
};
//
// GetAllRegistrations
exports.GetAllRegistrations = async (req, res) => {
  await vehicle
    .find({})
    .then((data) => {
      if (data) {
        return res.status(200).json({ data });
      }
    })
    .catch(() => {
      return res.status(404).json({});
    });
};
//
// DeleteRegistrations
exports.DeleteRegistrations = async (req, res) => {
  const { _id } = req.params;

  await vehicle
    .findOne({ _id })
    .then((data) => {
      if (data._id) {
        vehicle
          .deleteOne({ _id })
          .then(() => {
            return res.status(200).json({ deleted: true });
          })
          .catch(() => {
            return res.status(404).json({ deleted: false });
          });
      }
    })
    .catch(() => {
      return res.status(404).json({ deleted: false });
    });
};
//
// UpdateRegistrations
exports.UpdateRegistrations = async (req, res) => {
  const { _id, vehicle_number } = req.body;
  //decalre varible
  var number_type;

  // using Regular Expressions
  var pattern_Vintage = /^\d{2}[ ]ශ්‍රී[ ]\d{4}/i;
  var pattern_Old = /^\d{2,3}[- ]\d{4}$/i;
  var pattern_Modern = /^[a-z ]{1,6}[- ]\d{4}/i;

  // using if else check that
  if (pattern_Vintage.test(vehicle_number)) {
    number_type = "vintage";
  } else if (pattern_Old.test(vehicle_number)) {
    number_type = "old";
  } else if (pattern_Modern.test(vehicle_number)) {
    number_type = "modern";
  } else {
    number_type = "notvaild";
  }
  // database find and update
  await vehicle
    .findOne({ _id })
    .then((data) => {
      if (!(data.vehicle_number === vehicle_number)) {
        if (
          number_type == "modern" ||
          number_type == "old" ||
          number_type == "vintage"
        ) {
          vehicle
            .updateOne({ _id }, { $set: { vehicle_number: vehicle_number } })
            .then((data) => {
              res.status(200).json({
                updated: true,
                type: number_type,
              });
            })
            .catch((er) => {
              res.status(200).json({ updated: false, type: number_type });
            });
        } else if (number_type == "notvaild") {
          res.status(200).json({ updated: false, type: "notvaild" });
        }
      } else {
        res.status(200).json({ updated: "notupdate" });
      }
    })
    .catch(() => {
      res.status(404).json({ updated: false, type: "notvaild" });
    });
};
//
// GetsingleRegistrations
exports.GetsingleRegistrations = async (req, res) => {
  const { _id } = req.params;

  await vehicle
    .findOne({ _id })
    .then((data) => {
      if (data) {
        return res.status(200).json({ data });
      }
    })
    .catch(() => {
      return res.status(404).json({ fetched: false });
    });
};
