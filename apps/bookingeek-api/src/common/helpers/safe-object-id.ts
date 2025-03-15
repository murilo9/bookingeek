/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectId } from 'mongodb';

// Safely builds a MongoDB oBjectId without throwing an error if id is invalid.
export const SafeObjectId = (id: string) => {
  try {
    const objectId = new ObjectId(id);
    return objectId;
  } catch (error) {
    return null;
  }
};
