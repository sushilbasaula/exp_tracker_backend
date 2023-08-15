import TransSchema from "./TransSchema.js";

// create Trans
export const createTrans = (newTransObj) => {
  return TransSchema(newTransObj).save();
};

// read Trans @filter munst be an object {}
export const getTransByUserId = (userId) => {
  return TransSchema.find({ userId });
};

// delete Trans

export const deleteTransByIds = (idArg, userId) => {
  return TransSchema.deleteMany({ userId, _id: { $in: idArg } });
};
