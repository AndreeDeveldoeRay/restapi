/**
 * @Author: Andreee Ray <develdoe>
 * @Date:   2017-04-01T03:17:18+02:00
 * @Email:  me@andreeray.se
 * @Filename: server.js
 * @Last modified by:   develdoe
 * @Last modified time: 2017-04-01T08:20:22+02:00
 */



// SETUP
// ===============================================

var express     = require('express')
var app         = express()
var bodyParser  = require('body-parser')
var mongoose    = require('mongoose')
var User        = require('./app/models/user');

// configure bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var port = process.env.PORT || 4000

// database
mongoose.connect('mongodb://localhost:27017/restapi');


// ROUTES
// ================================================
var router = express.Router()


// /api
router.get('/', function (req,res){
    res.json({message: 'welcome to the api!'})
})

// /restapi/users
// ------------------------------------------------
router.route('/users')

    .post(function(req, res) {

        var user = new User()

        user.name       = req.body.name
        user.email      = req.body.email
        user.password   = req.body.password


        user.save(function(err) {
            if (err) throw err;
            res.json({message:'User saved successfully!'});
        });

    })

    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err) res.send(err);
            res.json(users);
        });
    })

// /restapi/users/:user_id
// -----------------------------------------------
router.route('/users/:user_id')

    .get(function (req,res) {
        User.findById(req.params.user_id, function (err, user) {
            if (err) res.send(err)
            res.json(user)
        })
    })

    .put(function (req,res) {
        User.findById(req.params.user_id, function (err, user) {
            if (err) res.send(err)
            user.name       = req.body.name
            user.email      = req.body.email
            user.password   = req.body.password
            user.save(function (err) {
                if (err) res.send(err)
                res.json({message: 'user updated'})
            })
        })
    })

    .delete(function (req, res) {
        User.remove({
            _id: req.params.user_id
        }, function (err, user) {
            if (err) res.send(err)
            res.json({message: 'Successfully deleted user'})
        })
    })


//  REGISER
//  ===============================================
// prefix /api
app.use('/restapi', router)

// START
// ================================================
app.listen(port)
console.log('Server upp on port', port)
