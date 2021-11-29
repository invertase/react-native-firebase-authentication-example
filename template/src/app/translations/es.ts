import {translation} from './index';
require('dayjs/locale/es');

export const spanish: translation = {
  loading: 'Cargando',
  forgotPassword: 'Olvidó Contrasena?',
  createAnAccount: 'Crea una Cuenta',
  phoneSignIn: 'Entra con número de móvil',
  phoneSignInTitle: 'Entra con Número de Móvil',
  signIn: 'Entra',

  gettingStarted: 'Como Empezar',
  userInfo: 'Usuario',
  settings: 'Configuración',

  createAccountError: 'Crea Cuenta - Error',
  createAccountPasswordsDifferent: 'Las contraseñas son diferente',
  createAccountInstructions:
    'Crea una cuenta con su correo electrónico y contraseña. Una vez creada, entrará automáticamente en su perfil:',
  emailLabel: 'Correo Electrónico',
  passwordLabel: 'Contraseña',
  createAccountPasswordConfirmLabel: 'Confirma Contraseña',
  passwordsDoNotMatch: 'Contraseñas no estan de acuerdo',
  createAccountCreating: 'Creando Cuenta',
  createAccountCreate: 'Crea Cuenta',

  forgotPasswordInstructions:
    'Entra su correo electrónico debajo para enviar un email para reestablecer su contraseña',
  forgotPasswordLabel: 'Correo Electrónico',
  forgotPasswordError: 'Olvodó Password - Error',
  forgotPasswordSuccess:
    'Compruebe su correo electrónico para ver las instrucciones de restablecimiento de la contraseña',
  forgotPasswordSending: 'Enviando correo',
  forgotPasswordSend: 'Envia Correo',

  phoneAuthError: 'Entra con Número de Móvil Error',
  phoneVerificationError: 'Error con Verificación de Móvil',
  phoneVerificationCode: 'Código de Verificación',
  phoneVerificationConfirm: 'Confirma',
  phoneVerificationCountryInstructions: 'Marca para elegir pais de telefono',
  phoneVerificationNumberInstructions: 'Entra su número de móvil:',
  phoneVerificationNumberLabel: 'Número de Móvil',
  phoneVerificationNumberSubmit: 'Entra',

  signInError: 'Entrar - Error',
  signInSigningIn: 'Entrando',
  signInSignIn: 'Entra',

  profileLastSignIn: 'Último ingreso',

  userUpdateError: 'Error Actualizando Usuario',
  userPasswordChanged: 'Contraseña cambiada con éxito',
  userEmailVerify: 'Re-enviar',
  userEmailVerification: 'Verificación',
  userEmailVerificationInstructions1:
    'Se ha enviado un correo electrónico de verificación a',
  userEmailVerificationInstructions2:
    'Siga las instrucciones para verificar su dirección de correo electrónico',
  userEmailVerificationBanner:
    'Por favor, verifique su dirección de correo electrónico para utilizar todas las funciones de esta aplicación. Haz clic en el botón de abajo para reenviar un correo electrónico de verificación',
  userDisplayLabel: 'Configuración',
  userNameDisplayLabel: 'Nombre para mostrar',
  userNameDisplayInstructions:
    'Establecer un nombre de visualización para un saludo personalizado',
  userNameDisplaySave: 'Guardar',
  userPasswordUpdateLabel: 'Actualiza Contraseña:',
  userPasswordInstructions:
    'Actualice la contraseña de su cuenta. Por razones de seguridad, introduzca la contraseña actual de su cuenta',
  userPasswordCurrent: 'Contraseña Actual',
  userPasswordNew: 'Contraseña Nueva',
  userPasswordConfirm: 'Contraseña Nueva Confirmada',
  userPasswordUpdate: 'Cambie',
  userSignOut: 'Salir',
};
