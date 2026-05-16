import httpStatus from 'http-status';
import catchAsync from '../../utils/catcgAsync';
import sendResponse from '../../utils/sendResponse';
import { StatServices } from './stat.service';

const createStat = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await StatServices.createStatInDB(payload);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Stat created/updated successfully',
    data: result,
  });
}); 

const getStat = catchAsync(async (req, res) => {
  const result = await StatServices.getStatFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Stat retrieved successfully',
    data: result,
  });
});

const updateStat = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await StatServices.updateStatInDB(payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Stat updated successfully',
    data: result,
  });
});

export const StatControllers = {
  createStat,
  getStat,
  updateStat,
};
