import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponses';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentsData } = req.body;

  // will call service func to send this data
  const result = await UserServices.createStudentIntoDB(password, studentsData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};
