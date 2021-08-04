
import AccountRouter from './router/account';
import LoginRouter from './router/login';
import AuthorRouter from './router/author';

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
}]

export default Routes