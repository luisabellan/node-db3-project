const db = require('../data/config')

// resolves to a promise that resolves to an array of all schemes in the database.

 function  find(){
    return  db('schemes')
}

// resolves to  Resolve to a single scheme object (or null)

function findById(id){
    return db('schemes').where({id}).first();
}

// Resolves to an array of all correctly ordered step for the given scheme: `[ { id: 17, scheme_name: 'Find the Holy Grail', step_number: 1, instructions: 'quest'}, { id: 18, scheme_name: 'Find the Holy Grail', step_number: 2, instructions: '...and quest'}, etc. ]`.
  function findSteps(id){
    const steps =  db('steps').where({id})  //.del('scheme_id')
    
    // remove(id)
    // add(scheme_name)
    //console.log(schemeName)
    return steps
} 

function remove(id){
    return db('schemes').where({id}).first().del('scheme_id')

}


module.exports = {
    find,
    findById,
    findSteps,
}