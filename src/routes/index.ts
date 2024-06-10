import { Router } from "express";
import guardianRoutes from "./modules/guardian";
import clientRoutes from "./modules/client";
import specialistRoutes from "./modules/specialist";
import question_Sugestion from "./modules/questionSugestion";
import avaliationRoutes from "./modules/avaliation";
import atecRoutes from "./modules/atec";
import relationRoutes from "./modules/relation";

const router = Router()

router.use('/guardian', guardianRoutes)
router.use('/client', clientRoutes)
router.use('/specialist', specialistRoutes)
router.use('/questionsugestion', question_Sugestion)
router.use('/avaliation', avaliationRoutes)
router.use('/relation', relationRoutes)
router.use('/atec', atecRoutes)

export default router