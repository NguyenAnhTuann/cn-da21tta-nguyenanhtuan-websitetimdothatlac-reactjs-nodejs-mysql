import db from '../models'

export const getPostsService = () => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Post.findAll({
            raw: true,
            nest: true,
            include: [
                {model: db.Image, as: 'images', attributes: ['image']},
                {model: db.User, as: 'user', attributes: ['name', 'phone', 'zalo']}
            ],
            attributes: ['id', 'title', 'created', 'address', 'description' ]
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Getting posts is failure.',
            response
        })

    } catch (error) {
        reject(error)
    }
})

export const getPostsLimitService = (offset) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Post.findAndCountAll({
            raw: true,
            nest: true,
            offset: offset * (+process.env.LIMIT) || 0,
            limit: +process.env.LIMIT,
            include: [
                {model: db.Image, as: 'images', attributes: ['image']},
                {model: db.User, as: 'user', attributes: ['name', 'phone', 'zalo']}
            ],
            attributes: ['id', 'title', 'created', 'address', 'description' ]
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Getting posts is failure.',
            response
        })

    } catch (error) {
        reject(error)
    }
})