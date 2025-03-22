import { Model, FilterQuery } from 'mongoose';
import httpStatus from 'http-status';
import AppError from '../errors/AppError';

export const checkIfExists = async <T>(
  model: Model<T>,
  filter: FilterQuery<T>,
  errorMessage = 'Document not found'
): Promise<T> => {
  const doc = await model.findOne(filter);
  if (!doc) {
    throw new AppError(httpStatus.NOT_FOUND, errorMessage);
  }
  return doc;
};
