import express from 'express';
import { getWelcome, getAllBooks, returnBook, borrowBook } from '../controllers/mainController.js';



const router = express.Router();

router.get('/welcome', getWelcome);

router.get('/allbooks', getAllBooks);

router.post('/books/return/:id', returnBook );

router.post('/books/borrow/:id', borrowBook);

export default router;