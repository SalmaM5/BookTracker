const Book = require('../models/Books');
const User = require('../models/User');

const index = async (req, res) => {
    try {
        const userBooks = await Book.find({ owner: req.session.user._id })
        
        res.render('resources/index.ejs', {
            title: 'Listing Books',
           books: userBooks,
          
        })
        
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}

const newBooks = (req,res) =>{

    res.render('resources/new.ejs', {
        title:'new'
})
}

const BooksList = async (req,res)=>{
    try{

    req.body.owner=req.params.userId
    await Book.create(req.body)
    res.redirect('/resources'),
   
    console.log('request body: ', req.body)
    }
    catch(error){
        console.log(error)

    }
}

const FavoriteBooks = async (req,res) => {
    try{
      const favorites = await Book.find({status : 'whishlist'}).populate('owner');
      console.log(favorites)
      res.render('resources/whishlist.ejs', {
        title: 'Wishlist',
        favorites
    })
    } catch (error){
        console.log(error)
        res.redirect('/')
    }
    
} 


const showBooks = async (req, res) => {
    try {
        const showBook = await Book.findById(req.params.showBookId).populate('owner')      

        res.render('resources/show.ejs', {
            title:showBook.title,
           showBook,
         
        })

    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}


const deleteBooks = async (req, res) => {
    console.log('DELETE route hit');
    try {
        console.log('Params:', req.params); 
        const dbook = await Book.findById(req.params.dbookId)

        if (!dbook) {
            return res.status(404).send("Book not found.");
        }
         
        if (dbook.owner.equals(req.params.userId)) { 
            await dbook.deleteOne()
            console.log("Book deleted, redirecting...");
            res.redirect('/resources')
        } else {
            res.send("You don't have permission to do that.") 
        }
    } catch(error) {
        console.log(error)
        res.redirect('/')
    }
}

const editBooks = async(req,res)=>{
    try{
      const editBook = await Book.findById(req.params.editBookId).populate('owner')
      if(editBook.owner.equals(req.params.userId)) {
          res.render('resources/edit.ejs', {
              title: `Edit ${editBook.title}`,
              editBook
          })
      } else {
          res.send("You don't have permission to do that.") 
      }

    }
    catch(error){
     console.log(error)
     res.redirect('/')

    }

}

const updateBooks = async (req, res) => {
    try {
        const update = await Book.findByIdAndUpdate(
            req.params.updateId,
            req.body,
            { new: true }
        )
        res.redirect(`/resources/${update._id}`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}











module.exports={

    index,
    newBooks,
    BooksList,
    showBooks,
    deleteBooks,
    editBooks,
    updateBooks,
    FavoriteBooks,
}

