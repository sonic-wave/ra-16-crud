import './NotesUpdate.css'

export const NotesUpdate = ({updateHandler}: {updateHandler: () => void}) => {
  return (
    <div className='notes-update-container'>
      <div className='notes-update-title'>Notes</div>
      <button className='notes-update-button' onClick={updateHandler}>&#8635;</button>
    </div>
  )
}
