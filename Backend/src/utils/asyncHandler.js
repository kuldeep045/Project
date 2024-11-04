// const asyncHandler = (reqhandler) => (
//     (req, res, next) => {

//         Promise.resolve(reqhandler(req, res, next)).catch((err) => next(err))

        
//     }
// )

const asyncHandler = (reqHandler) => (async (req, res, next) =>{

    try {
        await reqHandler(req, res, next)
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
})

export default asyncHandler