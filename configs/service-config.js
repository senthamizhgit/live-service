module.exports = {
    port: 5000,
    mongodb: {
        connection: 'mongodb+srv://ldsdba:ldsdba123@hurly-burly-dvff6.mongodb.net/live_display_system_db?retryWrites=true&w=majority',
        options: {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }
    }
}