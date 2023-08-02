const { Room } = require("../models/db-models");

const events = require("events");
const emitter = new events.EventEmitter();

class GameController {
  async start(req, res) {
    const roomId = req.body.roomId;

    const room = await Room.findOne({ where: { id: roomId } });
    await Game.create({ players: `[${req.user.id}]` });
  }

  async connectLotoRoom(req, res) {
    // const { roomId } = req.body;
    res.writeHead(200, {
      Connection: "keep-alive",
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
    });
    emitter.on("newMessage", (message) => {
      res.write(`data: ${JSON.stringify(message)} \n\n`);
    });
    // const room = await Room.findOne({ where: { id: roomId } });
    // await Game.create({ players: `[${req.user.id}]` });
    // return res.json("connected");
  }

  async sendMessage(req, res) {
    const message = req.body;
    emitter.emit("newMessage", message);
    res.status(200);
  }

  async create(req, res) {}
}

module.exports = new GameController();
