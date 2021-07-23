import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";

import Login from './Login';
import Register from './Register';





function App() {
  const [listNews, setListNews] = useState({});

  const UrlBase = "https://api-sandbox.elcomercio.pe"

  
  const urlSDK = "https://arc-subs-sdk.s3.amazonaws.com/sandbox/sdk-identity.min.js"


  const [isLogged,setIsLogged] = useState( false)

  const [dataLogin,setDataLogin] = useState(
      {
       emailLogin:"",
       passLogin: ""
      }
    )


  useEffect(() => {
    // DEMO: Para obtener los datos de la API en nuestro localhost usar un proxy
    // URL API: https://newsapi.org/v2/everything?q=tesla&from=2021-06-19&sortBy=publishedAt&apiKey=0c76dce6efd947d0bd1f6ac1f4324b9e
    console.log("iniciando")
    const proxyUrl = "https://cors-anywhere.herokuapp.com/"; // URL PROXY (si no te permite por temas de permisos)
    const qInTitle = "tesla"; // noticias sobre "tesla"
    const from = "2021-07-22"; // fecha noticias publicadas (desde)
    const apiKey = "7a8f4f359e4242a6b95d98e408594d7a"; // reemplazar tu API KEY
    const url = `${proxyUrl}https://newsapi.org/v2/everything?qInTitle=${qInTitle}&from=${from}language=en&apiKey=${apiKey}`;
    const request = new Request(url);

    fetch(request)
      .then((response) => response.json()) // convierte a JSON
      .then((news) => {
        // si todo es correcto lista los resultados en consola
        console.log(news);
        setListNews(news);
      })
      .catch((error) => {
        // si hubo un error impreme los detalles en consola
        console.log(error);
      });
  }, []);

  const handleInput = (event) => {
    const {value, name} = event.target

    setDataLogin({
      ...dataLogin,
      [name]: value
    })

  }


  const handleSubmit = () => {
    const{ emailLogin,passLogin} = dataLogin
    window.Identity.apiOrigin = UrlBase
    window.Identity.login(emailLogin,passLogin).then(res => {
      console.log("todo correcto",res)
    }).catch(err => {
      console.log("algo fallo",err)
    })

  }


  return (
    
    <div className="App">
      <form>  
        <input type="email" name="emailogin" placeholder="Ingresar  correo"/>
        <input type="password" name="paslogin" placeholder="Ingresar contraseña"/>
        <button type="button" name="btnlogin" onClick={handleSubmit}>Iniciar sesion </button>


      </form>
      /*<section>
        <h1>Lista Noticias Ejemplo</h1>
        {
          // DEMO: listado de noticias obtenidas
          listNews.articles &&
            listNews.articles.map((item) => (
              <p key={item.publishedAt}>{item.title}</p>
            ))
        }
      </section>*/
    </div>

  );
}

export default App;
