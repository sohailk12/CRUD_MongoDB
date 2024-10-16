import express from 'express';

import { readData, addData, updateData, deleteData,errorMsg, readSingleData } from './controller.js';

const router = express.Router();

router.get('/',readData);

router.get('/verify',readSingleData);

router.post('/',addData);

router.put('/:id',updateData);

router.delete('/:id',deleteData);

router.get('/*',errorMsg)

export default router;
