function pathHandler(req,res,next){
    return res.json({
        estatusCode: 404,
        message: `${req.method} ${req.url} not found endpoint`
    })
}

export default pathHandler