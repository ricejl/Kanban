import express from "express";
import { Authorize } from "../middleware/authorize";
import _taskService from "../services/TaskService";

export default class TaskController {
  constructor() {
    this.router = express
      .Router()
      .use(Authorize.authenticated)
      .get("/:id/comments", this.getComments)
      .post("", this.createTask)
      .post("/:id/comments", this.addComment)
      .put("/:id", this.edit)
      .put("/:id/comments", this.removeComment)
      .delete("/:id", this.delete)
      .delete("/:taskid/comments/:commentid", this.deleteComment)
      .use(this.defaultRoute);
  }

  // this is pretty neat

  defaultRoute(req, res, next) {
    next({ status: 404, message: "No Such Route" });
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
      let data = await _taskService.removeComment(
        req.params.id,
        req.session.uid,
        req.body
      );
      console.log("remove comment task controller", req.body); // log here
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

  async deleteComment(req, res, next) {
    try {
      await _taskService.deleteComment(req.params.comments, req.params.id, req.session.uid);
      return res.send("Successfully deleted");
    } catch (error) {
      next(error);
    }
  }
}
