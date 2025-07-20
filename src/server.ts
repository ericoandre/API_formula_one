import fastify from 'fastify';
import cors from '@fastify/cors';

const server = fastify({ logger:true });

server.register(cors, {
    origin: "*",
    methods: ["GET", "POST"]
});

// database local
const teams = [
    {id:1, name:"Ferrari"},
    {id:2, name:"McLaren", base:"Woking, United Kingdom"},
    {id:3, name:"Mercedes", base:"Brackley, United Kingdom"},
    {id:4, name:"Red Bull Racing", base:"Milton, United Kingdom"}
]

const drivers = [
    {id:1, name:"Max Verstappen", team: "Red Bull Racing"},
    {id:2, name:"Lewis Hamilton", team: "Ferrari"},
    {id:3, name:"Lando Norris", team: "McLaren"},
]

// teams routes
server.get('/teams', async (req, res)=>{
    res.type("application/json").code(200);
    return { teams };
});
interface DriverTeams{
    id:string
}
server.get<{Params: DriverTeams}>('/teams/:id', async (req, res)=>{
    const id = parseInt(req.params.id);
    const team = teams.find(d => d.id === id);

    if(!team){ 
        res.type("application/json").code(404);
        return { message: "teams not Found"}
    }else{
        res.type("application/json").code(200);
        return { team };
    }
});

// drivers routes
server.get('/drivers', async (req, res)=>{
    res.type("application/json").code(200);
    return {drivers};
});
interface DriverParams {
    id:string
}
server.get<{Params: DriverParams}>('/drivers/:id', async (req, res)=>{
    const id = parseInt(req.params.id);
    const driver = drivers.find(d => d.id === id);

    if(!driver){ 
        res.type("application/json").code(404);
        return { message: "Driver not Found"}
    }else{
        res.type("application/json").code(200);
        return {driver};
    }
});

// listen
server.listen({port:3333}, ()=> console.log(`Server init`));