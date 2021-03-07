import {request} from "@/network/request";

export  function getEmloyees(index){
    return request({
        method:'GET',
        url:'http://127.0.0.1:8888/employee',
        params:{
            index
        }
    })
}

export function getEmploys(employ){
    return request({
        method:"POST",
        url: "http://127.0.0.1:8888/employs",
        data: employ,
        header:{
            'Content-Type':'application/json'  //如果写成contentType会报错
        }
    })
}

export function addEmployee(employee){
    return request({
        method:"POST",
        url: "http://127.0.0.1:8888/addEmployee",
        data: employee,
        header:{
            'Content-Type':'application/json'  //如果写成contentType会报错
        }
    })
}

export function modifyEmployee(employee){
    return request({
        method:"POST",
        url: "http://127.0.0.1:8888/updateEmployee",
        data: employee,
        header:{
            'Content-Type':'application/json'  //如果写成contentType会报错
        }
    })
}

export function deleteEmployee(id){
    return request({
        method: 'GET',
        url: 'http://127.0.0.1:8888/deleteEmployee',
        params:{
            id
        }
    })
}