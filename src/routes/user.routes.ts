import { Router } from 'express';
import { User } from '../models/userModel';

const router = Router();

router.get('/users', async (req, res) => {
    try {
        const user = await User.findOne(); // Replace with actual user fetching logic
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }else{
            res.status(200).json(user);
        }

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
})

export default router;



