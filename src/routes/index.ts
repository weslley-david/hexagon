import { Router } from "express";
import guardianRoutes from "./modules/guardian";
import clientRoutes from "./modules/client";
import client_GuardianRoutes from "./modules/clientGuardian";
import councilRoutes from "./modules/council";
import specialtyRoutes from "./modules/specialty";
import specialistRoutes from "./modules/specialist";
import client_SpecialistRoutes from "./modules/clientSpecialist";
import specialist_CouncilRoutes from "./modules/specialistCouncil";
import specialist_SpecialtyRoutes from "./modules/specialistSpecialty";
import domainRoutes from "./modules/domain";
import testRoutes from "./modules/test";
import questionRoutes from "./modules/question";
import question_DomainRoutes from "./modules/questionDomain";
import itemRoutes from "./modules/item";
import question_Sugestion from "./modules/questionSugestion";
import avaliationRoutes from "./modules/avaliation";
import answerRoutes from "./modules/answer";

const router = Router()

router.use('/guardian', guardianRoutes)
router.use('/client', clientRoutes)
router.use('/clientguardian', client_GuardianRoutes)
router.use('/clientspecialist', client_SpecialistRoutes)
router.use('/specialistcouncil', specialist_CouncilRoutes)
router.use('/council', councilRoutes)
router.use('/specialty', specialtyRoutes)
router.use('/specialist', specialistRoutes)
router.use('/specialistspecialty', specialist_SpecialtyRoutes)
router.use('/domain', domainRoutes)
router.use('/test', testRoutes)
router.use('/question', questionRoutes)
router.use('/questiondomain', question_DomainRoutes)
router.use('/item', itemRoutes)
router.use('/questionsugestion', question_Sugestion)
router.use('/avaliation', avaliationRoutes)
router.use('/answer', answerRoutes)
export default router