import { Router } from 'express'
import { getTransactions, createTransaction, deleteTransaction } from '../controllers/transactionController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = Router()

router.use(authMiddleware)

router.get('/', getTransactions)
router.post('/', createTransaction)
router.delete('/:id', deleteTransaction)

export default router