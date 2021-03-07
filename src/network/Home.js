import {request} from "@/network/request";

export  function getUser(token){
    return request({
        method:'GET',
        headers:{
            'token':token
        },
        url:'http://127.0.0.1:8888/user',
    })
}