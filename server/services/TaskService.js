import mongoose from "mongoose";
import Task from "../models/Task";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("Task", Task);

class TaskService {
  async getAllTasks(userId) {
    let data = await _repository.find({ authorId: userId });
    return data;
  }

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

  // function for cascade deletion of tasks when list is deleted, if necessary
  async deleteMany(payload) {
    let data = await _repository.deleteMany({
      listId: payload.listId
    });
    if (!data) {
      throw new ApiError("Invalid ID", 400);
    }
  }

  async getComments(taskId, userId) {
    let data = await _repository.find({ taskId: taskId, authorId: userId });
    if (!data) {
      throw new ApiError("Invalid Id or you do not own this task", 400);
    }
    return data;
  }

  async addComment(taskId, rawData) {
    let data = await _repository.findOneAndUpdate(
      { _id: taskId },
      { $push: { comments: rawData } },
      { new: true });
    // NOTE  {new: true} returns new version (after update)
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this list", 400);
    }
    return data;
  }

  async removeComment(payload) {
    let data = await _repository.findOneAndUpdate(
      { _id: payload.taskId },
      { $pull: { comments: { _id: payload.commentId } } },
      { new: true });
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this comment", 400);
    }
  }
}

const _taskService = new TaskService();
export default _taskService;
