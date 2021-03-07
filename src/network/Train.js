import {request} from "@/network/request";

export function getPrograms(){
    return request({
        method: 'GET',
        url: 'http://127.0.0.1:8888/pros/shows'
    })
}

export function queryProgram(programDes){
    return request({
        method: 'POST',
        url: 'http://127.0.0.1:8888/pros/show',
        data: programDes,
        header:{
            'Content-Type':'application/json'  //如果写成contentType会报错
        }
    })
}

export function publish(id){
    return request({
        method: 'GET',
        url: 'http://127.0.0.1:8888/pros/publish',
        params:{
            id
        }
    })
}
export function cancelStatus(id){
    return request({
        method: 'GET',
        url: 'http://127.0.0.1:8888/pros/cancelStatus',
        params:{
            id,
            status
        }
    })
}

export function deleteProgram(id){
    return request({
        method: 'GET',
        url: 'http://127.0.0.1:8888/pros/delete',
        params:{
            id
        }
    })
}

export function getId(){
    return request({
        method:'GET',
        url: 'http://127.0.0.1:8888/pros/getId'
    })
}

export function addProgram(program){
    return request({
        method: 'POST',
        url: 'http://127.0.0.1:8888/pros/add',
        data: program,
        header:{
            'Content-Type':'application/json'  //如果写成contentType会报错
        }
    })
}

export function getResId(){
    return request({
        method: 'GET',
        url: 'http://127.0.0.1:8888/pros/getResId'
    })
}

export function deleteResId(id){
    return request({
        method: 'GET',
        url: 'http://127.0.0.1:8888/pros/delResId',
        params:{
            id
        }
    })
}

//为了处理取消时选中的培训资料信息及其绑定文件和封面照片的处理
export function deleteResIds(reIds){
    return request({
        method: 'POST',
        url: 'http://127.0.0.1:8888/pros/delResIds',
        data: reIds,
        header:{
            'Content-Type':'application/json'  //如果写成contentType会报错
        }
    })
}

export function addResources(resources){
    return request({
        method: 'POST',
        url: 'http://127.0.0.1:8888/pros/addRes',
        data: resources,
        header:{
            'Content-Type':'application/json'  //如果写成contentType会报错
        }
    })
}

export function addResDocs(map){
    return request({
        method: 'POST',
        url: 'http://127.0.0.1:8888/pros/resDocs',
        data: map,
        header:{
            'Content-Type':'application/json'  //如果写成contentType会报错
        }
    })
}

export function getProgramDetail(id){
    return request({
        method: 'GET',
        url: 'http://127.0.0.1:8888/pros/retrain',
        params:{
            id
        }
    })
}

export function getDocsByResId(resId){
    return request({
        method: 'GET',
        url: 'http://127.0.0.1:8888/pros/getDocs',
        params:{
            resId
        }
    })
}