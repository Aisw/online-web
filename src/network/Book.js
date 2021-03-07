import {request} from "@/network/request";

export  function getBooks(){
    return request({
        method:'GET',
        url:'http://127.0.0.1:8888/book/shows',

    })
}

export function deleteBook(id){
    return request({
        method: 'GET',
        url: 'http://127.0.0.1:8888/book/delete',
        params:{
            id
        }
    })
}

export function showByNameAndTime(name,time){
    return request({
        method: 'GET',
        url: 'http://127.0.0.1:8888/book/show',
        params:{
            name,
            time
        }
    })
}

export function loadBook(path){
    return request({
        method:'GET',
        url: 'http://localhost:8888/book/load',
        params:{
            path
        }
    })
}