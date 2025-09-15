import {createPool} from "mysql2/promise"


export const pool = createPool({
    host: "localhost",
    user: "root",
    password: "Nickzzz18440",
    database: "nikhildb", 
})

async function trydb() {
     try {
    const connection = await pool.getConnection();
    console.log("✅ Connected to MySQL!");
    connection.release(); // release back to pool
  } catch (err) {
    console.error("❌ MySQL connection error:", err);
  }
}
trydb()

