import { Connection, Document, Model, Schema, SchemaType, SchemaTypes } from 'mongoose';

interface Category extends Document{
	readonly category: string;
  deleteAt: Date;
}

type CategoryModel = Model<Category>;

const CategorySchema = new Schema<Category>(
	{
		category:{type: SchemaTypes.String, required: true, unique: true},
		deleteAt:{type: SchemaTypes.Date, default: null},
	}
);

const createCategoryModel: (conn: Connection) => CategoryModel =(
	connection: Connection,
) => connection.model<Category>('Category', CategorySchema, 'Categorys');

export {Category, CategoryModel, createCategoryModel};
