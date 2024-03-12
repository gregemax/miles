const express=require('express')
const { get, post, Delete, update, getbyid, highest, aggreate, error } = require('./controls')

const greg=express.Router()

greg.route('/highest').get(highest,get)
greg.route('/max/:id').get(aggreate)
greg.route('/').get(get).post(post) 


greg.route('/:id').patch(update).get(getbyid).delete(Delete)


module.exports=greg