import { useState } from "react"
import { useWorkoutContext } from "../hooks/useWorkoutsContext"

const WorkoutForm=()=>{
    const {dispatch}=useWorkoutContext()
    const [title,setTitle]=useState('')
    const [load,setLoad]=useState('')
    const [reps,setReaps]=useState('')
    const [error,setError]=useState('')
    const [emptyField,setEmptyField]=useState('')

    const handlesubmit=async (e)=>{
        e.preventDefault()
        const workout={title,load,reps}
        const response =await fetch('/api/workouts',{
            method:'POST',
            body:JSON.stringify(workout),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const json =await response.json()
        if(!response.ok){
            setError(json.error)
            setEmptyField(json.emptyField)
        }
        if(response.ok){
            setError(null)
            console.log('new workout added',json)
            setTitle('')
            setLoad('')
            setReaps('')
            setEmptyField([])
            dispatch({type:'CREATE_WORKOUT',payload:json})
        }

    }
    return (
        <form className="create" onSubmit={handlesubmit}>
            <h3>Add a new Workout</h3>
            <label htmlFor="title" >Exercice title:</label>
            <input id="title" type="text" onChange={
               (e)=>setTitle(e.target.value) 
            }
            value={title}
            className={emptyField.includes('title')? 'error':'' }/>

<label htmlFor="load" >load:</label>
            <input id="load" type="number" onChange={
               (e)=>setLoad(e.target.value) 
            }
            value={load}
            className={emptyField.includes('load')? 'error':'' }/>    

<label htmlFor="reps" >Repes:</label>
            <input id="reps" type="number" onChange={
               (e)=>setReaps(e.target.value) 
            }
            value={reps}
            className={emptyField.includes('reps')? 'error':'' }/>

            <button> Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}
export default WorkoutForm