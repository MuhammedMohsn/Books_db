import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import context from '../Context/context'
import './booklist.css'
function Booklist() {
    // local state for displaying books
    let [books, setBooks] = useState([])
    let { book, deletedId } = useContext(context)
    // for fetching data after component is mounted
    useEffect(() => {
        axios.get('http://localhost:4000/books').then((books) => {
            setBooks(books.data)
        }).catch((_error) => { console.log("error when fetching data") })
    }, [])
    // for fetching data after any change due to post/delete
    useEffect(() => {
        axios.get('http://localhost:4000/books').then((books) => {
            setBooks(books.data)
        }).catch((_error) => { console.log("error when fetching data") })

    }, [book, deletedId])

    return (
        <div>
            <h2>All books : </h2>
            <hr />
            <ul>
                {books.map(item => {
                    return (<li key={Math.random()} className="item">
                        <p> id is : {item.id}</p> <p> book name is : {item.name}</p> <p> book type is : {item.type}</p>
                        <hr />
                    </li>)
                })}
            </ul>
        </div>
    )
}

export default Booklist