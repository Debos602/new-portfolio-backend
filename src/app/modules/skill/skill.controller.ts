import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { SkillServices } from "./skill.service";
import catchAsync from "../../utils/catcgAsync";
import { TSkillCategory } from "./skill.interface";

const createSkill = catchAsync(async (req, res) => {
  const result = await SkillServices.createSkillIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Skill created successfully",
    data: result,
  });
});

const getAllSkills = catchAsync(async (req, res) => {
  const { category } = req.query;
  const result = await SkillServices.getAllSkillsFromDB(
    category as TSkillCategory | undefined
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Skills retrieved successfully",
    data: result,
  });
});

const getSingleSkill = catchAsync(async (req, res) => {
  const result = await SkillServices.getSingleSkillFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Skill retrieved successfully",
    data: result,
  });
});

const updateSkill = catchAsync(async (req, res) => {
  const result = await SkillServices.updateSkillIntoDB(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Skill updated successfully",
    data: result,
  });
});

const deleteSkill = catchAsync(async (req, res) => {
  const result = await SkillServices.deleteSkillFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Skill deleted successfully",
    data: result,
  });
});

export const SkillControllers = {
  createSkill,
  getAllSkills,
  getSingleSkill,
  updateSkill,
  deleteSkill,
};