import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Result } from 'antd'
import axios from 'axios'
import './quiz.scss'

export const Quiz = ({ amount, selectedQuizNumber, setSelectedQuizNumber, overallBall, setOverallBall, answerArray, setAnswerArray, finishTest }) => {
  const [data, setData] = useState([])
  const [myAnswer, setMyAnswer] = useState('')
  const [indexQuestion, setIndexQuestion] = useState()

  let concatQuestions = data.length !== 0 && data[selectedQuizNumber] && data[selectedQuizNumber].incorrect_answers.concat(data[selectedQuizNumber].correct_answer)


  const getQuiz = async () => {
    await axios.get(`https://opentdb.com/api.php?amount=${amount}&category=21`)
      .then(res => {
        setData(res.data.results)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getQuiz()
  }, [amount])


  const quizNumber = (index) => {
    setSelectedQuizNumber(index)
    setMyAnswer('')
    setIndexQuestion()
  }

  const onSubmit = () => {
    let abs = answerArray.find(i => i.question === selectedQuizNumber)
    if (abs) return

    if (myAnswer == data[selectedQuizNumber].correct_answer) {
      let newItem = {
        question: selectedQuizNumber,
        class: 'list-group-item bg-success text-white',
        right_answer: data[selectedQuizNumber].correct_answer,
        my_answer: myAnswer
      }
      setAnswerArray([...answerArray, newItem])
      setOverallBall([...overallBall, newItem])
    }
    else {
      let newItem = {
        question: selectedQuizNumber,
        class: 'list-group-item bg-danger text-white',
        right_answer: data[selectedQuizNumber].correct_answer,
        my_answer: myAnswer
      }
      setAnswerArray([...answerArray, newItem])
    }
  }

  const addAnswer = (item, index) => {
    setMyAnswer(item)
    setIndexQuestion(index)
  }

  return (
    <>
      {
        finishTest ? <Result
          title="You have finished tests."
          extra={
            <Link to='/'>
              <Button type='primary'>
                Go back Home
              </Button>
            </Link>
          }
        />
          : <div className='quiz__wrapper'>
            <div className='quiz__head'>
              <ul>
                {
                  Array.from({ length: amount }, (_, i) => i + 1).map((item, index) => {
                    return <li
                      key={index}
                      className={index === selectedQuizNumber ? 'active' : ''}
                      onClick={() => quizNumber(index)}
                    >
                      {item}
                    </li>
                  })
                }
              </ul>
            </div>
            <div className="quiz__list card">
              <div className="card-header p-3">
                {selectedQuizNumber + 1}. {data[selectedQuizNumber] && data[selectedQuizNumber].question}
              </div>
              <ul className="list-group list-group-flush">
                {
                  concatQuestions && concatQuestions.map((item, index) => {
                    let obj = answerArray.find(a => a.question == selectedQuizNumber)
                    return (
                      <li
                        key={index}
                        style={
                          obj && (item === obj.right_answer)
                            ? { backgroundColor: '#28a745', color: '#fff' }
                            : {}
                        }
                        className={
                          obj && (item === obj.my_answer)
                            ? obj.class
                            : index === indexQuestion ? 'list-group-item active' : 'list-group-item'
                        }
                        onClick={() => addAnswer(item, index)}
                      >
                        {item}
                      </li>
                    )
                  })
                }
              </ul>
              <div className="card-footer p-3">
                <button
                  className='btn btn-outline-info'
                  disabled={selectedQuizNumber < 1}
                  onClick={() => setSelectedQuizNumber(selectedQuizNumber - 1)}
                >
                  Previous
                </button>
                <button
                  className='btn btn-primary'
                  disabled={myAnswer === '' ? true : false}
                  onClick={onSubmit}
                >
                  Submit
                </button>
                <button
                  className='btn btn-outline-info'
                  disabled={data.length === (selectedQuizNumber + 1)}
                  onClick={() => setSelectedQuizNumber(selectedQuizNumber + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
      }
    </>
  )
}
