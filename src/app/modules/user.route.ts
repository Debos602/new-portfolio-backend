import express from 'express';
import { UserControllers } from './user/user.controller';
import auth from '../Middlewar/auth';
import { BlogControllers } from './Blog/blog.controller';
import { ExperienceControllers } from './experience/experience.controller';
import { ProjectsControllers } from './projects/project.controller';
import { multerUpload } from '../config/multer.config';
import { SkillControllers } from './skill/skill.controller';
import { StatControllers } from './stat/stat.controller';

const router = express.Router();
//Auth-------------
router.post('/auth/signup', UserControllers.SignUp);
router.post('/auth/signin', UserControllers.SignIn);
router.post('/auth/forget-password', UserControllers.forgetPassword);
router.post('/auth/reset-password', UserControllers.resetPassword);
router.post('/auth/refresh-token', UserControllers.refreshToken);
//skills-----------
router.post('/skills', auth('admin'), SkillControllers.createSkill);
router.get('/skills', SkillControllers.getAllSkills);
router.delete('/delete-skills/:_id', auth('admin'), SkillControllers.deleteSkill);
router.patch('/update-skills', auth('admin'), SkillControllers.updateSkill);

// stats (dashboard card)
router.post('/stats', auth('admin'), StatControllers.createStat);
router.get('/stats', StatControllers.getStat);
router.patch('/stats', auth('admin'), StatControllers.updateStat);

//blog------------
router.post('/blogs', multerUpload.single("image"), auth('admin'), BlogControllers.createBlog);
router.get('/blogs', BlogControllers.getBlog);
router.patch('/update-blogs', multerUpload.single("image"), auth('admin'), BlogControllers.updateBlog);
router.delete('/delete-blogs/:_id', auth('admin'), BlogControllers.deleteBlog);
// experience-------------
router.get('/experience', ExperienceControllers.getAllExperiences);
router.post('/experience', auth('admin'), ExperienceControllers.createExperience);
router.delete('/delete-experience/:_id', auth('admin'), ExperienceControllers.deleteExperience);
router.patch('/update-experience', ExperienceControllers.updateExperience);
//project----------------
// project.route.ts
router.post("/project",multerUpload.single("image"), auth("admin"), ProjectsControllers.createProject);
router.get("/project",ProjectsControllers.getAllProjects);
// reorder projects (expects `order` array in body: ["id1","id2",...])
router.patch('/project/reorder',  ProjectsControllers.reorderProjects);
router.get("/project/:id",ProjectsControllers.getSingleProject);
router.patch("/project/:id",multerUpload.single("image"),auth("admin"),ProjectsControllers.updateProject);
router.delete("/project/:id",auth("admin"), ProjectsControllers.deleteProject);

//user----------
router.get('/auth/all-users', auth('admin'), UserControllers.getAllUserFromDb);
router.get('/auth/admin', auth('admin'), UserControllers.getAdminFromDb);
router.get('/auth/user', auth('user'), UserControllers.getUserFromDb);
router.put('/auth/update-user', auth('user'), UserControllers.updateUserinDb);
router.put(
  '/auth/update-role/:userId',
  auth('admin'),
  UserControllers.updateUserRoleInDb,
);


export const UserRoutes = router;
