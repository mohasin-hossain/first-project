import { z } from 'zod';

// Creating a schema validation using zod
// UserName Schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, 'First Name can not be more than 20 characters')
    .regex(/^[A-Z][a-z]*$/, 'First Name must start with a capital letter'),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .regex(/^[A-Za-z]+$/, 'Last Name must contain only letters'),
});

// Local Guardian Schema
const localGuardianValidationSchema = z.object({
  name: z.string().trim(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

// Guardian Schema
const guardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

// Main Student Schema
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'others']),
      dateOfBirth: z.string(),
      email: z.string().email('Invalid email format'),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImg: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
};
