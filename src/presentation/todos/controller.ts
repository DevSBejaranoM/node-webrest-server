import { Request, Response } from "express";

const todos = [
  { id: 1, text: "Queso", completedAt: new Date() },
  { id: 2, text: "Mantequilla", completedAt: new Date() },
  { id: 3, text: "Chóped", completedAt: new Date() },
];

export class TodosController {
  //* DI
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    return res.json(todos);
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ message: "Invalid id" });
    const todo = todos.find((todo) => todo.id === id);

    todo ? res.json(todo) : res.status(404).json({ message: "Todo not found" });

    return res.json(todo);
  };

  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "Text is required" });

    const newTodo = { id: todos.length + 1, text, completedAt: new Date() };
    todos.push(newTodo);

    res.json(newTodo);
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ message: "Invalid id" });

    const todo = todos.find((todo) => todo.id === id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    const { text, completedAt } = req.body;

    todo.text = text || todo.text;
    completedAt === "null"
      ? todo.completedAt = new Date()
      : (todo.completedAt = new Date(completedAt) || todo.completedAt);

    todo.text = text;
    todos.forEach((t: any, i:number) => {
      if (t.id === id) todos[i] = todo;
    });

    res.json(todo);
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ message: "Invalid id" });

    const todo = todos.find((todo) => todo.id === id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    todos.forEach((t: any, i:number) => {
      if (t.id === id) todos.splice(i, 1);
    });

    res.json(todo);
  }
}
