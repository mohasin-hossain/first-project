import { checkIfExists } from '../../utils/checkIfExists';
import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllAcademicDepartmentsFromDB = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty');

  return result;
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  await checkIfExists(
    AcademicDepartment,
    { _id: id },
    'Academic Department does not Exist',
  );

  const result =
    await AcademicDepartment.findById(id).populate('academicFaculty');

  return result;
};

const updateSingleAcademicDepartmentIntoDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB,
  updateSingleAcademicDepartmentIntoDB,
};
