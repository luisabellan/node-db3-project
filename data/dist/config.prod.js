"use strict";var knex=require("knex"),knexfile=require("../knexfile"),database="development";module.exports=knex(knexfile[database]);