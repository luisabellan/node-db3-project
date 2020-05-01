"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var db = require('../data/config'); // resolves to a promise that resolves to an array of all schemes in the database.


function find() {
  return db('schemes');
} // resolves to  Resolve to a single scheme object (or null)


function findById(id) {
  return db('schemes').where({
    id: id
  }).first();
} // Resolves to an array of all correctly ordered step for the given scheme: `[ { id: 17, scheme_name: 'Find the Holy Grail', step_number: 1, instructions: 'quest'}, { id: 18, scheme_name: 'Find the Holy Grail', step_number: 2, instructions: '...and quest'}, etc. ]`.


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

function remove(scheme) {
  return db('schemes').where(scheme.id).first().del();
}

function add(scheme) {
  var _db$insert = db('schemes').insert(scheme),
      _db$insert2 = _slicedToArray(_db$insert, 1),
      id = _db$insert2[0];

  var sch = db('schemes').where({
    id: id
  }).first();
  return sch;
}

module.exports = {
  find: find,
  findById: findById,
  findSteps: findSteps,
  add: add,
  remove: remove
};