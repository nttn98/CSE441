const express = require( 'express' );
// const bodyParser = require( 'body-parser' );
const mysql = require( 'mysql2' );

//Initialize the express application
const app = express();
const port = 3000;

app.use( express.json() );

//User bodyParser to parse incoming request bodies as JSON
// app.use( bodyParser.json() );

//MySQL database connection configuration
const db = mysql.createConnection( {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'nodejs_demo'
} );

db.connect( ( err ) =>
{
    if ( err )
    {
        console.error( 'Error connecting to the database:', err );
        return;
    }
    console.log( 'Connected to the MySQL database' )
} )

//CRUD Operations
//1. Create
app.post( '/api/users', ( req, res ) =>
{
    const { name, email } = req.body;
    const sql = 'INSERT INTO users (name,email) VALUES (?,?)';

    db.query( sql, [ name, email ], ( err, result ) =>
    {
        if ( err )
        {
            res.status( 500 ).json( { message: 'Error creating user', error: err } );
        } else
        {
            res.status( 201 ).json( { message: 'User created', userId: result.insertId } );

        }
    } )
} )

//2. Get all users
app.get( '/api/users', ( req, res ) =>
{
    const sql = 'SELECT * FROM users';
    db.query( sql, ( err, results ) =>
    {
        if ( err )
        {
            res.status( 500 ).json( { message: 'Error creating user', error: err } );
        } else
        {
            res.json( results );
        }
    } )
} )

//3. Get one user
app.get( '/api/users/:id', ( req, res ) =>
{
    const userId = req.params.id;
    const sql = 'SELECT * FROM users WHERE id=?';
    db.query( sql, [ userId ], ( err, results ) =>
    {
        if ( err )
        {
            res.status( 500 ).json( { message: 'Error creating user', error: err } );
        } else if ( results.length === 0 )
        {
            res.status( 404 ).json( { message: 'User not found' } );
        } else
        {
            res.json( results[ 0 ] );
        }
    } )
} )

//4. Update user
app.put( '/api/users/:id', ( req, res ) =>
{
    const userId = req.params.id;
    const { name, email } = req.body;
    const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';

    db.query( sql, [ name, email, userId ], ( err, result ) =>
    {
        if ( err )
        {
            res.status( 500 ).json( { message: 'Error creating user', error: err } );
        } else if ( result.length === 0 )
        {
            res.status( 404 ).json( { message: 'User not found' } );
        } else
        {
            res.json( { message: 'User updated' } );
        }
    } )
} )


//5. Delete user by Id
app.delete( '/api/users/:id', ( req, res ) =>
{
    const userId = req.params.id;
    const sql = 'DELETE FROM users WHERE id = ?';

    db.query( sql, [ userId ], ( err, result ) =>
    {
        if ( err )
        {
            res.status( 500 ).json( { message: 'Error creating user', error: err } );
        } else if ( result.length === 0 )
        {
            res.status( 404 ).json( { message: 'User not found' } );
        } else
        {
            res.json( { message: 'User deleted' } );
        }
    } )
} )

//Start the server
app.listen( port, () =>
{
    console.log( `Server is running on http://localhost:${ port }` );
} );