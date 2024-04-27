import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose';

interface Blog extends Document{
    
}

type BlogModel = Model<Blog>;

const BlogSchema = new Schema<Blog>(
  {

  }
);

const createBlogModel: (conn: Connection) => BlogModel = (
  connection: Connection,
) => connection.model<Blog>('Blog', BlogSchema, 'Blogs');

export { Blog, BlogModel, createBlogModel };

