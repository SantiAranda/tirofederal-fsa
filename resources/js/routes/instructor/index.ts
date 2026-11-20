import agenda from './agenda'
import turnos from './turnos'
import evaluaciones from './evaluaciones'

const instructor = {
    agenda: Object.assign(agenda, agenda),
    turnos: Object.assign(turnos, turnos),
    evaluaciones: Object.assign(evaluaciones, evaluaciones),
}

export default instructor