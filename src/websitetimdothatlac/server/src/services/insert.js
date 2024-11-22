import db from '../models'
import bcrypt from 'bcryptjs'
import { v4 } from 'uuid'
import donhatduoc from '../../data/donhatduoc.json'
import dothatlac from '../../data/dothatlac.json'
import generateCode from '../../ultis/generateCode'
require('dotenv').config()
const dataBody = dothatlac.body


const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12))

export const insertService = () => new Promise(async (resolve, reject) => {
    try {
        dataBody.forEach(async (item) => {
            let postId = v4()
            let userId = v4()
            let imagesId = v4()
            await db.Post.create({
                id: postId,
                title: item?.header?.title,
                address: item?.header?.address,
                category: 'DND',
                description: JSON.stringify(item?.mainContent?.content),
                userId,
                imagesId
            })
            await db.Image.create({
                id: imagesId,
                image: JSON.stringify(item?.images)
            })
            await db.User.create({
                id: userId,
                name: item?.contact?.content.find(i => i.name === "Liên hệ:")?.content,
                password: hashPassword('123456'),
                phone: item?.contact?.content.find(i => i.name === "Số điện thoại:")?.content,
                zalo: item?.contact?.content.find(i => i.name === "Zalo:")?.content
            })
        })


        resolve('Done')
    } catch (error) {
        reject(error)
    }
})