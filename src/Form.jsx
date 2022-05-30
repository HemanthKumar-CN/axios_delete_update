import React from 'react'
import axios, { Axios } from "axios"


const Form = () => {

    const [data, setData] = React.useState([]);

    const [flag, setFlag] = React.useState(true)

    const [name, setName] = React.useState("")



    
        console.log("fullData",data)


    React.useEffect(() => {
        getTask()
        
        
      }, [])

    const getTask= async ()=> {
        let r=await axios.get(`http://localhost:8080/todos`)
        // console.log(r.data)
        console.log(r)

        setData(r.data)
    }

    const update=(id,val,isCompleted)=> {
        const data1= {
            "value": val,
            
            "isCompleted":(!isCompleted),
            
        }

        axios.put(`http://localhost:8080/todos/${id}`, data1)
        .then(res=> {
            // console.log(res.data)
            // setData(res.data)
            getTask()
            
        })
        .catch((err)=> {
            console.log(err)
        })

    }

    const del=(id)=> {
        axios.delete(`http://localhost:8080/todos/${id}`)
        .then(res=> {
            // console.log(res.data)
            getTask()
        })
        .catch(err=> {
            // console.log(err)
        })
    }

    const add=()=> {

        axios.post(`http://localhost:8080/todos`, {
            
            "value":name,
            "isCompleted": false
        }).then(res=> {
            console.log(res.data)
        })

        getTask()
        
    }

    
    

  return (
    <div>
        <h1>Form</h1>

        {
            data.map(item=> (
                <div key={item.id} onClick={()=>update(item.id,item.value,item.isCompleted)}><input checked={item.isCompleted} type="checkbox" onChange={(e)=> {
                    console.log(e.target.checked,item.id)
                }}/> {item.value} - {item.isCompleted} 
                <button onClick={()=>del(item.id)}>Del</button>
                <button>update</button>

                </div>
            ))
        }

        {
            (flag) ? <button onClick={()=>{setFlag(false)}}>edit</button> : <button onClick={()=> {setFlag(true)}}>Save</button>
        }
        <br />

        {
            <input type="text" placeholder='Write name' value={name} onChange={(e)=> {
                setName(e.target.value)
            }}/>

            
        }
        {
            <input type="submit" onClick={()=>add()} />
        }
        

    </div>
  )
}

export default Form