import React from 'react'

function Dice(props) {

    const styles = {
        backgroundColor: props.isFrozen? 'blue' : 'white'
    }

  return (
    <div className='dice' style={styles} onClick={props.frozen}>
        <h2>{props.value}</h2>
    </div>
  )
}

export default Dice