const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/dashboard.controller");

router.get("/", controller.dashBoard);

module.exports = router;
