const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');

require('./models/seminar');

const SeminarFetch=mongoose.model('seminarModel');

router.get('/',(req,res)=>{
  SeminarFetch.find({}).sort({"id":-1})
  .then(seminar=>{
    res.render('seminar',{
      seminar:seminar
    });
  })
})

module.exports=router;
