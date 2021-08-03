
import AccountRouter from './router/account';
import LoginRouter from './router/login';

const Routes = [{
    url: '/',
    router: AccountRouter
}, {
    url: '/admin',
    router: LoginRouter
}]

export default Routes