
const handleRegister = (req, res, db, bcrypt) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		return res.status(400).json('incorrect form submission');
	} 
	const hash = bcrypt.hashSync(password);
		db.transaction(trx => {
			trx.insert({
				hash: hash,
				email: email
			})
			.into('login')
			.returning('email')
			.then(loginEmail => {
				return trx('users') //return is important(while using transactions committing) else, JS tends to generate Transaction query already completed error
				.insert({
					email:loginEmail[0],
					name:name,
					joined: new Date()
				},['*'])
				.then(user => {
					res.json(user[0]); // this ensures that the object in the array is selected not the array itself
				})
			})
			.then(trx.commit)
			.catch(trx.rollback)
		})
			.catch(err => res.status(400).json('unable to register'))
}

module.exports = {
	handleRegister: handleRegister
};