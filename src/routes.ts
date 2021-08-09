
import AccountRouter from './router/account';
import LoginRouter from './router/login';
import AuthorRouter from './router/author';
import RoleRouter from './router/role';
import Customer from './router/customer';
import imgUpload from './router/upload'

//路由一级控制?总控
const Routes = [{
    url: '/admin',
    router: AccountRouter
}, {
    url: '/admin',
    router: LoginRouter
}, {
    url: '/admin',
    router: AuthorRouter
}, {
    url: '/admin',
    router: RoleRouter
}, {
    url: "/admin",
    router: Customer
}, {
    url: '/admin',
    router: imgUpload
}]

export default Routes