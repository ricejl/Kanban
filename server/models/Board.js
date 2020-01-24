import mongoose from "mongoose"
import Task from "./Task"
import List from "./List"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const _listRepo = mongoose.model("List", List);
const _taskRepo = mongoose.model("Task", Task);

const Board = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true }
}, { timestamps: true })

//CASCADE ON DELETE
Board.pre('findOneAndRemove', function (next) {
  //lets find all the lists and remove them
  Promise.all([
    _taskRepo.deleteMany({ boardId: this._conditions._id }),
    _listRepo.deleteMany({ boardId: this._conditions._id })
  ])
    .then(() => next())
    .catch(err => next(err))
})

export default Board