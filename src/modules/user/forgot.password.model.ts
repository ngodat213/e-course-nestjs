import { Connection, Document, Model, Schema, SchemaType, SchemaTypes } from 'mongoose';

interface ForgotPassword extends Document{
  readonly email: string,
  readonly newPasswordToken: string,
  readonly timestamp: Date,
}

type ForgotPasswordModel = Model<ForgotPassword>;

const ForgotPasswordSchema = new Schema<ForgotPassword>(
  {
    email: {type: SchemaTypes.String, unique: true, required: true, match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
    newPasswordToken: {type: SchemaTypes.String, required: true},
    timestamp: {type: SchemaTypes.Date, required: true},
  },{ timestamps: true }
);

const createForgotPasswordModel: (conn: Connection) => ForgotPasswordModel = (
  connection: Connection,
) => connection.model<ForgotPassword>('ForgotPassword', ForgotPasswordSchema, 'ForgotPasswords');

export {ForgotPassword, ForgotPasswordModel, createForgotPasswordModel};
