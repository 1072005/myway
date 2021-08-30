import axios from 'axios'
import store from './index'

const instance = axios.create({
    // baseURL: ' http://8c2e-220-135-155-67.ngrok.io/api/v1'
    baseURL: 'api/v1'
})
const download = axios.create({
    // baseURL: ' http://8c2e-220-135-155-67.ngrok.io/api/v1',
    responseType: 'blob',
    baseURL: 'api/v1'
})

// Axios 相關設定區域
// Request 攔截器 (為每個Request 加入Header)
instance.interceptors.request.use(
    config => {
        config.headers.Authorization = store.state.token;
        return config;
    },
    error => {
        console.log("axios interceptor err");
        return Promise.reject(error);
    }
);


download.interceptors.request.use(
    config => {
        config.headers.Authorization = store.state.token;

        return config;
    },
    error => {
        console.log("axios interceptor err");
        return Promise.reject(error);
    }
);


// [使用者相關API]
/** 使用者登入 */
export const UserLogin = data => instance.post('Users/Signin', data);

/** 使用者註冊 */
export const UserSignup = data => instance.post('Users/Signup', data);

/** sidebar顯示帳號 */
export const Getuser = () => instance.get('Users/Personal');

// [主頁面]
/** 列出報價單 */
export const Allpage = (selected, Yearselected, Monthselected) => instance.get('Quotations/?Signback=' + selected + '&Year=' + Yearselected + '&Month=' + Monthselected + '&Search=');

// [主頁面]
/** 主頁面搜尋 */
export const Mainsearch = (selected, Yearselected, Monthselected, search) => instance.get('Quotations/?Signback=' + selected + '&Year=' + Yearselected + '&Month=' + Monthselected + '&Search=' + search);


// [主頁面]
/** 複製 */
export const Copybox = ID => instance.get('Quotation/' + ID);

// [主頁面]
/** 下載PDF */
export const PDF = quotation_ID => download.get('File/' + quotation_ID);

// [主頁面]
/** 上傳回簽檔 */
export const UploadPDF = (ItemsID, File) => instance.post('File/' + ItemsID, File);

// [主頁面]
/** 刪除回簽檔 */
export const DeletePDF = quotationID => instance.delete('File/' + quotationID);

// [主頁面]
/** 顯示select */
export const Selectapi = (selected, Yearselected, Monthselected, search) => instance.get('Quotations/?Signback=' + selected + '&Year=' + Yearselected + '&Month=' + Monthselected + '&Search=' + search);

// [主頁面]
/** 刪除檔案 */
export const Deleteapi = deleteID => instance.delete('Quotation/' + deleteID);

// [主頁面]
/** 查看review,編輯報價單 */
export const GetFormID = FormID => instance.get('Quotation/' + FormID);

// [主頁面]
/** 預覽檔案 */
export const GetViewData = ItemsId => instance.get('Quotation/' + ItemsId);

// [客戶資料頁面] [填寫表單頁面]
/** 列出客戶 */
export const Getcustomer = () => instance.get('Customers');

// [客戶資料頁面]
/** 搜尋客戶 */
export const Searchcustomer = (CustomerSearch) => instance.get('Customer?Search=' + CustomerSearch + '&Search_In=3');


// [編輯客戶資料頁面]
/** 拿取客戶資料 */
export const GetCustomerEdit = (name) => instance.get('Customers/?Search=' + name);

// [編輯客戶資料頁面]
/** 刪除公司 */
export const DeleteCompanyName = (ID) => instance.delete('Customer/Company/'+ID);

// [編輯客戶資料頁面]
/** 刪除指定客戶 */
export const DeleteCustomers = (CustomerID) => instance.delete('Customer/Employee/'+CustomerID);

// [編輯客戶資料頁面]
/** 修改公司資料 */
export const PutCompanyEdit = (ID,Company) => instance.put('Customer/Company/' +ID, Company);

