import app from "./app.js"

const port = Number(process.env.PORT) || 3000

const server = app.listen(port, () => {
  console.log(`Angket backend listening on port ${port}`)
})

// Graceful error handling for listen failures
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`\nPort ${port} is already in use.`)
    console.error(`Run:  npx kill-port ${port}  (or restart your terminal)\n`)
    process.exit(1)
  }
  console.error(err)
  process.exit(1)
})