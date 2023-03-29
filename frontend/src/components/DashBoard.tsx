import React from 'react'
import SideBar from './SideBar'

const DashBoard = () => {
  return (
      <SideBar userName='hoge'articles={["記事1", "記事２", "記事３"]} onNewArticleClick={() => {console.log("hoge")}}/>
  )
}

export default DashBoard