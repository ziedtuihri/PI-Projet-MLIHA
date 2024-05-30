import express from 'express';

import { getAll, addOnce, getOnce,
    putAll, patchOnce, deleteOnce } from '../controllers/categorieclient.js';


const router = express.Router();

//Déclarer d'abord la route, puis toutes les méthodes dessus (préfixe spécifié dans server.js)
router.route('/')
router.post('/',addOnce)
router.get('/',getOnce);


router
  .route('/:id')
  .get(getOnce)
//   .put(putOnce)
  .patch(patchOnce)
  .delete(deleteOnce);


export default router;