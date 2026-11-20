import DashboardController from './DashboardController'
import PerfilController from './PerfilController'
import TurnoController from './TurnoController'
import PagoController from './PagoController'
import EventoController from './EventoController'
import EvaluacionController from './EvaluacionController'

const Socio = {
    DashboardController: Object.assign(DashboardController, DashboardController),
    PerfilController: Object.assign(PerfilController, PerfilController),
    TurnoController: Object.assign(TurnoController, TurnoController),
    PagoController: Object.assign(PagoController, PagoController),
    EventoController: Object.assign(EventoController, EventoController),
    EvaluacionController: Object.assign(EvaluacionController, EvaluacionController),
}

export default Socio