import { IBlog } from "./blog.interface";
import { blogModel } from "./blog.model";

const createBlogIntoDB = async (payload: IBlog) => {
    const result = await blogModel.create(payload);
    return result;
};
const getBlogFromDB = async () => {
    const result = await blogModel.find();
    return result;
};

const deleteBlogFromDb = async (_id: string) => {
    const result = await blogModel.findByIdAndDelete(_id);
    return result;
};

const updateBlogFromDb = async (_id: string, payload: IBlog) => {
    const result = await blogModel.findByIdAndUpdate(_id, payload, { new: true });
    return result;
};

export const BlogServices = {
    createBlogIntoDB,
    getBlogFromDB,
    deleteBlogFromDb,
    updateBlogFromDb
};