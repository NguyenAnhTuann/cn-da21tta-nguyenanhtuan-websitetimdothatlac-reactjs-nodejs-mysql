import bcrypt from 'bcryptjs'
import { v4 } from 'uuid'
import donhatduoc from '../../data/donhatduoc.json'
import dothatlac from '../../data/dothatlac.json'
import db from '../models'
import generateCode from '../ultis/generateCode'
require('dotenv').config()
const dataBody = [donhatduoc.body, dothatlac.body]


const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12))

export const insertService = () => new Promise(async (resolve, reject) => {
    try {
        const provinceCodes = []
        dataBody.forEach(cate => {
            cate.forEach(async (item) => {
                let postId = v4()
                let provinceCode = generateCode(item?.header?.address?.split(',')?.slice(-1)[0]).trim()
                provinceCodes?.every(item => item?.code !== provinceCode) && provinceCodes.push({
                    code: provinceCode,
                    value: item?.header?.address?.split(',')?.slice(-1)[0].trim()
                })
                let userId = v4()
                let imagesId = v4()
                await db.Post.create({
                    id: postId,
                    title: item?.header?.title,
                    category: item?.header?.category,
                    address: item?.header?.address,
                    description: JSON.stringify(item?.mainContent?.content),
                    userId,
                    imagesId,
                    provinceCode
                })
                await db.Province.findOrCreate({
                    where: { code: provinceCode },
                    default: {
                        code: provinceCode,
                        value: item?.header?.address?.split(',')?.slice(-1)[0]
                    }
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
        })
        // console.log(provinceCodes)
        provinceCodes?.forEach(async (item) => {
            await db.Province.create(item)
        })


        resolve('Done')
    } catch (error) {
        reject(error)
    }
})