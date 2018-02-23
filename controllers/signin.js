const handleSignin = (request,response,db,bcrypt) => {
    const {email, password} = request.body;
    db.select('email','hash').from('login')
        .where('email','=', email)
        .then(data => {
            bcrypt.compare(password, data[0].hash, function(err, res) {
                if(res) {
                    return db.select('*').from('users')
                        .where('email','=',email)
                        .then(user => {
                            response.json(user[0]);
                        })
                    .catch(err => response.status(400).json('unable to get users'))
                }else{
                    response.status(400).json('wrong credentials')
                } 
            });          
        })
    .catch(err => response.status(400).json('wrong credentials'))
}

module.exports = {
    handleSignin
}