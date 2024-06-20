import express, {type Request, type Response} from 'express'


const check = (req, res) =>{
    res.json({message:"Hey , there !!"})
}

export default check