// [編輯客戶資料頁面]
/** 修改客戶資料 */
export const PutCustomerEdit = (ID, Customer) => instance.put('Customer/Employee/' + ID, Customer);


// [產品資料頁面]
/** 列出產品 */
export const Getproduce = () => instance.get('Products');

// [產品資料頁面] [填寫表單頁面]
/** 產品搜尋 */
export const Searchproduce = (ProduceSearch) => instance.get('Product?Search=' + ProduceSearch);

// [產品資料頁面]
/** 產品刪除 */
export const Deleteproduce = (Product_ID) => instance.delete('Product/' + Product_ID);

// [修改產品資料頁面]
/** 修改產品資料 */
export const PutProduceEdit = (EditProductID, Products) => instance.put('Product/' + EditProductID, Products);

// [修改產品資料頁面]
/** 拿取產品資料 */
export const GetProduceEdit = (ProductID) => instance.get('Product/' + ProductID);


// [追蹤頁面]
/** 列出所有項目 */
export const Gettrack = (trackselected, payselected, paymodelselected, yearsselected, monthselected) => instance.get('Quotations/Status/?Status=' + trackselected + '&Payment_Method=' + payselected + '&Payment_Status=' + paymodelselected + '&Year=' + yearsselected + '&Month=' + monthselected + '&Search=' + '');

// [追蹤頁面]
/** select 項目 */
export const Getselect = (trackselected, payselected, paymodelselected, yearsselected, monthselected) => instance.get('Quotations/Status/?Status=' + trackselected + '&Payment_Method=' + payselected + '&Payment_Status=' + paymodelselected + '&Year=' + yearsselected + '&Month=' + monthselected + '&Search=' + '');


// [追蹤頁面]
/** 搜尋項目 */
export const Getsearch = (trackselected, payselected, paymodelselected, yearsselected, monthselected, search) => instance.get('Quotations/Status/?Status=' + trackselected + '&Payment_Method=' + payselected + '&Payment_Status=' + paymodelselected + '&Year=' + yearsselected + '&Month=' + monthselected + '&Search=' + search);

// [追蹤頁面編輯]
/**  拿取指定項目內容 */
export const GetTrackEdit = (Item_ID) => instance.get('Payment/' + Item_ID);

// [追蹤頁面編輯]
/**  修改指定項目內容 */
export const PutTrackEdit = (Item_ID, Payment) => instance.put('Payment/' + Item_ID, Payment);

// [填寫表單頁面]
/**  搜尋客戶姓名 */
export const SearchCustomerName = (CustomerSearch) => instance.get('Customer?Search=' + CustomerSearch + '&Search_In=1');

/**  搜尋客戶公司 */
export const SearchCompany = (CompanySearch) => instance.get('Customer?Search=' + CompanySearch + '&Search_In=2');

/**  送出新表單 */
export const testPostForm = (Form) => instance.post('Quotation', Form);

/**  送出新表單 */
export const PostForm = (Form) => download.post('Quotation', Form);

/**  送出編輯過的表單 */
export const PutForm = (id, Form) => download.put('Quotation/' + id, Form);

// [修改個人資料與專案名稱頁面]
/**  拿取個人資料 */
export const GetPersonal = () => instance.get('Users/Personal');

// [修改個人資料與專案名稱頁面]
/**  拿取所有專案名稱 */
export const GetPrjects = () => instance.get('Users/Projects');

// [修改個人資料與專案名稱頁面]
/**  修改個人資料 */
export const PutPersonal = (parm) => instance.put('Users/Personal', parm);

// [修改個人資料與專案名稱頁面]
/**  修改這個專案名稱 */
export const PutPrjects = (value, name) => instance.put('Users/Project/' + value, name);

// [修改個人資料與專案名稱頁面]
/**  修改這個專案名稱 */
export const DeleteProjectName = (selectID) => instance.delete('Users/Project/' + selectID);


