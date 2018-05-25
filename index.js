var http = require('http')
const shell = require('shelljs')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/webhook', secret: '123456' })

const projects = ['webhooktest']

const projectHandler = (event, action) => {
  const project = event.payload.repository.name // 提交的仓库名字
  if (projects.includes(project)) {
    console.log(new Date())
    shell.exec(`sh deploy.sh`, function (code, stdout, stderr) {
      console.log(new Date(), 'Exit code:', code)
      // console.log(new Date(), 'Program output:', stdout)
      console.log(new Date(), '执行完毕！错误信息：？', stderr)
    })

  }
}

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(4000)


handler.on('push', function (event) {
  projectHandler(event, 'push')
})