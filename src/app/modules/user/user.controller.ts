import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, student: studentsData } = req.body;

    // Data validation using zod
    // const zodParsedData = studentValidationSchema.parse(studentsData);

    // will call service func to send this data
    const result = await UserServices.createStudentIntoDB(
      password,
      studentsData,
    );

    // Send response
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
      error: err,
    });
  }
};

export const UserControllers = {
  createStudent,
};
