"use strict";function _slicedToArray(e,r){return _arrayWithHoles(e)||_iterableToArrayLimit(e,r)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArrayLimit(e,r){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)){var t=[],n=!0,i=!1,s=void 0;try{for(var d,o=e[Symbol.iterator]();!(n=(d=o.next()).done)&&(t.push(d.value),!r||t.length!==r);n=!0);}catch(e){i=!0,s=e}finally{try{n||null==o.return||o.return()}finally{if(i)throw s}}return t}}function _arrayWithHoles(e){if(Array.isArray(e))return e}var db=require("../data/config");function find(){return db("schemes")}function findById(e){return db("schemes").where({id:e}).first()}function findSteps(e){var r=db("steps as s").join("schemes as k","s.id","k.id").select("s.id","k.scheme_name","s.step_number","s.instructions");return db(r).where({id:e})}function remove(e){return db("schemes").where(e.id).first().del()}function add(e){var r=_slicedToArray(db("schemes").insert(e),1)[0];return db("schemes").where({id:r}).first()}module.exports={find:find,findById:findById,findSteps:findSteps,add:add,remove:remove};