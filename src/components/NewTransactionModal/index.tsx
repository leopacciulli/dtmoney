import React, { useState } from 'react'
import Modal from 'react-modal'
import { useTransactions } from '../../hooks/useTransactions'

import income from '../../assets/income.svg'
import outcome from '../../assets/outcome.svg'
import close from '../../assets/close.svg'

import { Container, RadioBox, TransactionTypeContainer } from './styles'

interface NewTransactionModalProps {
  isOpen: boolean
  onRequestClose: () => void
}

export const NewTransactionModal: React.FC<NewTransactionModalProps> = ({
  isOpen,
  onRequestClose
}) => {
  const { createTransaction } = useTransactions()

  const [type, setType] = useState('deposit')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState(0)

  const handleCreateNewTransaction = async (e: React.FormEvent) => {
    e.preventDefault()

    await createTransaction({
      type,
      title,
      category,
      amount
    })

    setTitle('')
    setCategory('')
    setAmount(0)
    setType('deposit')
    onRequestClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button type="button">
        <img
          src={close}
          alt="Fechar"
          onClick={onRequestClose}
          className="react-modal-close"
        />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input 
          type="text"
          placeholder="Título"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />

        <input 
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={event => setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setType('deposit')}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src={income} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => setType('withdraw')}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcome} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input 
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={event => setCategory(event.target.value)}
        />

        <button
          type="submit"
        >
          Cadastrar
        </button>
      </Container>
    </Modal>
  )
}