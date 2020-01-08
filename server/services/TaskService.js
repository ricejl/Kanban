import mongoose from "mongoose";
import Task from "../models/Task";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("Task", Task);

class TaskService {
  async getTasksByListId(listId, userId) {
    let data = await _repository.find({ listId: listId, authorId: userId });
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this list", 400);
    }
    return data;
  }

  // FIXME pickup here - all functions below this point must be updated
  async createTask(rawData) {
    let data = await _repository.create(rawData);
    return data;
  }

  async edit(taskId, userId, update) {
    let data = await _repository.findOneAndUpdate(
      { _id: taskId, authorId: userId },
      update,
      { new: true }
    );
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this list", 400);
    }
    return data;
  }

  async delete(taskId, userId) {
    let data = await _repository.findOneAndRemove({
      _id: taskId,
      authorId: userId
    });
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this list", 400);
    }
  }
}

const _taskService = new TaskService();
export default _taskService;
