const mongoose = require("mongoose");
const chalk = require("chalk");

module.exports = {
  // Database connect
  connect: function(dbURI) {
    console.log(chalk.green(`conecting to: ${dbURI}`));

    mongoose.connect(
      dbURI,
      { useNewUrlParser: true },
      err => {
        if (err) {
          console.log(chalk.red(error));
        } else {
          console.log(chalk.green(`database conected`));
        }
      }
    );
  }
};
