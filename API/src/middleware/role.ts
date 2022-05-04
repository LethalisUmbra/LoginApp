import { Request, Response, NextFunction } from 'express'
import { User } from '../entity/User'
import { AppDataSource } from '../data-source'


export const checkRole = (roles: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { userId, userRole } = res.locals.jwtPayload
        const userRepository = AppDataSource.getRepository(User)
        let user: User

        try { user = await userRepository.findOneByOrFail({id: userId}) }
        catch (e) { return res.status(401).json({message: 'Not authorized'}) }

        // Check role
        const { role } = user;
        roles.includes(role) ? next() : res.status(401).json({message: 'Not authorized'})
    }
}