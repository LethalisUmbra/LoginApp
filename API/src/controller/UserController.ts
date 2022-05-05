import { Request, Response } from "express"
import { User } from "../entity/User"
import { AppDataSource } from "../data-source"
import { validate } from "class-validator"

export class UserController {

    
    static getAll = async (req: Request, res: Response) => {
        const userRepository = AppDataSource.getRepository(User)
        let users:User[]
        try { users = await userRepository.find() }
        catch (e) { res.status(404).json({ message: 'Something went wrong' }) }

        if (users.length > 0) res.send(users)
        else res.status(404).json({ message: 'No users found' })
    }

    static getById = async (req: Request, res: Response) => {
        const { id } = req.params
        const userRepository = AppDataSource.getRepository(User)
        
        try
        {
            const user = await userRepository.findOneByOrFail({id: +id})
            res.send(user)
        }
        catch (e)
        {
            res.status(404).json({message: 'User not found'})
        }
    }

    static newUser = async (req: Request, res: Response) => {
        const { username, password, role } = req.body
        const user = new User()

        user.username = username;
        user.password = password;
        user.role = role;

        // Validate
        const validationOptions = { validationError: { target: false, value: false } }
        const errors = await validate(user, validationOptions)
        if (errors.length > 0) return res.status(400).json(errors)

        // Hash Password
        user.hashPassword()

        const userRepository = AppDataSource.getRepository(User);

        try { await userRepository.save(user) }
        catch (e) { return res.status(409).json({message: 'Username already exists'}) }

        // All OK
        res.send('User created')
    }

    static editUser = async (req: Request, res: Response) => {
        let user
        const { id } = req.params
        const { username, role } = req.body

        const userRepository = AppDataSource.getRepository(User)

        // Get User
        try
        {
            user = await userRepository.findOneByOrFail({id: +id})
            user.username = username
            user.role = role
        }
        catch (e)
        { 
            return res.status(404).json({message: 'User not found'}) 
        }

        // Validate
        const validationOptions = { validationError: { target: false, value: false } }
        const errors = await validate(user, validationOptions )
        if (errors.length > 0) return res.status(400).json(errors)

        // Save user
        try { await userRepository.save(user) }
        catch (e) { return res.status(409).json({message: 'Username already in use'}) }

        res.status(201).json({message: 'User updated successfully'})
    }

    static deleteUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        const userRepository = AppDataSource.getRepository(User)

        try { await userRepository.findOneByOrFail({id: +id}) }
        catch (e) { return res.status(404).json({message: 'User not found'}) }

        // Delete user
        userRepository.delete(id)
        res.status(201).json({message: 'User deleted successfully'})
    }
}

export default UserController