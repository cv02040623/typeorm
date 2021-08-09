const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const PRIVATE_KEY = 'jackchen';
const JWT_EXPIRED = 60 * 60

//登录接口 生成token的方法
const setCode = (arg) => {
    const token = jwt.sign({ ...arg }, PRIVATE_KEY, { expiresIn: JWT_EXPIRED });
    return token
}


// jwt-token解析
const decode = req => {
    const token = req.get('Authorization')
    return jwt.verify(token, PRIVATE_KEY);
}


//开请验证并且过滤接口
const jwtAuth = expressJwt({
    credentialsRequired: true,
    algorithms: ['HS256'],
    secret: PRIVATE_KEY,
    // 自定义获取token的函数
    getToken: (req) => {
        if (req.headers.authorization) {
            return req.headers.authorization
        } else if (req.query && req.query.token) {
            return req.query.token
        }
    }
}).unless({
    // 除了这个地址，其他的URL都需要验证
    path: [
        '/admin/login',
        '/admin/upload',
        '/appVersion/upload',
        '/appVersion/download',
        /^\/public\/.*/,
        /^\/static\/.*/,
        /^\/user_disk\/.*/,
        /^\/user_video\/.*/
    ]
})


export {
    jwtAuth,
    decode,
    setCode
}
