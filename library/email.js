const sendMail = async(to,subject,text,htmlcontent) => {
const transporter = nodeMailer.createTransport ({
    port : 465,
    host : "smtp.gmail.com",
    auth : {
        user : process.env.EMAIL_USER || 'abcd@gmail.com',
        pass : process.env.EMAIL_PASSWORD || '123456'
    },
    secure : true,
})

const mailData = {
    from : process.env.EMAIL_USER,
    to ,
    subject,
    text,
    html : htmlcontent
};
transporter.sendMail(mailData,(err,info)=> {
    if(err){
        throw new Error(err)
    }
    else {
        return "success"
    }
})
}

module.exports = {
    sendMail
}

