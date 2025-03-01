import { RequestHandler } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponses';
import httpStatus from 'http-status';

const createStudent: RequestHandler = async (req, res, next) => {
  try {
    const { password, student: studentsData } = req.body;

    // Data validation using zod
    // const zodParsedData = studentValidationSchema.parse(studentsData);

    // will call service func to send this data
    const result = await UserServices.createStudentIntoDB(
      password,
      studentsData,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserControllers = {
  createStudent,
};
