import React,{useState, useEffect} from 'react';

function Register (){

	const UrlBase = "https://api-sandbox.elcomercio.pe"


	const urlSDK = "https://arc-subs-sdk.s3.amazonaws.com/sandbox/sdk-identity.min.js"

	const [isLogged, setIsLogged] = useState(false)
	const [dataRegister, setDataRegister] = useState(
		{
		emailReg:"",
		passReg:"",
		nameReg:"",
		lastNameReg: "",
		secondLastNameReg:"",
		phoneReg: "",
		typeDocReg: "",
		NumDocReg: ""

		}
	)


	useEffect( () =>{

	const sdkIdentity = document.createElement("script")
	sdkIdentity.src = urlSDK
	sdkIdentity.onload = function(){
		window.Identity.apiOrigin = UrlBase
		window.Identity.isLoggedIn().then(res => {
			if(res === true){
				setIsLogged(true)
			}
		}).catch(err => {
			console.log("no esta logueado", err)
		})
	}
	document.body.appendChild(sdkIdentity)

	},[])

	const handleInput = (event) => {
		const {value,name} = event.target

		setDataRegister({
			...dataRegister,
			[name]:value
		})
	}
	const handleSubmit = () =>{
		console.log(dataRegister)

		const {
			emailReg,
		passReg,
		nameReg,
		lastNameReg,
		secondLastNameReg,
		phoneReg,
		typeDocReg,
		NumDocReg
		} = dataRegister
		window.Identity.apiOrigin = UrlBase
		window.Identity.signUp(
			{
				"username": emailReg,
				"credentials": passReg,
				"password": "password"
			},
			{
				"firstName" : nameReg,
				"lastName" : lastNameReg,
				"secondLastName" : secondLastNameReg,
				"displayName" : emailReg,
				"email" : emailReg,
				"contacts" : [
					{
						"phone" : phoneReg,
						"type" : "HOME"
					}
				],
				"attributes": [
				{
					"name": "typeDocument",
					"value": typeDocReg,
					"type": "String"
				},
				{
					"name" : "document",
					"value" : NumDocReg,
					"type"  : "String"
				}
				]
			},{ doLogin :true},{remenberMe: true}
		).then(res => {
			console.log("registro exitoso", res)
			setIsLogged(true)
		}).catch(err =>{
			console.log("registro fallido")
		})

	}


	return(
		<>{
			isLogged ? <h1>Bienvenido</h1> : (
			<>
				<h1>Registrate</h1>
			<form>
			<input type="email" name="emailReg" placeholder="Ingresar Correo" onChange={handleInput} /><br></br>
			<input  type="password" name="passReg" placeholder="Ingresar Contraseña" onChange={handleInput}/><br></br>
			<input  type="text" name="nameReg" placeholder="Ingresar Nombre" onChange={handleInput}/><br></br>
			<input type="text" name="lastNameReg" placeholder="Ingresar Apellido Paterno" onChange={handleInput}/><br></br>
			<input type="text" name="secondLastNameReg" placeholder="Ingresar Apellido Materno" onChange={handleInput}/><br></br>
			<input type="phone" name="phoneReg" placeholder="Ingresar Telefono" onChange={handleInput} /><br></br>
			<input type="text" name="typeDocReg" placeholder="Ingresar Tipo de Documento" onChange={handleInput}/><br></br>
			<input type="number" name="NumDocReg" placeholder="Ingresar Numero de Documento" onChange={handleInput}/><br></br>

			<button type="button" onClick={handleSubmit}> Registrarse</button>

			</form>
			</>
			)

		}	
			
		</>	
		)
		
		
}

export default Register


