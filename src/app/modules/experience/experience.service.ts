import { TExperience } from "./experience.interface";
import { ExperienceModel } from "./experience.model";

const createExperience = async (payload: TExperience) => {
  const result = await ExperienceModel.create(payload);
  return result;
};

const getAllExperiences = async () => {
  // order field অনুযায়ী sort করবে
  const result = await ExperienceModel.find().sort({ order: 1 });
  return result;
};

const getSingleExperience = async (_id: string) => {
  const result = await ExperienceModel.findById(_id);
  return result;
};

const updateExperience = async (_id: string, payload: Partial<TExperience>) => {
  const result = await ExperienceModel.findByIdAndUpdate(
    _id,
    { $set: payload },          // শুধু পাঠানো fields update হবে
    { new: true, runValidators: true }
  );
  return result;
};

const deleteExperience = async (_id: string) => {
  const result = await ExperienceModel.findByIdAndDelete(_id);
  return result;
};

export const ExperienceServices = {
  createExperience,
  getAllExperiences,
  getSingleExperience,
  updateExperience,
  deleteExperience,
};