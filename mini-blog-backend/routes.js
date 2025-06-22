import express from "express"

import {createBlog, DeleteBlog, getBlogById, getUserBlogs, updateBlog} from "./controllers/BlogControler.js"
import { NewUser } from "./controllers/UserControler.js";
import verifyToken from "./middlewares/auth.js"


const routes = express.Router();

routes.post("/blogs", verifyToken, createBlog);
routes.put("/blogs/:id", verifyToken, updateBlog);

routes.delete("/blogs/:id", verifyToken,DeleteBlog)
routes.post("/users", verifyToken, NewUser);
routes.get("/myblogs", verifyToken, getUserBlogs)
routes.get("/blogs/:id", getBlogById);

export default routes
