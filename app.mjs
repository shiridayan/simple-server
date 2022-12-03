import express from 'express';
import log from '@ajar/marker';
import morgan from 'morgan';

const { PORT, HOST } = process.env;

const app = express()

app.get('/',  (req, res) => {
    res.status(200).send('Hello Express!')
})

app.get('/users', (req, res) => {
    res.status(200).send('Get all Users')
})

// req.query - access the querystring part of the request url
// http://localhost:8080/dogs?breed=poddele
app.get('/dogs', (req, res) => {
    const {breed} = req.query
    res.status(200).send(`my favorite dog is: ${breed }`)
})

//  req.params - access dynamic parts of the url
// http://localhost:8080/user/shiri
app.get('/user/:name', (req, res) => {
    const {name} = req.params
    res.status(200).send(`My name is: ${ name}`)
})

// - req.body - access the request body of a POST request
// http://localhost:8080/
app.use(express.json()) // <==== parse request body as JSON

app.post('/test', (req, res) => {
  res.status(200).json(req.body)  // <==== req.body will be a parsed JSON object
  console.log(req.body)
})

// return api json response
app.get('/api', (req, res) => {

    const data = [
        {id:1, first_name:'Alfi' , lastName:'Ploto'},
        {id:2, first_name:'Donald' , lastName:'Duck'},
        {id:3, first_name:'Mickey' , lastName:'Mouse'},
    ]

    res.status(200).json(data)
})

// return html markup response
app.get('/getYourMarkup',(req,res) => {
    const markup = ` <div> <p>helloooo</p> </div>`
    res.status(200).set('Content-Type', 'text/html').send(markup)
})

// return 404 status with a custom response to unsupported routes
app.use((req,res,next)=>{
    res.status(404).send(`My 404 not found`)
})

app.listen(PORT, HOST,  ()=> {
    log.magenta(`🌎  listening on`,`http://${HOST}:${PORT}`);
});


//------------------------------------------
//         Express Echo Server
//------------------------------------------
/* challenge instructions

     - install another middleware - morgan
        configuring app middleware like so:
        app.use( morgan('dev') );

    -  define more routing functions that use

        - req.query - access the querystring part of the request url
        - req.params - access dynamic parts of the url
        - req.body - access the request body of a POST request
        
        in each routing function you want to pass some values to the server from the client
        and echo those back in the server response

    - return api json response
    - return html markup response

    - return 404 status with a custom response to unsupported routes


*/
