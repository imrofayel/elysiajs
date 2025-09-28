import { Elysia } from 'elysia'

const userRoutes = new Elysia({ prefix: '/users' });

userRoutes.get('/', () => "Users of Elysia.");

userRoutes.get('/:name', ({ params }) => {
    return {
        message: `Hello, ${params.name}!`
    }
})

export default userRoutes;