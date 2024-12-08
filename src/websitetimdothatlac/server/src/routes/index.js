import authRouter from './auth'
import insertRouter from './insert'
import categoryRouter from './category'
import postRouter from './post'
import provinceRouter from './province'


const initRouters = (app) => {
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/insert', insertRouter)
    app.use('/api/v1/category', categoryRouter)
    app.use('/api/v1/post', postRouter)
    app.use('/api/v1/province', provinceRouter)


    return app.use('/', (req, res) => {
        res.send('server on ...')
    })
}

export default initRouters