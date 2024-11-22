export const path = {
    HOME: '/*',
    HOME__PAGE: ':page',
    LOGIN: 'login',
    DO_NHAT_DUOC: 'do-nhat-duoc',
    DO_THAT_LAC: 'do-that-lac',
    DETAIL_POST__TITLE__POST: 'chi-tiet/:title/:postId'
}

export const text = {
    HOME_TITLE: 'WEBSITE CUNG CẤP THÔNG TIN VỀ ĐỒ DÙNG BỊ THẤT LẠC',
    HOME_DESCRIPTION: 'Giúp cho người nhặt được đồ bị đánh rơi và người thất lạc đồ kết nối dễ dàng để có thể trả cho người đã đánh rơi một cách dễ dàng.'
}

export const locaiton = [
    {
        id: 'hcm',
        name: 'Hồ Chí Minh',
        image: 'https://phongtro123.com/images/location_hcm.jpg'
    },
    {
        id: 'hn',
        name: 'Hà Nội',
        image: 'https://phongtro123.com/images/location_hn.jpg'
    },
    {
        id: 'dn',
        name: 'Đà Nẵng',
        image: 'https://phongtro123.com/images/location_dn.jpg'
    }
]






// export const formatVietnameseToString = (keyword) => {
//     return keyword
//     .normalize("NFD")
//       .toLowerCase()
//       .replace(/[\u0300-\u036f]/g, "")
//       .split(" ")
//       .join("-")
//   }
