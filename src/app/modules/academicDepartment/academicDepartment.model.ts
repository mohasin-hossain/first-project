import { Model, Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
);

academicDepartmentSchema.pre('save', async function (next) {
  const isDepatmentExist = await AcademicDepartment.findOne({
    name: this.name,
  });

  if (isDepatmentExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Department already exist!',
    );
  }

  next();
});

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const isDepatmentExist = await AcademicDepartment.findOne(query);

  if (!isDepatmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Department does not exist!');
  }
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
