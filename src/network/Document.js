import {request} from "@/network/request";

export function getDocs(){
    return request({
        method: 'GET',
        url: 'http://127.0.0.1:8888/doc/shows'
    })
}

export function queryDocs(doc){
    return request({
        method: 'POST',
        url: 'http://127.0.0.1:8888/doc/show',
        data: doc,
        header:{
            'Content-Type':'application/json'  //如果写成contentType会报错
        }
    })
}

export function deleteDoc(id,path){
    return request({
        method:'GET',
        url: 'http://127.0.0.1:8888/doc/delete',
        params:{
            id,
            path
        }
    })
}