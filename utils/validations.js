const validateUserData = (data) => {
    if (!data) {
        throw new Error("request body is empty.")
    }
    if (!data.username || !data.password) {
        throw new Error("Username and Password are required.")
    }

}

const validateEmail = (email) => {
    const regExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if(!regExp.test(email)){
        throw new Error('Invalid email.')
    }
}

module.exports = { validateUserData, validateEmail }
