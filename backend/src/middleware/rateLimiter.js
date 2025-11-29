// Minimal rate-limiter placeholder using rate-limiter-flexible (simple configuration)
const { RateLimiterMemory } = require("rate-limiter-flexible");

const limiter = new RateLimiterMemory({
  points: 100, // 100 requests
  duration: 60 // per 60 seconds by IP
});

module.exports = function (req, res, next) {
  const ip = req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  limiter.consume(ip)
    .then(() => next())
    .catch(() => {
      res.status(429).json({ error: "Too many requests" });
    });
};
