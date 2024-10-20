import { Request, Response, NextFunction } from 'express';
import { EventModel } from '../models/event.models';


export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newEvent = new EventModel(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);

  } catch (error) {
    next(error);
  }
};

export const getAllEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await EventModel.find();
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

export const getSingleEvent = async (req: Request, res: Response, next: NextFunction) => {
  const eventId = req.params.id;

  try {
    const event = await EventModel.findById(eventId);
    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
}

export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
  const eventId = req.params.id;

  try {
    const deletedEvent = await EventModel.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const approveEvent = async (req: Request, res: Response, next: NextFunction) => {
  const eventId = req.params.id;

  try {
    const updatedEvent = await EventModel.findByIdAndUpdate(
      eventId,
      { approved: true },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event approved successfully', event: updatedEvent });
  } catch (error) {
    next(error);
  }
};
