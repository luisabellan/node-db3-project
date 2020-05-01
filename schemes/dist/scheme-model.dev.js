"use strict";

var db = require('../data/config'); // resolves to a promise that resolves to an array of all schemes in the database.


function find() {
  return db('schemes');
} // resolves to  Resolve to a single scheme object (or null)


function findById(id) {
  return db('schemes').where({
    id: id
  }).first();
} // Resolves to an array of all correctly ordered step for the given scheme: `[ { id: 17, scheme_name: 'Find the Holy Grail', step_number: 1, instructions: 'quest'}, { id: 18, scheme_name: 'Find the Holy Grail', step_number: 2, instructions: '...and quest'}, etc. ]`.


function add(data) {
  return db('schemes').insert(data);
}

function remove(data) {
  return db('schemes').where(data.id).first().del();
}

function findSteps(id) {
  /*  SELECT s.id, k.scheme_name, s.step_number,s.instructions 
   FROM steps AS s
   JOIN [schemes] AS k
   ON s.id = k.id; */
  // const steps =  db('steps').where({id}) 
  var steps = db('steps as s').join('schemes as k', 's.id', 'k.id').select('s.id', 'k.scheme_name', 's.step_number', 's.instructions');
  return db(steps).where({
    id: id
  });
}

module.exports = {
  find: find,
  add: add,
  remove: remove,
  findById: findById,
  findSteps: findSteps
};