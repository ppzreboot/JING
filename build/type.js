import fs from 'fs'

fs.copyFile('./src/lib/index.ts', './dist/index.d.ts', err => {
  if (err)
    throw err
  else
    console.log('\ntypes copied')
})
