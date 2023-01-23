import './App.css';
import { Fragment,useState } from 'react';
import Form from './Components/Form'
import Booklist from './Components/Booklist';
import Bookbyid from './Components/Bookbyid';
import context from './Context/context';
function App() {
  // global states 
  let [bookById, setBookById] = useState(null)
  let [book, setBook] = useState({ id: "", name: "", type: "" })
  let [deletedId, setDeletedId] = useState("")
  let [showedId, setShowedId] = useState("")
  return (
    <Fragment>
      <div className="App">
        <context.Provider value={{bookById,setBookById,book,setBook,deletedId,setDeletedId,showedId,setShowedId}}>
        <Form/>
        <Booklist/>
        <hr/>
        <Bookbyid/>
        </context.Provider>
      </div></Fragment>
  );

}

export default App;
