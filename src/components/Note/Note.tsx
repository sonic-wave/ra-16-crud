import React from 'react'
import './Note.css'

export interface NoteProps {
  id: number,
  content: string
}

export const Note: React.FC<{ note: NoteProps, onDeleteHandler: (e: number) => void }> = ({ note, onDeleteHandler }) => {
  return (
    <div className='note-component'>
        <div className='note-content'>{note.content}</div>
      <button className='note-button' onClick={() => onDeleteHandler(note.id)}>&#10005;</button>
    </div>
  )
}
