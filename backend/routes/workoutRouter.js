const express = require('express')
const Workout =require('../modles/wourkoutModel')
const {creatWorkout,getAllWorkouts,getWorkoutById, deleteWorkoutById} =require('../controllers/workoutController')

const router =express.Router()
//get all workouts
router.get('/',getAllWorkouts)

//get a single workout
router.get('/:id',getWorkoutById)

//post a new wourkout
router.post('/',creatWorkout)

//delete 
router.delete('/:id',deleteWorkoutById)

//patch
router.patch('/:id',(req,res)=>{
    res.json({
        message:"update workout"
    })
})




module.exports =router