import './App.css'
import React, {useState, useEffect} from 'react';

function Login(){

	const UrlBase = "https://api-sandbox.elcomercio.pe"

	const urlSDK = "https://arc-subs-sdk.s3.amazonaws.com/sandbox/sdk-identity.min.js"

	const [isLogged, setIsLogged] = useState(false)
	const [dataLogin, setDataLogin] = useState(
	{
		emailLogin:"",
		passLogin:""
	}

		)
	useEffect( () => {

		const sdkIdentity = document.createElement("script")
		sdkIdentity.src = urlSDK
		sdkIdentity.onload = function(){
			window.Identity.isLoggedIn().then(res => {
				if(res === true){
					setIsLogged(true)
				}
			}).catch(err =>{
				console.log("no esta logueado", err)
			})
		}
		document.body.appendChild(sdkIdentity)

	}, [])

	const handleInput = (event) => {
		const{value,name} = event.target

		setDataLogin({
			...dataLogin,
			[name]: value
		})

	}
	const handleSubmit = () => {
		const {emailLogin,passLogin} = dataLogin
		window.Identity.apiOrigin = UrlBase
		window.Identity.login(emailLogin,passLogin, {rememberMe: true}).then(res =>{
			console.log("todo correcto", res)
			setIsLogged(true)
		}).catch(err => {
			console.log("algo fallo",err)
		})
	}

	const handleLogout = () => {
		window.Identity.logout().then(res => {
			setIsLogged(false)
		})
	}

	return (
		<div className="App">
		{
			isLogged ? (
				<>
				   <h1>Bienvenido</h1>
				   <button type="button" onClick={handleLogout}>Cerrar Session</button>

				</>
				): (
				<>
				<h1>Iniciar Sesion </h1>
				<form>
				<input type="email" name="emailogin" placeholder="Ingresar  correo"/>
       			 <input type="password" name="paslogin" placeholder="Ingresar contraseña"/>
       			 <button type="button" name="btnlogin" onClick={handleSubmit}>Iniciar sesion </button>

       			 </form>

       			 </>
				)
		}
		</div>

		);

	
		
}

export default Login;