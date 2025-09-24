import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';

import userRoutes from './routes/user.routes';
import taskRoutes from './routes/task.routes';
import authRoutes from  './routes/auth.routes'

import taskSQLroutes from './routes/taskSQL.routes'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt, { JwtPayload } from 'jsonwebtoken';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());



// ---------- Dummy posts ----------
const posts = [
  { username: "john", title: "post1" },
  { username: "lily", title: "post2" },
  { username: "harry", title: "post3" },
];

// ---------- Routes ----------
app.get('/', (req: Request, res: Response) => {
  res.send(posts);
});

// app.get('/posts', authenticate, (req: AuthRequest, res: Response) => {
//   res.send(posts.filter((post) => post.username === req.user?.username));
// });



app.use("/api/tasks", taskRoutes)
app.use("/api/sql/tasks", taskSQLroutes)

app.use("/api/users", userRoutes)

app.use("/api/auth", authRoutes)

// // Login/auth route (no middleware here)
// app.post("/auth", (req: Request, res: Response) => {
//   const { username } = req.body;
//   if (!username) {
//     return res.status(400).json({ error: "Username required" });
//   }

//   const user = { name: username };
//   const accessToken = generateAccessToken(user)

//   res.json({ accessToken });
// });


// function generateAccessToken(user:any) {
//   return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: '10s'})
// }


// // ---------- Middleware ----------
// function authenticate(req: AuthRequest, res: Response, next: NextFunction): void {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     res.sendStatus(401); // Unauthorized
//     return;
//   }

//   try {
//     const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as JwtUserPayload;
//     req.user = user;
//     next();
//   } catch (err) {
//     res.sendStatus(403); // Forbidden
//   }
// }



// tetsing passport and oauth2
import './config/gauth';
import passport from "passport";


app.use(session({secret:'cats'}))
app.use(passport.initialize())
app.use(passport.session())

function isLoggedIn(req:any,res:any,next:any) {
  req.user? next() : res.sendStatus(401)
}

app.get('/oauth', (req,res) => {
  res.send('<a href="/auth/google"> Authenticate with google </a>')
})

app.get('/auth/google',
  passport.authenticate('google', {scope: ['email']})
)

app.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/protected',
  failureRedirect: '/auth/failure'
}))

app.get('/auth/failure', (req,res) => {
  res.send("something went wrong")
})

app.get("/protected", isLoggedIn,(req,res) => {
  res.send('/Hello')
})









// ---------- MongoDB ----------
const mongoUrl = process.env.MONGO_URL as string;

mongoose.connect(mongoUrl)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));



// ---------- Start Server ----------
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
