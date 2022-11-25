import express from 'express'
import { login, signup, users, updateuser } from '../Controllers/auth.js';
import { askquestion, deletequestion, getquestion, votequestion } from '../Controllers/question.js';
import { postanswer, deleteanswer } from '../Controllers/answer.js'
import auth from '../middlewares/auth.js';
const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.post('/askquestion', askquestion)
router.get('/getquestion', getquestion)
router.patch('/postanswer/:id', postanswer)
router.delete(`/deletequestion/:id`, deletequestion)
router.patch(`/deleteanswer/:id`, deleteanswer)
router.patch(`/vote/:id`, votequestion)
router.get(`/users`, users)
router.patch(`/update/:id`, updateuser)
export default router