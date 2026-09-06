import { after, before, test } from "node:test"
import assert from "node:assert/strict"
import app from "../app.js"

let server
let baseUrl

before(() => {
  server = app.listen(0)
  const { port } = server.address()
  baseUrl = `http://127.0.0.1:${port}`
})

after(() => {
  server.close()
})

test("GET /health returns the service status", async () => {
  const response = await fetch(`${baseUrl}/health`)

  assert.equal(response.status, 200)
  assert.deepEqual(await response.json(), { status: "ok" })
})

test("unknown routes return a JSON 404", async () => {
  const response = await fetch(`${baseUrl}/missing`)

  assert.equal(response.status, 404)
  assert.deepEqual(await response.json(), { error: "Not found" })
})