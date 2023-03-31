import React from 'react'
import SideBar from '../SideBar'

const DashBoard = () => {
  return (
      <SideBar username='knitta' notes={["記事1", "記事２", "記事３"]} onNoteClick={(note: string) => {console.log(note)}}/>
  )
}

export default DashBoard