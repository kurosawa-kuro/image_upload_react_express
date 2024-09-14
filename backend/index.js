const express = require('express')
const path = require('path')
const cors = require('cors')
const multer = require('multer')

const app = express()

// ミドルウェアの設定
app.use(cors())
app.use(express.json())
app.use('/Images', express.static(path.join(__dirname, 'public/Images')))

// Multerストレージの設定
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./public/Images"),
  filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`)
})

const upload = multer({ storage })

// ファイルアップロードのルート
app.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    console.log('アップロードされたファイル:', req.file)
    res.status(200).json({ 
      message: 'ファイルが正常にアップロードされました',
      file: req.file,
      url: `http://localhost:3001/Images/${req.file.filename}`
    })
  } else {
    console.log('ファイルアップロード失敗')
    res.status(400).json({ message: 'ファイルのアップロードに失敗しました' })
  }
})

// サーバーの起動
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})