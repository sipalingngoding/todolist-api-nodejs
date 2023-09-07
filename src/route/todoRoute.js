import {Router} from "express";
import todoController from "../controller/todoController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizationMiddleware from "../middleware/authorizationMiddleware.js";

const todoRouter = Router();

todoRouter.use(authMiddleware);

todoRouter.get('/',todoController.getAll);

todoRouter.post('/',todoController.add);

todoRouter.put('/:id',authorizationMiddleware,todoController.update);

todoRouter.delete('/:id',authorizationMiddleware,todoController.delete);

export default todoRouter;