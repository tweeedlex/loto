const Router = require("express").Router;
const router = new Router();
const gameController = require("../controllers/game-controller");
const authMiddleware = require("../middlewares/auth-middleware");

router.get("/connect-loto-room", gameController.connectLotoRoom);
router.post("/send-message-room", gameController.sendMessage);

router.post("/create", gameController.create);
router.post("/start", authMiddleware, gameController.start);

module.exports = router;
