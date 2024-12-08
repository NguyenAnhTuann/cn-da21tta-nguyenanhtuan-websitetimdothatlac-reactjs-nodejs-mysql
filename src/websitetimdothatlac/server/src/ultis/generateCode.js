// const generateCode = (length) => {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
//     const numbers = '123456789'
//     let code = ''
//     for (let i = 0; i < length - 1; i++) {
//         code += characters.charAt(Math.floor(Math.random() * characters.length))
//     }
//     return `${code}${numbers.charAt(Math.floor(Math.random() * numbers.length))}`
// }


// export default generateCode

//------------------------------------------------------

require('dotenv').config()

const generateCode = (value) => {
    let output = ''
    value = value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .split(" ")
        .join("")
    let merge = value + process.env.phongtro123
    let length = merge.length
    for (let i = 0; i < 3; i++) {
        let index = i === 2 ? Math.floor(merge.length / 2 + length / 2) : Math.floor(length / 2)
        output += merge.charAt(index)
        length = index
    }
    return `${value.charAt(2)}${output}`.toUpperCase()
}

export default generateCode