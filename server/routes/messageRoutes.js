import express from "express"
import { protectRoutes } from "../middlewares/auth"
import { getUserForSidebar, markMessagesAsSeen } from "../controllers/messageController"

const messageRouter = express.Router()

messageRouter.get("/", protectRoutes, getUserForSidebar)
messageRouter.get("/:id", protectRoutes, getUserForSidebar)
messageRouter.get("mark/:id", protectRoutes, markMessagesAsSeen)

export default messageRouter