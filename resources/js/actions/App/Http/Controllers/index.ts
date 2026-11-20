import PublicController from './PublicController'
import Socio from './Socio'
import Admin from './Admin'
import Instructor from './Instructor'
import Settings from './Settings'

const Controllers = {
    PublicController: Object.assign(PublicController, PublicController),
    Socio: Object.assign(Socio, Socio),
    Admin: Object.assign(Admin, Admin),
    Instructor: Object.assign(Instructor, Instructor),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers