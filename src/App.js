import { useState, useEffect } from 'react';
import { Navigate } from 'react-router';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { EnterQuiz } from './components/EnterQuiz/EnterQuiz';
import { Quiz } from './components/Quiz/Quiz';
import { Navbar } from './components/Navbar/Navbar'
import { FinishModal } from './components/Modal/FinishModal';
import 'antd/dist/antd.css';

export const App = () => {
  const [amount, setAmount] = useState(localStorage.getItem('amount') || 10)
  const [selectedQuizNumber, setSelectedQuizNumber] = useState(0)
  const [answerArray, setAnswerArray] = useState([])
  const [overallBall, setOverallBall] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [finishTest, setFinishTest] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
    setFinishTest(true)
    setAnswerArray([])
    setSelectedQuizNumber(0)
  }

  useEffect(() => {
    localStorage.setItem('amount', amount)
  }, [amount])


  return (
    <div className='container-fluid px-1'>
      <BrowserRouter>
        <Navbar
          selectedQuizNumber={selectedQuizNumber}
          amount={amount}
          showModal={showModal}
          answerArray={answerArray}

        />
        <FinishModal
          amount={amount}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          results={overallBall.length}
        />
        <Routes>
          <Route index element={<EnterQuiz setAmount={setAmount} setFinishTest={setFinishTest} />} />
          <Route
            path='quiz'
            element={
              <Quiz
                amount={amount}
                selectedQuizNumber={selectedQuizNumber}
                setSelectedQuizNumber={setSelectedQuizNumber}
                overallBall={overallBall}
                setOverallBall={setOverallBall}
                answerArray={answerArray}
                setAnswerArray={setAnswerArray}
                finishTest={finishTest}
              />
            }
          />
          <Route path="*" element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

