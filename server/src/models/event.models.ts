import { prop, getModelForClass } from '@typegoose/typegoose';

class eventRequest {
  @prop({ default: "" })
  user_id: string;

  @prop()
  url: string;

  @prop()
  event_date: string;

  @prop()
  event_time: string;

  @prop()
  event_title: string;

  @prop()
  location: string;

  @prop()
  event_page: string;

 
}

export const EventModel = getModelForClass(eventRequest);
