// skill.service.ts
import { TSkill } from "./skill.interface";
import { SkillModel } from "./skill.model";

const createSkillIntoDB = async (payload: TSkill) => {
  const result = await SkillModel.create(payload);
  return result;
};

const getAllSkillsFromDB = async (category?: TSkill["category"]) => {
  // optional category filter দিয়ে query করা যাবে
  const filter = category ? { category } : {};
  const result = await SkillModel.find(filter);
  return result;
};

const getSingleSkillFromDB = async (_id: string) => {
  const result = await SkillModel.findById(_id);
  return result;
};

const updateSkillIntoDB = async (_id: string, payload: Partial<TSkill>) => {
  const result = await SkillModel.findByIdAndUpdate(
    _id,
    { $set: payload },   // $set → শুধু পাঠানো fields update হবে
    { new: true, runValidators: true }
  );
  return result;
};

const deleteSkillFromDB = async (_id: string) => {
  const result = await SkillModel.findByIdAndDelete(_id);
  return result;
};

export const SkillServices = {
  createSkillIntoDB,
  getAllSkillsFromDB,
  getSingleSkillFromDB,
  updateSkillIntoDB,
  deleteSkillFromDB,
};