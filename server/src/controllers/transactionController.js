import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getTransactions = async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: 'desc' },
    })
    res.json(transactions)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar transações.' })
  }
}

export const createTransaction = async (req, res) => {
  const { description, amount, type, category, date } = req.body

  try {
    const transaction = await prisma.transaction.create({
      data: {
        description,
        amount,
        type,
        category,
        date,
        userId: req.userId,
      },
    })
    res.status(201).json(transaction)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar transação.' })
  }
}

export const deleteTransaction = async (req, res) => {
  const { id } = req.params

  try {
    const transaction = await prisma.transaction.findUnique({ where: { id } })

    if (!transaction || transaction.userId !== req.userId) {
      return res.status(404).json({ error: 'Transação não encontrada.' })
    }

    await prisma.transaction.delete({ where: { id } })
    res.json({ message: 'Transação deletada com sucesso.' })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar transação.' })
  }
}