import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // Create a user object
  const userData: Partial<TUser> = {};

  // If password is not given, use default password
  userData.password = password || (config.default_password as string);

  // Set student role
  userData.role = 'student';

  // Set manually generated ID
  userData.id = '2030100001';

  // Create a user
  const newUser = await User.create(userData);

  // Create a student
  if (Object.keys(newUser).length) {
    // Set id, _id as user
    studentData.id = newUser.id; // Embedding the Id
    studentData.user = newUser._id; // Referencing to the user document

    const newStudent = await Student.create(studentData);

    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
