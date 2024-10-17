import express from 'express';
import { registerUser, authoriseUser, logOut } from '../controllers/userController';
import { createEvent, getAllEvents, getSingleEvent, deleteEvent } from '../controllers/eventsController';

const router = express.Router();


// ***
// Events API routers
// ***

// Route for creating new event in DB
router.post('/create-event', createEvent);

// Route to get all events from DB
router.get('/all-events', getAllEvents);

// Route to get single event from DB
router.get('/single-event/:id', getSingleEvent);

// Route for event deleting
router.delete('/delete-single-event/:id', deleteEvent);


// ***
// User API routers
// ***

router.post('/sign-up', registerUser);

router.post('/login', authoriseUser);

router.post('/logout', logOut);

export default router;
