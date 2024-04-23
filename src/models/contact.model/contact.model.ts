import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose';

interface Contact extends Document{
  readonly _id: string,
  readonly fullName: string,
  readonly mail: string,
  readonly text: string,
  readonly topic: string,
  readonly submitAt: Date,
  readonly watched: Boolean,
}

type ContactModel = Model<Contact>;

const ContactSchema = new Schema<Contact>(
  {
    _id: SchemaTypes.ObjectId,
    fullName: {type: SchemaTypes.String, required: true},
    mail: {type: SchemaTypes.String, required: true},
    text: {type: SchemaTypes.String, required: true},
    topic: {type: SchemaTypes.String, required: true},
    submitAt: {type: SchemaTypes.Date, required: true},
    watched: {type: SchemaTypes.Boolean, required: true},
  }
)

const createContactModel: (conn: Connection) => ContactModel = (
  connection: Connection,
) => connection.model<Contact>('Contact', ContactSchema, 'Contacts');

export { Contact, ContactModel, createContactModel };
