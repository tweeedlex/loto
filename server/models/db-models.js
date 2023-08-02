const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, unique: true, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  username: { type: DataTypes.STRING, allowNull: false },
  isAdmin: { type: DataTypes.STRING, defaultValue: false },
  balance: { type: DataTypes.INTEGER, defaultValue: 0 },
});

const Token = sequelize.define("token", {
  userId: { type: DataTypes.INTEGER },
  refreshToken: { type: DataTypes.STRING },
});

const Room = sequelize.define("room", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
  type: { type: DataTypes.STRING, allowNull: false },
  bet: { type: DataTypes.INTEGER, allowNull: false },
});

const Game = sequelize.define("game", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
  players: { type: DataTypes.JSON, allowNull: false },
  winnerLotoCard: { type: DataTypes.JSON },
  startedAt: { type: DataTypes.DATE },
  finishedAt: { type: DataTypes.DATE },
  status: { type: DataTypes.STRING, defaultValue: "WAITING" },
});

const LotoCard = sequelize.define("card", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
  card: { type: DataTypes.JSON, allowNull: false },
});

User.hasMany(Token);
Token.belongsTo(User);

Room.hasMany(Game);
Game.belongsTo(Room);

Game.hasMany(User);
User.belongsTo(Game);

Game.hasMany(LotoCard);
LotoCard.belongsTo(Game);

User.hasMany(LotoCard);
LotoCard.belongsTo(User);

module.exports = {
  User,
  Token,
  Room,
  Game,
  LotoCard,
};
