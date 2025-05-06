module.exports = [
    { path: /^\/admin/, method: "GET", isAdmin: true },
    { path: /^\/user/, method: "POST", isAdmin: false },
  ]