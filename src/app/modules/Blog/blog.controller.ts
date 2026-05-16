import httpStatus from "http-status";
import catchAsync from "../../utils/catcgAsync";
import sendResponse from "../../utils/sendResponse";
import { BlogServices } from "./blog.service";


const createBlog = catchAsync(async (req, res) => {
    const result = await BlogServices.createBlogIntoDB({ ...req.body, image: req.file?.path });
    console.log(result);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog is created succesfully',
        data: result,
    });
});

const getBlog = catchAsync(async (req, res) => {
    const result = await BlogServices.getBlogFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog is retrieved succesfully',
        data: result,
    });
});

const deleteBlog = catchAsync(async (req, res) => {
    const result = await BlogServices.deleteBlogFromDb(req.params._id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog is deleted succesfully',
        data: result,
    });
});
const updateBlog = catchAsync(async (req, res) => {
    const result = await BlogServices.updateBlogFromDb(
        req.body._id, // First argument
        {
            ...req.body,
            image: req.file?.path
        } // Second argument
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog is updated successfully',
        data: result,
    });
});

export const BlogControllers = {
    createBlog,
    getBlog,
    deleteBlog,
    updateBlog
};