import { Router } from "express"
import { UserController } from "../controller/UserController"
import { checkJwt } from "../middleware/jwt"
import { checkRole } from "../middleware/role"

const router = Router()

// Get all users
router.get('/', [checkJwt, checkRole(['admin'])], UserController.getAll)

// Get user by id
router.get('/:id', [checkJwt, checkRole(['admin'])], UserController.getById)

// Create user
router.post('/', [checkJwt, checkRole(['admin'])], UserController.newUser)

// Update user
router.patch('/:id', [checkJwt, checkRole(['admin'])], UserController.editUser)

// Delete user
router.delete('/:id', [checkJwt, checkRole(['admin'])], UserController.deleteUser)

export default router