import React,{ useState} from 'react'

const MyComponent = () =>{
    const [state,setState] = useState(0)
   
    return (
        <>
            <h1>Parent Component</h1>
            <ChildElem />
            <button onClick={()=> setState(state+1)}>Increment</button>
        </>
    )
}

const ChildElem = () => {
    return(
        <>
        </>
    )
}

export { MyComponent }