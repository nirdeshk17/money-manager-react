export const BASE_URL = "https://money-manager-springboot-g5tm.onrender.com/api/v1.0";
// export const BASE_URL = "http://localhost:8080/api/v1.0";
const CLOUDINARY_NAME="dgox1ltaq"

export const API_ENDPOINTS={
    LOGIN:"/login",
    REGISTER:"/register",
    FETCH_USER_INFO:"/profile",
    STATUS:"/status",
    GET_ALL_CATEGORIES:"/categories",
    ADD_CATEGORY:"/categories",
    UPDATE_CATEGORY:(categoryId)=>`/categories/${categoryId}`,
    GET_ALL_INCOMES:"/incomes",
    CATEGORY_BY_TYPE:(type)=>`/categories/${type}`,
    ADD_INCOME:"/incomes",
    DELETE_INCOME:(id)=>`/incomes/${id}`,
    INCOME_EXCEL_DOWNLOAD:"/incomes/download",
    INCOME_SEND_EMAIL:"/incomes/sendEmail",
    GET_ALL_EXPENSES:"/expenses",
    ADD_EXPENSE:"/expenses",
    DELETE_EXPENSE:(id)=>`/expenses/${id}`,
    EXPENSE_EXCEL_DOWNLOAD:"/expenses/download",
    EXPENSE_SEND_EMAIL:"/expenses/sendEmail",
    APPLY_FILTERS:"/filter",
    DASHBOARD_DATA:"/dashboard",
    UPLOAD_IMAGE:`https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`
}