const token = artifacts.require("Token");

module.exports = function (deployer) {
  deployer.deploy(token, 'Name', 'Symbol', 1000000);
};
