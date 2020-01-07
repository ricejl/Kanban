import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const Comment = new Schema({
  content: { type: String, required: true },
  authorId: { type: ObjectId, ref: "User", required: true }
});
// NOTE comment has to be the end of the inheritance chain and is dependent upon the parent (cannot be retrieved on its own without parent)

const Task = new Schema(
  {
    description: { type: String, required: true },
    authorId: { type: ObjectId, ref: "User", required: true },
    boardId: { type: ObjectId, ref: "Board", required: true },
    listId: { type: ObjectId, ref: "List", required: true },
    comments: [Comment]
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Task;
