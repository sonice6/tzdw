import axios from 'axios'
// axios.interceptors.request.use(config => {
//         if(window.localStorage.getItem("token")){
//             config.headers.common["token"]=window.localStorage.getItem("token")
//         }
//         return config;
//     }, error => {
//         return Promise.reject(error);
//     });
//     axios.interceptors.response.use(response => {
//         return response;
//         },error => {
//         if (error.response) {
//             switch (error.response.status) {
//                 case 404:
//                     alert("跳到错误页面");
//                 break;
//                 case  500:
//                     alert("接口调用错误")
//                     break;
//             }
//           return Promise.reject(error.response.data);
// }
// });
export  default  axios;