import express from 'express'
import { 
    authUser, 
    deleteUser, 
    getUsers, 
    getUserById,
    getUserProfile, 
    registerUser, 
    updateUser,
    updateUserProfile } from '../controllers/user.js'
import { isAdmin, requireAuth } from '../middleware/auth.js'

const router = express.Router()

router.route('/').get(requireAuth, isAdmin, getUsers).post(registerUser)
router.post('/signin', authUser)
router.route('/profile').get(requireAuth, getUserProfile).put(requireAuth, updateUserProfile)
router.route('/:id')
    .delete(requireAuth, isAdmin, deleteUser)
    .get(requireAuth, isAdmin, getUserById)
    .put(requireAuth, isAdmin, updateUser)
export default router