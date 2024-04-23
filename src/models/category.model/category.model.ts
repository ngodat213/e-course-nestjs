import { Connection, Document, Model, Schema, SchemaType, SchemaTypes } from 'mongoose';

interface Category extends Document{
	readonly _id: string;
	readonly category: string;
}

type CategoryModel = Model<Category>;

const CategorySchema = new Schema<Category>(
	{
		_id: SchemaTypes.ObjectId,
		category:{type: SchemaTypes.String, required: true},
	}
);

const createCategoryModel: (conn: Connection) => CategoryModel =(
	connection: Connection,
) => connection.model<Category>('Category', CategorySchema, 'Categorys');

export {Category, CategoryModel, createCategoryModel};
