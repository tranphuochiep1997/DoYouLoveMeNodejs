module.exports = {
  MONGODB_URL: `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ds139951.mlab.com:39951/doyouloveme`,
  // MONGODB_URL: "mongodb://localhost:27017/doyouloveme",
  // MONGODB_URL: "mongodb://172.16.1.204:27017/doyouloveme",
  // MONGODB_URL: "mongodb://192.168.1.14:27017/doyouloveme",
  PORT_CONFIG: 5000,
  LIMIT: 3,
  LIMIT_MESSAGE: 20,
  SECRET_KEY: process.env.SECRET_KEY,
  DEFAULT_IMG: "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
}