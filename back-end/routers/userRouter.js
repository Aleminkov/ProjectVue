const Router = require("express");
const userController = require("../controllers/userController");
const router = new Router();

router.post("/login", userController.login);
router.post("/registration", userController.registration);

module.exports = router;
