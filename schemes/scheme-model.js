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
   /*  SELECT s.id, k.scheme_name, s.step_number,s.instructions 
    FROM steps AS s
    JOIN [schemes] AS k
    ON s.id = k.id; */

   // const steps =  db('steps').where({id}) 
   
   const  steps =  db('steps as s')
   .join('schemes as k', 's.id', 'k.id')
   .select('s.id', 'k.scheme_name', 's.step_number', 's.instructions')
   


    return db(steps).where({id})
} 

funcion add(scheme) {
    const [id] = await db("schemes").insert(req.body)
    const schemes = await db("schemes").where({ id }).first()

}

function remove(id){
    return db('schemes').where('scheme_id' === id).first().del()

}


module.exports = {
    find,
    findById,
    findSteps,
    remove,
    add
}