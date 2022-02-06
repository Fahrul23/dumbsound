import { useContext, useEffect } from 'react';
import {API, setAuthToken} from './Config/Api';
import { UserContext } from './Context/UserContext';
import Routes from '../src/Routes'
import { useNavigate } from 'react-router-dom';
if(localStorage.token) {
    setAuthToken(localStorage.token)
}

function App() {
    let navigate = useNavigate();
    const [state, dispatch] = useContext(UserContext)

    useEffect(() => {        
        if(localStorage.token) {
            setAuthToken(localStorage.token)
        }
        if(state.isLogin === false){
            navigate("/");
        }
        if(state.user.length >0) {
            if(state.user[0].role === "admin"){
                navigate("/transaction")
            }else {
                navigate("/")
            }
        }
    }, [state])

    const checkUser = async () => {
        try {
        const config = {
            Headers: {
                "Content-type" : "aplication/json"
            }
        }
        const response = await API.get("/check-auth",config);

        if (response.status === 404) {
            dispatch({
                type: "AUTH_ERROR",
            });
        }

        let payload = response.data.data;
        payload.token = localStorage.token;
        
        dispatch({
            type: "USER_SUCCESS",
            payload,
        });
        } catch (error) {
           console.log(error);
        }
    };

    useEffect(() => {
        checkUser();
    }, []);



    return (
        <Routes />
    );
}

export default App;
