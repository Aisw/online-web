import {request} from "@/network/request";

export  function getDepart(){
    return request({
        method:'GET',
        url:'http://127.0.0.1:8888/departs',

    })
}

export function getDepartDetail(id){
    return request({
        method:'GET',
        url:'http://127.0.0.1:8888/detail',
        params:{
            id
        }
    })
}

export function getOrganization(){
    return request({
        method:"GET",
        url:"http://127.0.0.1:8888/org"
    })
}

export function postContent(content){
    return request({
        method:"POST",
        url: "http://127.0.0.1:8888/out",
        data: content,
        header:{
            'Content-Type':'application/json'  //如果写成contentType会报错
        }
    })
}

export function postId(parent,son){
    return request({
        method: "POST",
        url: "http://127.0.0.1:8888/ou",
        params:{
            parent,
            son
        }
    })
}

export function deleteDepart(id){
    return request({
        method: 'GET',
        url: 'http://127.0.0.1:8888/deleteDepart',
        params: {
            id
        }
    })
}