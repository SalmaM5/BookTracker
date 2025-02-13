const mongoose = require('mongoose')

const BooksSchema = new mongoose.Schema({
    
   title:{
       type: String,
       Required : true , 
   },

   author:{
     type: String,
     Required: true,

   },
   status: {
    type: String,
    enum: ['reading', 'completed', 'whishlist'],
    required:true,
  },

  descrption:{
    type: String,
    Required:true,
  },

  Totalpages:{
    type: Number,
    Required: true,
  },

  Currentpages:{
    type:Number,
    required: true,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
},

},{timestamps: true})


const Books = mongoose.model('Books',BooksSchema)

module.exports = Books;
 

