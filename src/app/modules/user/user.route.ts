import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';
import { studentValidations } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

// Will call controller func
router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

export const UserRoutes = router;
