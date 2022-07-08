const express = require('express')
const app = express()
const path = require('path')
const buildPath = __dirname + '/game-deployment-builds/'

const chickenRouter = express.Router()
const tutorialRouter = express.Router()
const bearRouter = express.Router()

app.get('/',function(req,res){
  res.send('server is running...')
});

chickenRouter.get('/',function(req,res){
  res.sendFile(path.join(buildPath + 'chicken-run/WebGL Builds/index.html'))
});

chickenRouter.use(express.static('game-deployment-builds/chicken-run/WebGL Builds', {
  setHeaders: function(res, path) {
      if(path.endsWith(".gz")){
        res.set("Content-Encoding", "gzip")
      }
      if(path.endsWith("wasm.gz")) {
        res.set("Content-Type", "application/wasm")
      }
  }
}))

tutorialRouter.get('/',function(req,res){
  res.sendFile(path.join(buildPath + 'tutorial/WebGL Builds/index.html'))
});

tutorialRouter.use(express.static('game-deployment-builds/tutorial/WebGL Builds', {
  setHeaders: function(res, path) {
      if(path.endsWith(".gz")){
        res.set("Content-Encoding", "gzip")
      }
      if(path.endsWith("wasm.gz")) {
        res.set("Content-Type", "application/wasm")
      }
  }
}))

bearRouter.get('/',function(req,res){
  res.sendFile(path.join(buildPath + 'fight-the-bear/WebGL Builds/index.html'))
});

bearRouter.use(express.static('game-deployment-builds/fight-the-bear/WebGL Builds', {
  setHeaders: function(res, path) {
      if(path.endsWith(".gz")){
        res.set("Content-Encoding", "gzip")
      }
      if(path.endsWith("wasm.gz")) {
        res.set("Content-Type", "application/wasm")
      }
  }
}))

app.use('/tutorial', tutorialRouter)
app.use('/fight-the-bear', bearRouter)
app.use('/chicken-run', chickenRouter)

app.listen(process.env.port || 3000);

console.log('Running at Port 3000...');
