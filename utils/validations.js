const validateUserData = (data) => {
    if (!data) {
        throw new Error("request body is empty.")
    }
    if (!data.username || !data.password) {
        throw new Error("Username and Password are required.")
    }

}
module.exports = { validateUserData }
