
var express = require('express');
var router = express.Router();
var cors = require('cors')
router.use(cors())
/* GET users listing. */

var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://supakrit:123@numerdata-wiqxe.gcp.mongodb.net/test');
var db = mongoose.connection;
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var mySchema = mongoose.Schema({
	name: String,
	fx: String,
	xl: String,
	xr: String,
	x0: String,
	x1: String,
	x: String,
});
var MyModel = mongoose.model('MyModel', mySchema, 'db');
console.log('connect')

router.get('/1', function (req, res, next) {
	MyModel.find({ name: 'bisection' }, function (err, docs) {
		console.log(docs)
		res.json(docs)
	})
});
router.get('/2', function (req, res, next) {
	MyModel.find({ name: 'false position' }, function (err, docs) {
		console.log(docs)
		res.json(docs)
	})
});
router.get('/3', function (req, res, next) {
	MyModel.find({ name: 'onepoint' }, function (err, docs) {
		console.log(docs)
		res.json(docs)
	})
});
router.get('/4', function (req, res, next) {
	MyModel.find({ name: 'newton' }, function (err, docs) {
		console.log(docs)
		res.json(docs)
	})
});
router.get('/5', function (req, res, next) {
	MyModel.find({ name: 'secant' }, function (err, docs) {
		console.log(docs)
		res.json(docs)
	})
});



module.exports = router;