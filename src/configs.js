module.exports = {
    webToken: {
        secretKey: '3%&gkddh^&**434tgdghdg8809746423hgd6CCSBdjfifu5372BBSyghsf646974047^^&*$##2',
        expiresIn: 3600, //1 hour
    },
    mongoDb: {
        host: 'localhost',
        port: '27017',
        username: '',
        password: '',
        database: 'lexclassdb'
    },
    smsService: {
        sendUri: 'http://localhost:3001/api/v1/sms'
    },
    redisDb: {
        host: 'localhost',
        port: 6379,
        db: 0
    }
}