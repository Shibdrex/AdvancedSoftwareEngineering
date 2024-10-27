import React from 'react'

function SubmitAll({onComplete}){

    return(
      <div>
      <div className='half-page'></div>,
      <div className='black-page'>
      <div className='content'>
      <p>Super! Deine Präferenzen wurden gespeichert!<br/>Du kannst nun Isabella benutzen. <br/>Die Präferenzen kannst du anpassen wenn du magst.</p>
            <button className="start-button" onClick={onComplete}>Abschließen</button>
      </div>
      </div>
      </div>
    )
  }

export default SubmitAll;