import { AppDataSource } from "../data-source"
import { Request, Response } from 'express'
import { User } from "../entity/User"
import config from "../config/config"
import * as jwt from 'jsonwebtoken'
import { validate } from "class-validator"

class AuthController {
    static login = async (req: Request, res: Response) => {
        const { username, password } = req.body

        if (!(username && password)) return res.status(404).json({ message: 'Username & Password are required'})

        const userRepository = AppDataSource.getRepository(User)
        let user: User

        try { user = await userRepository.findOneOrFail({ where: { username } }) }
        catch (e) { return res.status(400).json({message: ' Username or password incorrect!'}) }

        // Validate password
        if (!user.checkPassword(password)) return res.status(400).json({message: 'Username or password incorrect!'})

        const token = jwt.sign({userId: user.id, username: user.username}, config.jwtSecret, { expiresIn: '1h' })

        res.json({message: 'OK', token, role: user.role, userId: user.id})
    }

    static changePassword = async (req: Request, res: Response) => {
        const { userId } = res.locals.jwtPayload
        const { oldPassword, newPassword } = req.body

        if(!(oldPassword && newPassword)) return res.status(400).json({message: 'Old & new passwords are required'})

        const userRepository = AppDataSource.getRepository(User)
        let user: User

        try { user = await userRepository.findOneByOrFail({id: userId})}
        catch (e) { res.status(400).json({message: 'Something went wrong'})}

        if (!user.checkPassword(oldPassword)) return res.status(401).json({message: 'Check your old password'})

        user.password = newPassword
        const validationOptions = { validationError: {target:false, value:false}}
        const errors = await validate(user, validationOptions)

        if (errors.length > 0) return res.status(400).json(errors)

        // Hash password
        user.hashPassword()
        userRepository.save(user)

        res.json({message: 'Password changed successfully'})
    }
}

export default AuthController