
const jwt = require("jsonwebtoken");

function generateStripeVerificationToken(ngoId){
    var token = {
            "ngoId": ngoId,
    }
    return jwt.sign(token, process.env.STRIPE_VERIFICATION_TOKEN_SECRET, { expiresIn: eval(process.env.STRIPE_VERIFICATION_TOKEN_EXPIRY) });
}

function parseStripeVerificationToken(jwtToken){
    let payload = jwt.verify(jwtToken, process.env.STRIPE_VERIFICATION_TOKEN_SECRET);
    return payload.ngoId;
}

module.exports={generateStripeVerificationToken ,parseStripeVerificationToken};
