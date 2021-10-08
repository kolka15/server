import { NextFunction, Request, Response, Router } from 'express'

interface RequestWithBody extends Request {
    body: { [key: string]: string | undefined }
}

const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
    if (req.session && req.session.loggedIn) {
        next()
        return
    }

    res.status(403)
    res.send('Not permitted')
}

const router = Router()

router.get('/login', (req: Request, res: Response) => {
    res.send(`
        <form method="post">
            <div>
                <label for="email">Email</label>
                <input name="email">
            </div>
            <div>
                <label for="password">Password</label>
                <input name="password" type="password">
            </div>
            <button>Submit</button>
        </form>
    `)
})

router.post('/login', (req: RequestWithBody, res: Response) => {
    const { email, password } = req.body

    if (email && password && email === '111' && password === 'www') {
        req.session = { loggedIn: true }
        res.redirect('/')
    } else {
        res.send('Invalid email or password')
    }
})

router.get('/', (req: Request, res: Response) => {
    if (req.session?.loggedIn) {
        res.send(`
            <div>
                <h2>Ya logged in</h2>
                <a href="/logout">Logout</a>
            </div>
        `)
    } else {
        res.send(`
            <div>
                <h2>Ya not logged in</h2>
                <a href="/login">Login</a>
            </div>
        `)
    }
})

router.get('/logout', (req: Request, res: Response) => {
    req.session = undefined
    res.redirect('/login')
})

router.get('/protected', requireAuth, (req: Request, res: Response) => {
    res.send('Welcome to protected route')
})


export { router }
