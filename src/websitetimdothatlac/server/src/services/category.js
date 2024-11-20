import db from '../models'

export const getCatgoriesService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Category.findAll({
            raw : true,
            attributes: ['code', 'value']
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'Ok' : 'Failed to get category.',
            response
        })
    } catch (error) {
        reject(error)
    }
})