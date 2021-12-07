import React from 'react'
import Appbar from './appbar'
import Board from './board.js'
import Post from './post.js'
import Edit from './edit.js'
import NoMatch from './noMatch'

import { Routes, Route, useNavigate } from 'react-router-dom'

function Guide(props) {
  const navigate = useNavigate()
  
  return (
    <div className="wrapper">
      <Appbar navigate={navigate} />
      <Routes>
        <Route path="/" element={<Board navigate={navigate} />} />
        <Route path="/post/:pid" element={<Post navigate={navigate} />} />
        <Route path="/new" element={<Edit navigate={navigate} />} />
        <Route element={<NoMatch navigate={navigate} />} />
      </Routes>
    </div>
  )
}

export default Guide
