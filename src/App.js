import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function App() {

  const [visitors, setVisitors] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("")
  const [isExist, setIsExist] = useState(false)
  const [lastestVisitors, setLastestVisitors] = useState(null)

  useEffect(() => {
    axios.get("http://localhost:9999/visitors/get-lastest-visitors")
    .then((res) => {
      console.log(res.data)
      setLastestVisitors(res.data)
    })
  }, [])

  const showVisitorsByDate = (value) => {
    let day = new Date(value)
    let dayString = day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate()
    setDate(dayString)
    setVisitors(null)
    axios.post("http://localhost:9999/visitors/get-visitors", { date: dayString })
    .then(res => {
      setAmount(res.data.amount)
      setVisitors(res.data.amount)
      setIsExist(true)
    }).catch(err => { 
      setVisitors("")
      setAmount("")
      setIsExist(false)
     })
  }

  const deteleVisitorsByDate = () => {
    axios.delete("http://localhost:9999/visitors/delete-visitors", { data: { date: date } })
    .then(res => {
      setVisitors("")
      setAmount("")
      setIsExist(false)
    }).catch(err => {})
  }

  const setData = () => {
    axios.post("http://localhost:9999/visitors/set-visitors", { date: date, amount: amount })
    .then(res => {
      console.log(res.data)
    }).catch(err => { console.log(err) })
  }
  return (
    <div className="App">
      <header className="App-header">
      <Calendar onChange={(value, event) => showVisitorsByDate(value) }/>
        <form>
          <input value={date} onChange={({target}) => setDate(target.value)} type="text" placeholder='Enter date (YY/MM/DD), example: 2022-05-03' />
          <br />
          <input value={amount} onChange={({target}) => setAmount(target.value)} type="text" placeholder='Enter amount, example: 12' />
          <br />
          <button type='reset' onClick={setData} disabled={!amount || !date}>SET</button>
          {isExist && <button onClick={deteleVisitorsByDate} type='button'>Delete</button>}
        </form>
        { lastestVisitors && <div>
          <h3>Lastest: <span>{lastestVisitors.date} [{lastestVisitors.amount} visitors]</span></h3>
          </div>}
      </header>
    </div>
  );
}

export default App;
