import express from "express"
import { protectRoutes } from "../middlewares/auth.js"
import { getUserForSidebar, markMessagesAsSeen, sendMessage } from "../controllers/messageController.js"

const messageRouter = express.Router()

messageRouter.get("/", protectRoutes, getUserForSidebar)
messageRouter.get("/:id", protectRoutes, getUserForSidebar)
messageRouter.put("mark/:id", protectRoutes, markMessagesAsSeen)
messageRouter.post("/send/:id", protectRoutes, sendMessage)

export default messageRouter