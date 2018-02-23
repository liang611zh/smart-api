const handleProfile = (request,response,db) => {
    const {id} = request.params;
    db.select('*').from('users').where({id})
    .then(user => {
        if(user.length){
            response.json(user[0])
        }else{
            response.status(400).json('not found')
        }
    })
    .catch(err => response.status(400).json('error to getting user'))
}

module.exports={
	handleProfile
}