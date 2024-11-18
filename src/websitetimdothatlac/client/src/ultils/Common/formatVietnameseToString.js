export const formatVietnameseToString = (keyword) => {
    return keyword
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/Đ/g, "D")
        .replace(/đ/g, "d")
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .trim()
        .replace(/\s+/g, "-");
};