'use client';

import React, { useState, ChangeEvent } from "react"
import axios from 'axios'

export default function Home() {
  // State variables
  const [file, setFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState<string>('')
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null)
  
  // File selection handler
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  // File upload handler
  const upload = async () => {
    console.log("アップロード関数が呼び出されました")
    setUploadStatus("アップロード開始")
    setUploadedImageUrl(null) // Reset previous upload
    
    if (!file) {
      console.log('ファイルが選択されていません')
      setUploadStatus('ファイルが選択されていません')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    try {
      setUploadStatus("サーバーにリクエスト中...")
      const res = await axios.post('http://localhost:3001/upload', formData)
      
      setUploadStatus('ファイルが正常にアップロードされました')
      
      // Set the URL of the uploaded image
      if (res.data.file && res.data.file.filename) {
        setUploadedImageUrl(`http://localhost:3001/Images/${res.data.file.filename}`)
      }
    } catch (error) {
      console.log('アップロードエラー:', error)
      setUploadStatus('アップロードエラーが発生しました')
    } finally {
      console.log("アップロード処理完了")
      setUploadStatus(prevStatus => prevStatus + " (処理完了)")
    }
  }

  // Component render
  return (
    <div>
      <input type="file" onChange={handleFileChange}/>
      <button type="button" onClick={upload} disabled={!file}>アップロード</button>
      <p>アップロードステータス: {uploadStatus}</p>
      {uploadedImageUrl && (
        <div>
          <h3>アップロードされた画像:</h3>
          <img src={uploadedImageUrl} alt="Uploaded" style={{maxWidth: '300px'}} />
        </div>
      )}
    </div>
  )
}