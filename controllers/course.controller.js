const validator = require('fastest-validator');
const models = require('../models')
const { Op } = require('sequelize');

function save(req,res) {
    const course = {
        title : req.body.title,
        category : req.body.category,
        price : req.body.price,
        imageUrl : req.body.imageUrl,
        userId : 1
    }

    const schema = {
        title : {type: 'string' , optional : false, max : '255'},
        category : {type: 'string' , optional : false, max : '255'},
        price : {type: 'number' , optional : false},
        imageUrl : {type: 'string' , optional : false, max : '255'},
    }

    const v = new validator()
   const validatorRespon = v.validate(course , schema)

   if(validatorRespon !== true) {
    return res.status(400).json({
        message : 'Validation failed',
        error : validatorRespon
    })
   }

    models.Course.create(course).then(result => {
        res.status(201).json({
            message : 'Course created successfully',
            course : result
        })
    }).catch(error => {
            res.status(500).json({
            message : 'Error creating course',
            error : error
        })
    })
}


function show(req,res) {
    const id = req.params.id

    models.Course.findByPk(id)
    .then(result => {

        if(!result){
            return res.status(404).json({
                message : 'Course not found'
            })
        }

        res.status(200).json(result)

    })
    .catch(error => {
        res.status(500).json({
            message : 'Error fetching course',
            error : error.message
        })
    })
}

function index(req, res) {

    const where = {};
    let order = [];

    // FILTER
    if (req.query.category) {
        where.category = req.query.category;
    }

    // SEARCH
    if (req.query.search) {
        where[Op.or] = [
            { title: { [Op.like]: `%${req.query.search}%` } },
            { category: { [Op.like]: `%${req.query.search}%` } }
        ];
    }

    // SORT SAFE
    const allowedSort = ['title','price','category','createdAt'];

    if (req.query.sort && allowedSort.includes(req.query.sort)) {
        const direction = req.query.order === 'DESC' ? 'DESC' : 'ASC';
        order.push([req.query.sort, direction]);
    }

    // PAGINATION
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    models.Course.findAndCountAll({
        where,
        order,
        limit,
        offset
    })
    .then(result => {
        res.status(200).json({
            totalData: result.count,
            totalPage: Math.ceil(result.count / limit),
            currentPage: page,
            data: result.rows
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Error fetching courses",
            error: error.message
        });
    });
}

function update(req,res) {
    const id = req.params.id
    const updateCourse = {
        title : req.body.title,
        category : req.body.category,
        price : req.body.price,
        imageUrl : req.body.imageUrl
    }

      const schema = {
        title : {type: 'string' , optional : false, max : '255'},
        category : {type: 'string' , optional : false, max : '255'},
        price : {type: 'number' , optional : false},
        imageUrl : {type: 'string' , optional : false, max : '255'},
    }

    const v = new validator()
   const validatorRespon = v.validate(updateCourse , schema)

   if(validatorRespon !== true) {
    return res.status(400).json({
        message : 'Validation failed',
        error : validatorRespon
    })
   }

    models.Course.update(updateCourse, {where : {id : id }}).then(result => {
        res.status(200).json({
            message : 'Course updated successfully',
            course : updateCourse
        })
    }).catch(error => {
        res.status(500).json({
            message : 'Error updating course',
            error : error
        })
    })
}

function destroy(req,res) {
    const id = req.params.id
    models.Course.destroy({where : {id : id }}).then(result => {
        res.status(200).json({
            message : 'Course deleted successfully'
        })
    }).catch(error => {
        res.status(500).json({
            message : 'Error deleting course',
            error : error
        })
    })
}

module.exports = {
  save : save,
  show : show,
  index : index,
  update : update,
  destroy : destroy
}