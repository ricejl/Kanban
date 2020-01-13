import mongoose from "mongoose"
import _listService from "../services/ListService"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const Board = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  authorId: { type: ObjectId, ref: 'User', required: true }
}, { timestamps: true })

//CASCADE ON DELETE
Board.pre('findOneAndRemove', function (next) {
  //lets find all the lists and remove them
  Promise.all([
    _listService.deleteMany({ boardId: this._conditions._id })
  ])
    .then(() => next())
    .catch(err => next(err))
})

export default Board