import React from 'react'
import Header from './components/Header'
import Dice from './components/Dice'
import './styles.scss'

function App() {

  const [nums, setNums] = React.useState(newDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const firstVal = nums[0].value
    const allSameVal = nums.every(die => die.value === firstVal)
    const allFrozen = nums.every(die => die.isFrozen)
    if (allFrozen && allSameVal) {
      setTenzies(true)
    }
  }, [nums])

  function randNum() {
    return Math.floor((Math.random() * 6) + 1)
  }

  function freeze(id) {
    setNums(prevNums => prevNums.map(die => {
      return die.id === id ? {...die, isFrozen: !die.isFrozen} : die
    }))
  }

  function roll() {
    if (!tenzies) {
      setNums((prevNums) => prevNums.map((die, i) => 
        die.isFrozen ? die : {value: randNum(), isFrozen: false, id: i + 1} 
      ))
    } else {
      setNums(newDice())
      setTenzies(false)
    }
  }

  function newDice() {
    const numsArr = [];
    for (let i = 0; i < 10; i++) {
      const newDie = {
        value: randNum(),
        isFrozen: false,
        id: i + 1
      }
      numsArr.push(newDie)
    }
    return numsArr
  }

  const diceNums = nums.map((die) => {
    return <Dice key = {die.id} {...die} frozen={() => freeze(die.id)}/>
  })

  return (
    <div className='game--container'>
      {tenzies}
        <Header />
        <div className='dice--wrapper'>{diceNums}</div>
        <button className='btn' onClick={roll}>{tenzies ? "Reset" : "Roll"}</button>
    </div>
  )
}

export default App
