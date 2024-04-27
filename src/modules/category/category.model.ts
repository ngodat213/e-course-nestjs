import { Connection, Document, Model, Schema, SchemaType, SchemaTypes } from 'mongoose';

interface Category extends Document{
	readonly category: string;
}

type CategoryModel = Model<Category>;

const CategorySchema = new Schema<Category>(
	{
		category:{type: SchemaTypes.String, required: true},
	}
);

const createCategoryModel: (conn: Connection) => CategoryModel =(
	connection: Connection,
) => connection.model<Category>('Category', CategorySchema, 'Categorys');

export {Category, CategoryModel, createCategoryModel};
