import React, { Fragment, useContext } from 'react'
import "./form.css"
import axios from 'axios';
import context from '../Context/context';

function Form() {
    // use global states from global context in this component
    let { setBookById, setBook, book, setDeletedId, setShowedId, deletedId, showedId } = useContext(context)
    // submit_handler to add book
    function submitHandler(e) {
        e.preventDefault();
        axios.post("http://localhost:4000/books", book)
        setBook({ id: "", name: "", type: "" })
    }
    //    delete handler for delete book
    function delete_book(id) {
        axios.delete(`http://localhost:4000/books/${id}`).then(() => {
            setDeletedId("")
        }).catch((_err) => {
            console.log("failed to delete")
        })
    }
    // show book by id
    function show_book(id) {
        axios.get(`http://localhost:4000/books/${id}`).then((res) => {
            setBookById(res.data)
            setShowedId("")
        }).catch((_err) => { console.log("failed to show book") })
    }

    return (
        <Fragment>
            <div className='container'>
                <form action="/books" method='post' onSubmit={(e) => { submitHandler(e) }}>
                    <div className='add'>
                        <div className='input_container'>
                            <label htmlFor='id'>id</label>
                            <input type='text' value={book.id} onChange={(e) => { setBook({ ...book, [e.target.name]: e.target.value }) }} id="id" name="id" />
                        </div>
                        <div className='input_container'>
                            <label htmlFor='name'>name</label>
                            <input type='text' value={book.name} onChange={(e) => { setBook({ ...book, [e.target.name]: e.target.value }) }} id="name" name="name" />
                        </div>
                        <div className='input_container'>
                            <label htmlFor='type'>type</label>
                            <input type='text' value={book.type} onChange={(e) => { setBook({ ...book, [e.target.name]: e.target.value }) }} id="type" name="type" />
                        </div>
                        <button type='submit'>Add book</button>
                    </div>
                </form>
                <form onSubmit={(e) => { e.preventDefault() }}>
                    <div className='delete'>
                        <div className='input_container'>
                            <label htmlFor='id'>id</label>
                            <input type='text' value={deletedId} onChange={(e) => { setDeletedId(e.target.value) }} id="id" />
                        </div>
                        <button onClick={() => { delete_book(deletedId) }}>Delete book</button>
                    </div>
                </form>
                <form action='/books/:id' method='get' onSubmit={(e) => { e.preventDefault() }}>
                    <div className='show'>
                        <div className='input_container'>
                            <label htmlFor='id'>id</label>
                            <input type='text' value={showedId} onChange={(e) => { setShowedId(e.target.value) }} id="id" />
                        </div>
                        <button onClick={() => { show_book(showedId) }}>Show book</button>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}
export default Form
