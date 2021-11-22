const errorMessage = (res,status,err) => {
    let mess;
    if(err.details) mess = {status: 'error' , message : err.details[0].message , path : err.details[0].path}
    else mess = err

    res.status(status).send(mess)
}

module.exports ={
    errorMessage
}