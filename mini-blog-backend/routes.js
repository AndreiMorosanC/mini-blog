import express from "express"

import {createBlog} from "./controllers/BlogControler.js"
import { NewUser } from "./controllers/UserControler.js";
import verifyToken from "./middlewares/auth.js"


const routes = express.Router();

routes.post("/blogs", verifyToken, createBlog);
routes.post("/users", verifyToken, NewUser);


export default routes
