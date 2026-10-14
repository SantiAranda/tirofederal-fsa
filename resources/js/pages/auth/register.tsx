import { Form, Head, usePage } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';

type Props = {
    passwordRules: string;
};

export default function Register({ passwordRules }: Props) {
    const { csrf_token } = usePage<{ csrf_token?: string }>().props;

    return (
        <>
            <Head title="Registro de Socio - Tiro Federal Formosa" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        {csrf_token && <input type="hidden" name="_token" value={csrf_token} />}

                        <div className="grid gap-5">
                            {/* Sección: Datos Personales */}
                            <div className="border-b pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                1. Datos Personales
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Nombre *</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="given-name"
                                        name="name"
                                        placeholder="Ej: Juan Carlos"
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="apellido">Apellido *</Label>
                                    <Input
                                        id="apellido"
                                        type="text"
                                        required
                                        tabIndex={2}
                                        autoComplete="family-name"
                                        name="apellido"
                                        placeholder="Ej: Pérez"
                                    />
                                    <InputError message={errors.apellido} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="dni">DNI *</Label>
                                    <Input
                                        id="dni"
                                        type="text"
                                        required
                                        tabIndex={3}
                                        name="dni"
                                        placeholder="Ej: 35123456"
                                        pattern="[0-9]*"
                                    />
                                    <InputError message={errors.dni} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="fecha_nacimiento">Fecha de nacimiento *</Label>
                                    <Input
                                        id="fecha_nacimiento"
                                        type="date"
                                        required
                                        tabIndex={4}
                                        name="fecha_nacimiento"
                                    />
                                    <InputError message={errors.fecha_nacimiento} />
                                </div>
                            </div>

                            {/* Sección: Contacto y Domicilio */}
                            <div className="border-b pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                2. Contacto y Domicilio
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="telefono">Número de teléfono *</Label>
                                    <Input
                                        id="telefono"
                                        type="tel"
                                        required
                                        tabIndex={5}
                                        autoComplete="tel"
                                        name="telefono"
                                        placeholder="Ej: 3704123456"
                                    />
                                    <InputError message={errors.telefono} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="domicilio">Domicilio completo *</Label>
                                    <Input
                                        id="domicilio"
                                        type="text"
                                        required
                                        tabIndex={6}
                                        autoComplete="street-address"
                                        name="domicilio"
                                        placeholder="Ej: Av. 25 de Mayo 1234, Formosa"
                                    />
                                    <InputError message={errors.domicilio} />
                                </div>
                            </div>

                            {/* Sección: Cuenta de Usuario */}
                            <div className="border-b pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                3. Cuenta de Acceso
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="usuario">Nombre de usuario *</Label>
                                    <Input
                                        id="usuario"
                                        type="text"
                                        required
                                        tabIndex={7}
                                        autoComplete="username"
                                        name="usuario"
                                        placeholder="Entre 6 y 30 caracteres alfanuméricos"
                                        minLength={6}
                                        maxLength={30}
                                    />
                                    <span className="text-[11px] text-muted-foreground">
                                        De 6 a 30 caracteres (solo letras y números).
                                    </span>
                                    <InputError message={errors.usuario} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Correo electrónico *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        tabIndex={8}
                                        autoComplete="email"
                                        name="email"
                                        placeholder="ejemplo@correo.com"
                                    />
                                    <InputError message={errors.email} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Contraseña *</Label>
                                    <PasswordInput
                                        id="password"
                                        required
                                        tabIndex={9}
                                        autoComplete="new-password"
                                        name="password"
                                        placeholder="Mínimo 8 caracteres"
                                        passwordrules={passwordRules}
                                    />
                                    <span className="text-[11px] text-muted-foreground">
                                        Mín. 8 caracteres, números y caracteres especiales, sin espacios.
                                    </span>
                                    <InputError message={errors.password} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation">Confirmar contraseña *</Label>
                                    <PasswordInput
                                        id="password_confirmation"
                                        required
                                        tabIndex={10}
                                        autoComplete="new-password"
                                        name="password_confirmation"
                                        placeholder="Repita su contraseña"
                                        passwordrules={passwordRules}
                                    />
                                    <InputError message={errors.password_confirmation} />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 w-full"
                                tabIndex={11}
                                data-test="register-user-button"
                            >
                                {processing && <Spinner className="mr-2" />}
                                Registrarme en Tiro Federal Formosa
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            ¿Ya posees una cuenta de socio?{' '}
                            <TextLink href={login()} tabIndex={12}>
                                Iniciar sesión
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

Register.layout = {
    title: 'Registro de Socio',
    description: 'Complete sus datos identificatorios y de contacto según el reglamento institucional',
};
