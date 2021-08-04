
import AccountRouter from './router/account';
import LoginRouter from './router/login';
import AuthorRouter from './router/author';
import RoleRouter from './router/role';

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
}]

export default Routes