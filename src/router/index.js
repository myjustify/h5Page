import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export const constantRoutes = [
    {
        path: '/',
        component: () => import('@/views/home')
    },
    {
        path: '/bfQuestions',
        component: () => import('@/views/bfQuestions')
    }
]
const createRouter = () => new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()
export default router