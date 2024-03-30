import { useState, useEffect } from "react"
import Quotes from "./quotes"



function MockDataFetching() {
    const [data, setData] = useState([])

    useEffect(() => {

        async function fetchData() {
            const response = await fetch("http://localhost:3000/mockquotes")
            const responseData = await response.json()
            setData(responseData)

        }
        fetchData()
    }, [])
    return (
        <div className="roboto-bold backgorund1">

            <h1> MockDataFetching from mock api </h1>
            {
                data.map((item) => {
                    return (
                        <>
                            <h3>{item.title}</h3>
                            <p key={item.id}>{item.description}</p>
                            
                        </>
                    );
                })
            }
           <h1>here are quotes</h1>
           <Quotes/>
              
        </div>
    )
}

export default MockDataFetching

