var bcrypt = require("bcrypt-nodejs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {

//Business chatroom Module
  var Gaming = sequelize.define("Gaming", {
    author: {
        type: DataTypes.STRING
    },
    body: {
        type: DataTypes.STRING
    },
    created_at: {
        type: DataTypes.DATE
    }
   }, {
       timestamps: false
   });
    return Gaming;

};