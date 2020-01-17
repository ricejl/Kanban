import mongoose from "mongoose";
import List from "../models/List";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("List", List);

class ListService {
  async getListsByBoardId(boardId, userId) {
    let data = await _repository.find({ boardId: boardId, authorId: userId });
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this board", 400);
    }
    return data;
  }

  // FIXME pickup here - all functions below this point must be updated
  async create(rawData) {
    let data = await _repository.create(rawData);
    return data;
  }

  async edit(listId, userId, update) {
    let data = await _repository.findOneAndUpdate(
      { _id: listId, authorId: userId },
      update,
      { new: true }
    );
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this board", 400);
    }
    return data;
  }

  async delete(listId, userId) {
    let data = await _repository.findOneAndRemove({
      _id: listId,
      authorId: userId
    });
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this board", 400);
    }
  }

  // // function for cascade deletion of lists when board is deleted, if necessary
  // async deleteMany(payload) {
  //   let data = await _repository.deleteMany({
  //     boardId: payload.boardId
  //   });
  //   if (!data) {
  //     throw new ApiError("Invalid ID", 400);
  //   }
  // }
}

const _listService = new ListService();
export default _listService;
