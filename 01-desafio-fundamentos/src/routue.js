import { buildRoutePath } from "../utils/build-route-path.js";
import { randomUUID } from "node:crypto";
import { Database } from "./db/database.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { search } = req.query;

      const tasks = database.select(
        "tasks",
        search
          ? {
              title: search,
              description: search,
            }
          : null
      );

      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;
      if (!title) {
        return res.writeHead(400).end(
          JSON.stringify({ message: 'title is required' }),
        )
      }

      if (!description) {
        return res.writeHead(400).end(
          JSON.stringify({message: 'description is required' })
        )
      }

      const date = new Date();

      const newTask = {
        id: randomUUID(),
        title,
        description,
        completed_at: false,
        created_at: date,
        updated_at: date,
      };

      database.insert("tasks", newTask);
      return res.writeHead(201).end();
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;

      if (!id ) {
        return res.writeHead(400).end(
          JSON.stringify({ message: 'id is required' }),
        )
      }

      if (!title) {
        return res.writeHead(400).end(
          JSON.stringify({ message: 'title is required' }),
        )
      }

      if (!description) {
        return res.writeHead(400).end(
          JSON.stringify({message: 'description is required' })
        )
      }

      const data = database.getItem("tasks", id);

      const updateTask = {
        ...data,
        title,
        description,
        updated_at: new Date(),
      };

      database.update("tasks", id, updateTask);

      return res.writeHead(204).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      if (!id ) {
        return res.writeHead(400).end(
          JSON.stringify({ message: 'id is required' }),
        )
      }

      database.delete("tasks", id);

      return res.writeHead(204).end();
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;

      if (!id ) {
        return res.writeHead(400).end(
          JSON.stringify({ message: 'id is required' }),
        )
      }

      const data = database.getItem("tasks", id);

      const updateTask = {
        ...data,
        completed_at: true
      };

      database.update("tasks", id, updateTask);

      return res.writeHead(204).end();
    },
  },
];
