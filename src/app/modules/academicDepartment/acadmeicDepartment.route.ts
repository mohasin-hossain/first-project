import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentControllers } from './academicDepartments.controller';

const router = express.Router();

// Create Academic Department
router.post(
  '/create-academic-department',
//   validateRequest(
//     AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
//   ),
  AcademicDepartmentControllers.createAcademicDepartment,
);

// Get All Academic Departments
router.get('/', AcademicDepartmentControllers.getAllAcademicDepartments);

// Get Single Academic Department
router.get(
  '/:departmentId',
  AcademicDepartmentControllers.getSingleAcademicDepartment,
);

// Update Single Academic Department
router.patch(
  '/:departmentId',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.updateSingleAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;
