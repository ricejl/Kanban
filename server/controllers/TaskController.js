import express from "express";
import { Authorize } from "../middleware/authorize";
import _taskService from "../services/TaskService";

export default class TaskController {
  constructor() {
    this.router = express
      .Router()
      .use(Authorize.authenticated)
      .get("/", this.getAllTasks)
      .get("/:id/comments", this.getComments)
      .post("", this.createTask)
      .post("/:id/comments", this.addComment)
      .put("/:id", this.edit)
      .put("/:id/comments", this.removeComment)
      .delete("/:id", this.delete)
      .use(this.defaultRoute);
  }

  // this is pretty neat

  defaultRoute(req, res, next) {
    next({ status: 404, message: "No Such Route" });
  }

  async getAllTasks(req, res, next) {
    try {
      req.body.authorId = req.session.uid;
      let data = await _taskService.getAllTasks(req.session.uid);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async createTask(req, res, next) {
    try {
      req.body.authorId = req.session.uid;
      let data = await _taskService.createTask(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async addComment(req, res, next) {
    try {
      req.body.authorId = req.session.uid;
      let data = await _taskService.addComment(req.params.id, req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async getComments(req, res, next) {
    try {
      let data = await _taskService.getComments(req.params.id, req.session.uid);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      let data = await _taskService.edit(
        req.params.id,
        req.session.uid,
        req.body
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async removeComment(req, res, next) {
    try {
      let data = await _taskService.removeComment({
        taskId: req.body.taskData._id,
        userId: req.session.uid,
        commentId: req.body.commentId
      });
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await _taskService.delete(req.params.id, req.session.uid);
      return res.send("Successfully deleted");
    } catch (error) {
      next(error);
    }
  }
}
