import CluController from './CluController'
import DashboardController from './DashboardController'
import SocioController from './SocioController'
import MembresiaController from './MembresiaController'
import InstructorController from './InstructorController'
import InsumoController from './InsumoController'
import PagoController from './PagoController'
import EventoController from './EventoController'
import NoticiaController from './NoticiaController'

const Admin = {
    CluController: Object.assign(CluController, CluController),
    DashboardController: Object.assign(DashboardController, DashboardController),
    SocioController: Object.assign(SocioController, SocioController),
    MembresiaController: Object.assign(MembresiaController, MembresiaController),
    InstructorController: Object.assign(InstructorController, InstructorController),
    InsumoController: Object.assign(InsumoController, InsumoController),
    PagoController: Object.assign(PagoController, PagoController),
    EventoController: Object.assign(EventoController, EventoController),
    NoticiaController: Object.assign(NoticiaController, NoticiaController),
}

export default Admin