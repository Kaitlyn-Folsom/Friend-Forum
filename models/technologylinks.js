var bcrypt = require("bcrypt-nodejs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {

//Business chatroom Module
  var TechnologyLinks = sequelize.define("TechnologyLinks", {
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
    return TechnologyLinks;

};