
const Clarifai = require('clarifai');
// initialize with your api key. This will also work in your browser via http://browserify.org/

const app = new Clarifai.App({
 apiKey: 'cb3d1f48489b4b8cbfeb084e6a67ba5e'
});

const handleApiCall=(request,response) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, request.body.input)
	.then(data => {
		response.json(data);
	})
	.catch(err => response.status(400).json(err))
}

const handleEntries = (request,response,db) => {
    const {id} = request.body;

    db('users')
        .where('id', '=', id)
        .increment('entries',1)
        .returning('entries')
        .then(entries => response.json(entries))
        .catch(err => {response.status(400).json('unable to get entries')})
    }

module.exports = {
	handleEntries,
	handleApiCall
}