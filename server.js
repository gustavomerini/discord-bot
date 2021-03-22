module.exports.init = () => {
  try {
    console.log('init server');
    const express = require("express");
    const app = express();
    const path = require("path");
    const cookieParser = require("cookie-parser");
    const cors = require("cors");
    const http = require("http");

    // view engine setup
    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "jade");

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, "public")));

    // error handler
    app.use(function (err, req, res, next) {
      const message = err.data.status.message;
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get("env") === "development" ? err : {};

      // render the error page
      if (message) {
        res.send(message);
      } else {
        res.send("error");
      }
    });
    const port = normalizePort(process.env.PORT || "3000");
    app.set("port", port);
    const server = http.createServer(app);
    server.listen(port, () =>
      console.log(`Node server listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
