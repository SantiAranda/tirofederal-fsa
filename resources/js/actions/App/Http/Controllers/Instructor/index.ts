import AgendaController from './AgendaController'
import EvaluacionController from './EvaluacionController'

const Instructor = {
    AgendaController: Object.assign(AgendaController, AgendaController),
    EvaluacionController: Object.assign(EvaluacionController, EvaluacionController),
}

export default Instructor