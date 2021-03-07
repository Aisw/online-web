import Vue from 'vue'
import VueRouter from "vue-router";

const Home = () => import('@/views/Home')
const Login =() => import('@/views/Login')
const Organization =() => import('@/views/organization/Organization')
const  User =() => import('@/views/user/User')
const Train =() => import('@/views/Train/Train')
const Book =() => import('@/views/book/Book')
const Doc =() => import('@/views/document/Document')
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

//1.安装插件
Vue.use(VueRouter)

//2.创建router
const routes =[
    {
        path: '',
        redirect: '/login'
    },
    {
        path: '/login',
        component:Login,
    },
    {
        path: '/home',
        component:Home,
        redirect: '/organization',
        children:[
            {
                path: '/organization',
                component: Organization
            },
            {
                path: '/user',
                component: User
            },
            {
                path: '/train',
                component: Train
            },
            {
                path: '/book',
                component: Book
            },
            {
                path: '/doc',
                component: Doc
            }
        ]
    },
    {
        path: '/org',
        component: Organization
    }
]

const router = new VueRouter({
    routes,
    mode:'hash'
})

//3.导出
export default router