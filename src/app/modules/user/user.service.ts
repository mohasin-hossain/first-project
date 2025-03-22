import mongoose from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // Create a user object
  const userData: Partial<TUser> = {};

  // If password is not given, use default password
  userData.password = password || (config.default_password as string);

  // Set student role
  userData.role = 'student';

  // Find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // Set generated ID
    userData.id = await generateStudentId(admissionSemester);

    // Create a user (Transaction - 1)
    const newUser = await User.create([userData], { session });

    // Create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user!');
    }

    // Set id, _id as user
    payload.id = newUser[0].id; // Embedding the Id
    payload.user = newUser[0]._id; // Referencing to the user document

    // Create a student (Transaction - 2)
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Student!');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (er) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to create Student!');
  }
};

export const UserServices = {
  createStudentIntoDB,
};
