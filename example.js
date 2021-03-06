var fs = require('fs')
var hyperdrive = require('hyperdrive')
var ram = require('random-access-memory')

var isDuplicate = require('.')

var archive = hyperdrive(ram)

archive.writeFile('example.js', fs.readFileSync('example.js'), function (err) {
  if (err) throw err
  isDuplicate(archive, 'example.js', function (err, duplicate) {
    if (err) throw err
    console.log(`${duplicate.toString().toUpperCase()}: example.js is duplicate`)
  })
  isDuplicate(archive, 'example.js', 'example.js', function (err, duplicate) {
    if (err) throw err
    console.log(`${duplicate.toString().toUpperCase()}: example.js is still duplicate`)
  })
  isDuplicate(archive, 'index.js', function (err, duplicate) {
    if (err) throw err
    console.log(`${duplicate.toString().toUpperCase()}: index.js is not in archive so should be false`)
  })
  isDuplicate(archive, 'example.js', 'index.js', function (err, duplicate) {
    if (err) throw err
    console.log(`${duplicate.toString().toUpperCase()}: index.js is not duplicate`)
  })
  isDuplicate(archive, 'index.js', 'example.js', function (err, duplicate) {
    if (err) throw err
    console.log(`${duplicate.toString().toUpperCase()}: index.js is not duplicate the other way around either. weird.`)
  })
})
