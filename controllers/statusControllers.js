import { StatusHistoryModel, StatusModel } from "../models/statusModel.js";
import { addStatusValidator, statusValidator } from "../validators/statusValidators.js";

export const addStatus = async (req, res, next) => {
    const {error, value} = addStatusValidator.validate(req.body)
    if(error){
        res.status(422).json(error)
    }
    const newStatus = await StatusModel.create(value)
    res.status(201).json(value)
}

export const updateStatus = async (req, res, next) => {
  try {
    const { error, value } = statusValidator.validate(req.body);
    if(error) {
        res.status(422).json(error)
    }

    const currentStatus = await StatusModel.findById(req.params.id);
    if(!currentStatus){
        res.status(404).json("No data to update")
    }

    await StatusHistoryModel.create({
        statusId: currentStatus._id,
        oldStatus: currentStatus.previousStatus,
        updatedBy: "Ben"
    });

    const updatedStatus = await StatusModel.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    );

    if (!updatedStatus) {
      return res.status(404).json("Update wasn't successful");
    }
    res.status(200).json(updatedStatus);
  } catch (error) {
    next(error);
  }
};
 // Import StatusHistory model

export const getAllStatusHistory = async (req, res, next) => {
  try {
    
    const statusHistory = await StatusHistoryModel.find();

    if (!statusHistory || statusHistory.length === 0) {
      return res.status(404).json({ message: 'No status history records found.' });
    }

    res.status(200).json(statusHistory);
  } catch (error) {
    next(error);
  }
};
