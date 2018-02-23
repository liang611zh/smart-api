const handleRegister = (request,response,db,bcrypt) => {
    const {name,email,password,}=request.body;
    bcrypt.hash(password, null, null, function(err, hash) {
        db.transaction(trx => {
            trx.insert({
                hash:hash,
                email:email,
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name:name,
                        joined:new Date(),

                    })
                    .then(user => {
                        response.json(user[0]);
                    })
                })
            .then(trx.commit)
            .catch(trx.rollback)
        })
        .catch(err=>response.status(400).json('unable to register'));
    });
}

module.exports = {
	handleRegister
}