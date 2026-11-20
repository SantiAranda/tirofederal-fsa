import AgendaController from './AgendaController'
import CalendarioController from './CalendarioController'
import EvaluacionController from './EvaluacionController'

const Instructor = {
    AgendaController: Object.assign(AgendaController, AgendaController),
    CalendarioController: Object.assign(CalendarioController, CalendarioController),
    EvaluacionController: Object.assign(EvaluacionController, EvaluacionController),
}

export default Instructor