import React, {useState, useEffect} from 'react';


const FormPostTest = () => {


    const [counter, setUser] = useState([]);

    useEffect(() => {
        getUser();

    }, []);

    const getUser = async() => {
        const response =  fetch(
            `http://localhost:9081/users/all`
            );
        const data= response;
        setUser(data.hits)
        console.log(data.hits);
        
    }


return (
    <div className="FormPostTest">
        <form className="search-form" > 
            <input className="search-bar" type="text" />
            <button className="search-button" type="submit" >
                Search
            </button>
        </form>
    </div>
);
};

export default FormPostTest;