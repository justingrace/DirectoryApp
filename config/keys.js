module.exports = {
    admin: {
        secret: process.env.ADMIN_SECRET,
    },
    mongodb: {
        uri: process.env.MONGODB_URI
    }
}
