"use strict";

var knex = require("knex");

var knexfile = require("../knexfile"); // change to "production" and update knexfile.js to use postgres.


var database = "development";
module.exports = knex(knexfile[database]);