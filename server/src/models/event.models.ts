import { prop, getModelForClass } from '@typegoose/typegoose';

class eventRequest {
  @prop()
  event_date: string;

  @prop()
  event_time: string;

  @prop()
  event_title: string;

  @prop()
  event_description: string

  @prop()
  location: string;

  @prop()
  event_page: string;

  @prop()
  event_image_url: string; 

  @prop({ default: false })
  approved: boolean;
 
}

export const EventModel = getModelForClass(eventRequest);
