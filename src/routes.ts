
import AccountRouter from './router/account';
import LoginRouter from './router/login';

//路由一级控制?总控
const Routes = [{
    url: '/',
    router: AccountRouter
}, {
    url: '/admin',
    router: LoginRouter
}]

export default Routes