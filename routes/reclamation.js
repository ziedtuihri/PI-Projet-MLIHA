import express from 'express';
import {  addOnce, getAll, getOnce, updateOne, deleteOne, updateField }
from '../controllers/reclamation.js';
  
const router = express.Router();

router
  .route('/')
  .post(addOnce)
  .get(getAll);

router
  .route('/:idClient')
  .get(getOnce);

  router
  .route('/:id')
  .put(updateOne)
  .delete(deleteOne)
  .patch(updateField);
  
export default router;