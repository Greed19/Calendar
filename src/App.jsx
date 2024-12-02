import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const initialDate = new Date()
  const datesString = ['SUN','MON','TUE','WED','THU','FRI','SAT']
  const [currentDate, setCurrentDate] = useState(initialDate)
  const [allDates, setAllDates] = useState([])
  const year = currentDate.getFullYear();
  const month =  (currentDate.getMonth() - 1) === -1 ? 1 : currentDate.getMonth() - 1;
  // const month = currentDate.getMonth() - 1;
  const date = currentDate.getDate()
  const day = currentDate.getDay()
  const [getDate, setGetDate] = useState(date)

  const resetMonth = () => {
    setCurrentDate(new Date())
  }
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))
  }
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))
  }

  const getAllDateFn = () => {
    const tempDate = new Date(year,month + 1,1)
    const prevMonth =  new Date(year,month -1,1)
    const nextMonth =  new Date(year,month +1,1)
    let tempArr = []
    let tempPrev = []
    let tempNext = []

    while(prevMonth.getMonth() === month -1){
      tempPrev.push(prevMonth.getDate())
      prevMonth.setDate(prevMonth.getDate() + 1)
    }
    while(nextMonth.getMonth() === month +1){
      tempNext.push(nextMonth.getDate())
      nextMonth.setDate(nextMonth.getDate() + 1)
    }
    
    const temp = tempDate.getDay();
    tempPrev.reverse()
    for(let i = 0; i < temp; i++){
      tempArr.push(tempPrev[i])
    }
    console.log(tempDate.getMonth(),month)
    while(tempDate.getMonth() === month + 1){
      tempArr.push(tempDate.getDate())
      tempDate.setDate(tempDate.getDate() + 1)
    }
    setAllDates(tempArr)
  }
  useEffect(() => {
    getAllDateFn()
  },[currentDate])
  console.log(month,'zxc')
  return (
    <main className='main_container'>
      <section className='calendar_container'>
        <button className='reset_btn' onClick={resetMonth}>This month</button>
        {`${year}${currentDate.toLocaleString('default',{month:'long'})}${date}`}
        <section className='calendary_dates'>
          {
            datesString.map((ds, i) => (
              <div className='date_box' key={`${year}-${ds}-${i}`}>
                {ds}
              </div>
            ))
          }
          {
            allDates.map((date, index) => (
              <div onClick={() => setGetDate(index)} className={`box ${index === getDate ? 'active': ''}`} key={`${year}-${month}-${index}`}>
                {date}
              </div>
            ))
          }
        </section>
        <section className='btn-container'>
          <button className='btn' onClick={prevMonth}>{'<'}</button>
          <button className='btn' onClick={nextMonth}>{'>'}</button>
        </section>
      </section>
    </main>
  )
}

export default App
