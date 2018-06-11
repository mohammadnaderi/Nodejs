var express = require('express');
var jwt = require('jsonwebtoken');
var md5 = require('md5');
var router = express.Router();
var { auth,
    permit,
    courseExist } = require('../../functions/authentication');

var Course = require('../../models/course.model');
var User = require('../../models/user.model');
router.get('/:id', function (req, res) {
    Course.findById(re.params.id).then(function (course) {
        res.send({
            status: 'success',
            data: {
                course: course
            }
        });
    }).catch(function (err) {
        res.send({
            status: "error",
            error: err
        });
    })
});

router.get('/', function (req, res) {
    Course.find({}).then(function (course) {
        res.send({
            status: 'success',
            data: {
                course: course
            }
        });
    }).catch(function (err) {
        res.send({
            status: "error",
            error: err
        });
    })
});

router.delete('/:id', auth, permit('teacher'), function (req, res) {

    Course.findByIdAndRemove(req.params.id).then(function (course) {
        res.send({
            status: 'success',
            data: { message: 'class hazf shod' }
        });
    }).catch(function (error) {
        res.send({
            status: 'error',
            error: error
        })
    });
});
router.post('/', auth, permit('teacher'), async function (req, res) {
    try {
        let course = new Course();
        course.title = req.body.title;
        course.teacherID = req.body.teacherID;
        await course.save();
        res.send({
            status: 'success',
            data: {
                message: 'class ezafe shod'
            }
        })
    } catch (error) {
        res.send({
            status: 'error',
            error: error
        })
    }
});

module.exports = router;