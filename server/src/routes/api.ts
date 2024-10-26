import express from 'express';
import { registerUser, authoriseUser, getUser, logOut } from '../controllers/userController';
import { createEvent, getAllEvents, getSingleEvent, deleteEvent, approveEvent, getAdditionalEventData } from '../controllers/eventsController';

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
router.delete('/delete-event/:id', deleteEvent);

// Route for event approval
router.put('/approve-event/:id', approveEvent);

// Route for additional event data
router.post('/additional-event-data', getAdditionalEventData);


// ***
// User API routers
// ***

router.post('/sign-up', registerUser);

router.post('/login', authoriseUser);

router.get('/user/:id', getUser);

router.post('/logout', logOut);

export default router;
