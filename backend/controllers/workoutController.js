const Workout =require('../modles/wourkoutModel')
const mongoos=require('mongoose')

//delete workout

const deleteWorkoutById=async (req,res)=>{
    const {id} =req.params
    if(!mongoos.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "no such an id "})
    }
    const workout=await Workout.findOneAndDelete(id) 
    if(!workout){
        res.status(404).json({error:"no such a workout" })
    }
    res.status(200).json(workout)
 }


//getAllWorkouts
const getAllWorkouts= async (req,res)=>{
    const workouts= await Workout.find({}).sort({createdAt :-1})
    res.status(200).json(workouts)
 }

 //get a wourkout by id

 const getWorkoutById=async (req,res)=>{
    const {id} =req.params
    if(!mongoos.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "no such an id "})
    }
    const workout=await Workout.findById(id) 
    if(!workout){
        res.status(404).json({error:"no such a workout" })
    }
    res.status(200).json(workout)
 }

//create a new workout
const creatWorkout=async (req,res)=>{
    const {title,reps,load}=req.body
    let emptyField=[]
        if(!title){
            emptyField.push('title')
        }
        if(!reps){
            emptyField.push('reps')
        }
        if(!load){
            emptyField.push('load')
        }
        if(emptyField.length>0){
            return res.status(400).json({error:'pleas fill all field',emptyField})
        }
    try{
          const workout =await Workout.create({title,load,reps})  
          res.status(200).json(workout)
    }catch(error){
     res.status(400).json({error:error.message})
    }
   
}

module.exports={
    creatWorkout,getWorkoutById,getAllWorkouts,deleteWorkoutById
}