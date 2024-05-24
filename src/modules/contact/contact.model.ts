import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose';

interface Contact extends Document{
  readonly fullName: string,
  readonly mail: string,
  readonly text: string,
  readonly topic: string,
  readonly watched: Boolean,
  deleteAt: Date;
}

type ContactModel = Model<Contact>;

const ContactSchema = new Schema<Contact>(
  {
    fullName: {type: SchemaTypes.String, required: true},
    mail: {type: SchemaTypes.String, required: true},
    text: {type: SchemaTypes.String, required: true},
    topic: {type: SchemaTypes.String, required: true},
    watched: {type: SchemaTypes.Boolean, default: false},
		deleteAt:{type: SchemaTypes.Date, default: null},
  },{ timestamps: true }
)

const createContactModel: (conn: Connection) => ContactModel = (
  connection: Connection,
) => connection.model<Contact>('Contact', ContactSchema, 'Contacts');

export { Contact, ContactModel, createContactModel };
