// project.service.ts
import { TProject } from "./project.interface";
import { ProjectModel } from "./project.model";

const createProject = async (payload: TProject) => {
  const result = await ProjectModel.create(payload);
  return result;
};

type ProjectFilters = {
  category?: string;
  technology?: string;
  search?: string;
  page?: number;
  limit?: number;
};

const getAllProjects = async (filters?: ProjectFilters) => {
  const query: any = {};

  if (filters?.category && filters.category !== 'all') query.category = filters.category;
  if (filters?.technology) query.technologies = { $in: [filters.technology] };
  if (filters?.search) {
    const re = new RegExp(filters.search, 'i');
    query.$or = [{ title: re }, { description: re }];
  }

  const page = filters?.page && filters.page > 0 ? filters.page : 1;
  const limit = filters?.limit && filters.limit > 0 ? filters.limit : 0;
  const skip = limit ? (page - 1) * limit : 0;

  let q = ProjectModel.find(query).sort({ order: 1, createdAt: -1 });
  if (limit) q = q.skip(skip).limit(limit);

  const [data, total] = await Promise.all([q.exec(), ProjectModel.countDocuments(query)]);

  return {
    data,
    total,
    page,
    limit,
    totalPage: limit ? Math.ceil(total / limit) : 1,
  };
};

const getSingleProject = async (_id: string) => {
  const result = await ProjectModel.findById(_id);
  return result;
};

const updateProject = async (_id: string, payload: Partial<TProject>) => {
  const result = await ProjectModel.findByIdAndUpdate(
    _id,
    { $set: payload },                    // ✅ $set → existing fields মুছবে না
    { new: true, runValidators: true }
  );
  return result;
};

const reorderProjects = async (orderList: string[]) => {
  if (!Array.isArray(orderList)) throw new Error('orderList must be an array of project ids');

  const bulkOps = orderList.map((id, index) => ({
    updateOne: {
      filter: { _id: id },
      update: { $set: { order: index } },
    },
  }));

  if (bulkOps.length) {
    await ProjectModel.bulkWrite(bulkOps);
  }

  const result = await ProjectModel.find().sort({ order: 1, createdAt: -1 });
  return result;
};

const deleteProject = async (_id: string) => {
  const result = await ProjectModel.findByIdAndDelete(_id);
  return result;
};

export const ProjectServices = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  reorderProjects,
  deleteProject,
};