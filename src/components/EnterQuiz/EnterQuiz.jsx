import React from 'react'
import { useNavigate } from 'react-router';
import { Select } from 'antd';
import './enterQuiz.scss'

export const EnterQuiz = ({ setAmount, setFinishTest }) => {
  const navigate = useNavigate()
  const { Option } = Select;

  const handleChange = (value) => {
    setAmount(value)
  }
  const onSubmit = () => {
    setFinishTest(false)
    navigate('/quiz')
  }
  return (
    <div className='enterQuiz__wrapper'>
      <div className='enterQuiz__box'>
        <h6>Number Of Questions:</h6>
        <Select defaultValue={localStorage.getItem('amount')} style={{ width: '100%' }} onChange={handleChange}>
          <Option value="10">10</Option>
          <Option value="20">20</Option>
          <Option value="30">30</Option>
        </Select>
        <h6 className='mt-2'>Select Category:</h6>
        <Select defaultValue='Sport' style={{ width: '100%' }}>
          <Option value="sport">Sport</Option>
        </Select>
        <button
          className='btn btn-success mt-4'
          onClick={onSubmit}
        >
          Start
        </button>
      </div>
    </div>
  )
}
