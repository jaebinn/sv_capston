// config/sessionConfig
// 세션설정

const sessionConfig = {
    secret: 'thisshouldbeabettersecreet!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        // 일주일을 만료기간으로 지정 
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
    }
}

module.exports = sessionConfig;