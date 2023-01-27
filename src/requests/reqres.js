// export const auth = (auth_data, callback, err_callback = console.log) => {
//     fetch('https://reqres.in/api/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(auth_data)
//     })
//         .then(
//             resp => resp.json()
//         ).then(
//             data => {
//                 if (data.token) {
//                     callback(data);
//                 } else {
//                     err_callback(data.error)
//                 }
//             }
//         )
// }