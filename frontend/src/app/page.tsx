'use client';

import React, { useState, ChangeEvent } from "react"
import axios from 'axios'

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const upload = () => {
    if (!file) {
      console.log('ファイルが選択されていません');
      return;
    }

    const formData = new FormData()
    formData.append('file', file)
    axios.post('http://localhost:3001/upload', formData)
      .then(res => {
        console.log('ファイルが正常にアップロードされました');
      })
      .catch(er => console.log('アップロードエラー:', er))
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange}/>
      <button type="button" onClick={upload} disabled={!file}>アップロード</button>
    </div>
  )
}