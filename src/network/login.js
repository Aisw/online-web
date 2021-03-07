import {request} from "@/network/request";

export  function login(username,password){
    return request({
        method:'POST',
        url:'http://127.0.0.1:8888/login',
        params:{
            username,
            password
        }
    })
}