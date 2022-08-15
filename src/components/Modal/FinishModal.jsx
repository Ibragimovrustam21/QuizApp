import { Modal } from 'antd'
import React from 'react'

export const FinishModal = ({ amount, results = 0, isModalVisible, setIsModalVisible }) => {

  return (
    <Modal visible={isModalVisible} footer={null} onCancel={() => setIsModalVisible(false)}>
      <h3 className='text-center'>Your results</h3>
      <h2 className='text-center font-bold'>{results} / {amount}</h2>
    </Modal>
  )
}
