const db = require('../data/config');

// resolves to a promise that resolves to an array of all schemes in the database.

function find() {
    return db('schemes')
}

// resolves to  Resolve to a single scheme object (or null)

function findById(id) {
    return db('schemes').where({ id }).first();
}

// Resolves to an array of all correctly ordered step for the given scheme: `[ { id: 17, scheme_name: 'Find the Holy Grail', step_number: 1, instructions: 'quest'}, { id: 18, scheme_name: 'Find the Holy Grail', step_number: 2, instructions: '...and quest'}, etc. ]`.

async function add(scheme) {
    await db('schemes').insert(scheme)
    .then(ids => {
      return findById(ids[0]);
    });
}


function remove(id) {
    return db('schemes').where({id}).first().del()

}

// stretch
function findSteps(id) {
    /*  SELECT s.id, k.scheme_name, s.step_number,s.instructions 
     FROM steps AS s
     JOIN [schemes] AS k
     ON s.id = k.id; */

    //  const steps =  db('steps').where({id}) 

    const steps = db('steps as s')
        .join('schemes as k', 's.id', 'k.id')
        .select('s.id', 'k.scheme_name', 's.step_number', 's.instructions');



    return db(steps).where({ id });
}

async function update(changes,id) {

    
      const scheme =  await db("schemes").where({id}).update(changes);
      return scheme
      
}





module.exports = {
    find,
    add,
    remove,
    findById,
    findSteps,
    update
}