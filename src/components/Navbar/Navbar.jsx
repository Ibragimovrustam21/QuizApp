import React from 'react'
import './navbar.scss'
import { Link } from 'react-router-dom'

export const Navbar = ({ selectedQuizNumber, amount, showModal, answerArray }) => {

  return (
    <div className='navbar__wrapper'>
      <Link to='/' className='navbar__logo' >QuizApp</Link>
      {
        answerArray.length !== 0 && <>
          <h4 className='navbar__amount m-0'>{selectedQuizNumber + 1}/{amount}</h4>
          <button className='btn btn-danger px-4' onClick={showModal}>
            Finish
          </button>
        </>
      }
    </div>
  )
}
