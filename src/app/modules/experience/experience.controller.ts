import httpStatus from "http-status";
import catchAsync from "../../utils/catcgAsync";
import sendResponse from "../../utils/sendResponse";
import { ExperienceServices } from "./experience.service";

const createExperience = catchAsync(async (req, res) => {
  const result = await ExperienceServices.createExperience(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,       // ✅ 201
    success: true,
    message: "Experience created successfully",
    data: result,
  });
});

const getAllExperiences = catchAsync(async (req, res) => {
  const result = await ExperienceServices.getAllExperiences();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Experiences retrieved successfully",
    data: result,
  });
});

const getSingleExperience = catchAsync(async (req, res) => {
  const result = await ExperienceServices.getSingleExperience(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Experience retrieved successfully",
    data: result,
  });
});

const updateExperience = catchAsync(async (req, res) => {
  const result = await ExperienceServices.updateExperience(
    req.params.id,        // ✅ params থেকে id নিতে হবে
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Experience updated successfully",
    data: result,
  });
});

const deleteExperience = catchAsync(async (req, res) => {
  const result = await ExperienceServices.deleteExperience(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Experience deleted successfully",
    data: result,
  });
});

export const ExperienceControllers = {
  createExperience,
  getAllExperiences,
  getSingleExperience,
  updateExperience,
  deleteExperience,
};