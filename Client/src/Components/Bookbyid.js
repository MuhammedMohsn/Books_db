import React, { Fragment, useContext } from 'react'
import context from '../Context/context'
function Bookbyid() {
    let { bookById } = useContext(context)
    return (
        <Fragment>
            <h1>Bookbyid</h1>
            <div style={{ height: "100px", backgroundColor: 'brown', borderRadius: "20px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
                {bookById ? <Fragment><p style={{ color: "white" }}>The showed book has </p>
                    <p style={{ color: "white" }}> id : {bookById?.id}  </p><p style={{ color: "white" }}>name :{bookById?.name}</p><p style={{ color: "white" }}> type : {bookById?.type}</p></Fragment> : <div>not selected id yet ,Or not found please select another id</div>}
            </div>
        </Fragment>
    )
}

export default Bookbyid