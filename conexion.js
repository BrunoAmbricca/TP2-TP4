import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

try{
    console.log("Conectando...")
    client.connect(err => {
        if(err) throw err
        console.log("Conectado!")

        const db = client.db('empresa')

        db.collection('clientes').find({}).project({_id: 0, nombre: 1, apellido: 1}).toArray((err, clientes) => {
            if(err) throw err
            
            console.log("Lista de Clientes")
            console.log(clientes)
        })

        db.collection('productos').updateMany({}, {$set: {codigo: 'xxx-xxxxx'}})

        db.collection('productos').find({}).project({_id: 0, nombre: 1, precio: 1, codigo: 1}).toArray((err, productos) => {
            if(err) throw err
            
            console.log("Lista de Productos")
            console.log(productos)

            client.close()
        })

    })
}catch(ex){
    console.log("Error en la conexion de base de datos: " + ex.message)
}
