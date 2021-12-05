import { useState } from 'react'

const FundPerson = () => {
  const [technologyFund] = useState([{
    name: '冯明远',
    company: '信达澳银基金',
    type: '科技基金'
  }])
  const [fundblogger] = useState([{
    name: 'b站研究员雷牛牛'
  }])
  return (
    <div>
      <ul>
        {technologyFund.map(item => {
          return <li>{item.name}------{item.type}------{item.company}</li>
        })}
      </ul>
      <ul>
        {fundblogger.map(item => {
          return <li>{item.name}</li>
        })}
      </ul>
      
    </div>
  )
}

export default FundPerson