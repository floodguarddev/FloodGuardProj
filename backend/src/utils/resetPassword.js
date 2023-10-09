const jwt = require("jsonwebtoken");
const {sendEmail} = require("../utils/emailHandler");
const createHttpError = require("http-errors");

function generateResetPasswordToken(email){
    var date = new Date();
    var mail = {
            "email": email,
            "created": date.toString()
    }
    return jwt.sign(mail, process.env.RESET_PASSWORD_TOKEN_SECRET, { expiresIn: eval(process.env.RESET_PASSWORD_TOKEN_EXPIRY) });
}

function parseResetPasswordToken(jwtToken){
    let payload = jwt.verify(jwtToken, process.env.RESET_PASSWORD_TOKEN_SECRET);
    return payload.email;
}

async function sendResetPasswordEmail(email, link){
    let subject = "Reset Password of Flood Guard";
    
    let emailBody = '<html><h2>Reset Passsword of Emumba To Do List</h2><p>Please, reset your password in emumba todo list using the given link</p><a href = "'+link+'"><button>Verify Email</button></a></html>';

    let response = await sendEmail(email, subject, emailBody).catch(
        (error)=>{
            throw new createHttpError.InternalServerError(error);
        }
    );

    return response;
}

async function sendUserResetPasswordEmail(email){
    let resetPasswordToken = generateResetPasswordToken(email);
    
    let link = process.env.SERVER_URL+'/users/resetPassword?token='+resetPasswordToken;

    return await sendResetPasswordEmail(email, link);
}

async function sendAdminResetPasswordEmail(email){

    let resetPasswordToken = generateResetPasswordToken(email);
    
    let link = process.env.ADMIN_CLIENT_URL+'/reset_password?token='+resetPasswordToken;

    return await sendResetPasswordEmail(email, link);
}

module.exports = {generateResetPasswordToken, parseResetPasswordToken, sendAdminResetPasswordEmail, sendUserResetPasswordEmail}