import React from 'react';

function LastUserInDB(props){
    
    return(
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Last User in Data Base</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={`http://localhost:3001/images/products/${props.image}`} alt=" Product Image "/>
                    </div>
                    <h3>{props.name}</h3>
                    <p>{props.email}</p>
                    <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">View user detail</a>
                </div>
            </div>
        </div>
    )
}

export default LastUserInDB;
