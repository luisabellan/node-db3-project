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


function add(scheme) {
  return regeneratorRuntime.async(function add$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(db('schemes').insert(scheme).then(function (ids) {
            return findById(ids[0]);
          }));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
}

function remove(id) {
  return db('schemes').where({
    id: id
  }).first().del();
}

function findSteps(id) {
  /*  SELECT s.id, k.scheme_name, s.step_number,s.instructions 
   FROM steps AS s
   JOIN [schemes] AS k
   ON s.id = k.id; */
  //  const steps =  db('steps').where({id}) 
  var steps = db('steps as s').join('schemes as k', 's.id', 'k.id').select('s.id', 'k.scheme_name', 's.step_number', 's.instructions');
  return db(steps).where({
    id: id
  });
}

function update(changes, id) {
  var scheme;
  return regeneratorRuntime.async(function update$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(db("schemes").where({
            id: id
          }).update(changes));

        case 2:
          scheme = _context2.sent;
          return _context2.abrupt("return", scheme);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}

module.exports = {
  find: find,
  add: add,
  remove: remove,
  findById: findById,
  findSteps: findSteps,
  update: update
};