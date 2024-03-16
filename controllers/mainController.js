
import mongoose from 'mongoose';
import {Books} from '../models/models.js'

export const getWelcome = async (req, res) => {
    try {
        const message = "Hello! welcome priyanka"
        res.status(200).json(message);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

export const getAllBooks = async (req, res) => {
    try {
        const allBooks = await Books.find({}) 
        res.status(200).json(allBooks);
    } catch (error) {
        console.log("error ",error)
        res.status(404).json({ message: error.message});
    }
}
export const returnBook = async (req, res) => {
    try {
        const {id:id} = req.params;
        const payload = req.body
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send("No such book");
        }
    //const book = await Books.findById(id)
        if(payload.NumberOfCopies <= payload.CurrentCount) {
            return res.status(200).json({"message": "Cannot return more books"})
        }
        const updatedbook = await Books.findByIdAndUpdate(id,{...payload, CurrentCount: payload.CurrentCount+1})
        return res.json(updatedbook)
    } catch (error) {
        console.log("error ",error)
        return res.status(404).json({ message: error.message});
    }
}

export const borrowBook = async (req, res) => {
    try {
        console.log("inside borrow ")
        const {id:id} = req.params;
      //  const payload = req.body;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send("No such book");
        }
        const book = await Books.findById(id)
        console.log("book", book)
        if(book.CurrentCount <= 0){
            return res.status(200).json({"message": "Cannot borrow more books"})
        }
        const updated = {
            ...book,
            CurrentCount: book.CurrentCount - 1
        }
        console.log("updated payload ", updated)
        const updatedbook = await Books.findByIdAndUpdate(id,{CurrentCount: book.CurrentCount - 1})
        return  res.status(200).json(updatedbook)
    } catch (error) {
        console.log("error ",error)
       return res.status(404).json({ message: error.message});
    }
}
