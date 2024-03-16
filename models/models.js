
import mongoose from 'mongoose';

const bookSchema = mongoose.Schema({
   BookId: Number,
   BookName: String,
   NumberOfCopies: Number,
   BorrowedBooks: Number,
   CurrentCount: Number,

})

const memberSchema = mongoose.Schema({
    MemberID: Number,
    MemberName: String,
})

export const Books = mongoose.model("books", bookSchema)
export const Members = mongoose.model("members", memberSchema)

