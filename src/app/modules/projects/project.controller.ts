// project.controller.ts
import httpStatus from "http-status";
import catchAsync from "../../utils/catcgAsync";
import sendResponse from "../../utils/sendResponse";
import { ProjectServices } from "./project.service";

const createProject = catchAsync(async (req, res) => {
  // Support clients that send a single `payload` field containing JSON
  const bodyData = req.body && typeof req.body.payload === 'string'
    ? JSON.parse(req.body.payload)
    : req.body;

  const payload = {
    ...bodyData,
    image: req.file?.path, // cloudinary/multer থেকে আসা path
  };

  const result = await ProjectServices.createProject(payload);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Project created successfully",
    data: result,
  });
});

const getAllProjects = catchAsync(async (req, res) => {
  const { category, technology, search, page, limit } = req.query;

  const filters = {
    category: category as string | undefined,
    technology: technology as string | undefined,
    search: search as string | undefined,
    page: page ? parseInt(page as string, 10) : undefined,
    limit: limit ? parseInt(limit as string, 10) : undefined,
  };

  const result = await ProjectServices.getAllProjects(filters as any);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Projects retrieved successfully",
    data: result.data,
    meta: {
      page: result.page,
      limit: result.limit,
      total: result.total,
      totalPage: result.totalPage,
    },
  });
});

const getSingleProject = catchAsync(async (req, res) => {
  const result = await ProjectServices.getSingleProject(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project retrieved successfully",
    data: result,
  });
});

const updateProject = catchAsync(async (req, res) => {
  const bodyData = req.body && typeof req.body.payload === 'string'
    ? JSON.parse(req.body.payload)
    : req.body;

  const payload = {
    ...bodyData,
    ...(req.file?.path && { image: req.file.path }), // নতুন image না দিলে পুরনোটা থাকবে
  };

  const result = await ProjectServices.updateProject(req.params.id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project updated successfully",
    data: result,
  });
});

const deleteProject = catchAsync(async (req, res) => {
  const result = await ProjectServices.deleteProject(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project deleted successfully",
    data: result,
  });
});

const reorderProjects = catchAsync(async (req, res) => {
  const { order } = req.body; // expect array of project ids in desired order

  const result = await ProjectServices.reorderProjects(order);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Projects reordered successfully",
    data: result,
  });
});

export const ProjectsControllers = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
  reorderProjects,
};