import {translation} from './index';
require('dayjs/locale/es');

export const spanish: translation = {
  loading: 'Cargando',
  Success: 'Éxito',
  OK: 'OK',
  forgotPassword: 'Olvidó Contrasena?',
  createAnAccount: 'Crea una Cuenta',
  phoneSignIn: 'Entra con número de móvil',
  phoneSignInTitle: 'Entra con Número de Móvil',
  signIn: 'Entra',

  home: 'Inicio',
  NotFound: 'Página No encontrada',
  PageNotFoundText: '¡Oh, no! Esta página no existe.',
  gettingStarted: 'Como Empezar',
  userInfo: 'Usuario',
  settings: 'Configuración',

  createAccountError: 'Crea Cuenta - Error',
  createAccountPasswordsDifferent: 'Las contraseñas son diferente',
  createAccountInstructions:
    'Crea una cuenta con su correo electrónico y contraseña. Una vez creada, entrará automáticamente en su perfil.',
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
  forgotPasswordSending: 'Enviando correo',
  forgotPasswordSend: 'Envia Correo',

  phoneVerificationCode: 'Código de Verificación',
  phoneVerificationConfirm: 'Confirma',
  phoneVerificationCountryInstructions: 'Marca para elegir pais de telefono',
  phoneVerificationNumberInstructions: 'Entra su número de móvil:',
  phoneVerificationNumberLabel: 'Número de Móvil',
  phoneVerificationNumberSubmit: 'Entra',

  signInSigningIn: 'Entrando',
  signInSignIn: 'Entra',

  profileLastSignIn: 'Último ingreso',

  userUpdateError: 'Error Actualizando Usuario',
  userEmailVerify: 'Re-enviar',
  userEmailVerification: 'Verificación',
  userEmailVerificationInstructions1:
    'Se ha enviado un correo electrónico de verificación a',
  userEmailVerificationInstructions2:
    'Siga las instrucciones para verificar su dirección de correo electrónico',
  userEmailVerificationBanner:
    'Por favor, verifique su dirección de correo electrónico para utilizar todas las funciones de esta aplicación. Haz clic en el botón re-enviar de abajo para re-enviar un correo electrónico de verificación. Si ya ha verificado, toca el botón re-verificar para actualizar su estado en la app.',
  userEmailVerifyTitle: 'Verifificación de correo',
  userEmailVerificationSuccess:
    'Ha verificado su dirección de correo electrónico con éxito.',
  userEmailVerificationFailure:
    'Se parece que su correo no esta verificado. Intenta re-enviar el correo otra vez y sigue las instrucciones en el correo.',
  userEmailVerificationVerifyButton: 'Re-verify',
  userDisplayLabel: 'Configuración',
  userNameDisplayLabel: 'Nombre para mostrar',
  userNameDisplayInstructions:
    'Establecer un nombre de visualización para un saludo personalizado.',
  userNameDisplaySave: 'Guardar',
  userNameDisplayUpdatedTitle: 'Nombre para mostrar Cambiado',
  userNameDisplayUpdateMessage: 'Su nombre para mostrar ya esta cambiado',
  userPasswordUpdateLabel: 'Actualiza Contraseña:',
  userPasswordInstructions:
    'Actualice la contraseña de su cuenta. Por razones de seguridad, introduzca la contraseña actual de su cuenta',
  userPasswordCurrent: 'Contraseña Actual',
  userPasswordNew: 'Contraseña Nueva',
  userPasswordConfirm: 'Contraseña Nueva Confirmada',
  userPasswordUpdate: 'Cambie',
  userSignOut: 'Salir',

  // Google auth messages
  googleAuthErrorTitle: 'Error con Google',
  googleAuthCancelled: 'Google autenticación cancelado.',
  googleAuthInProgress: 'La autenticación de Google ya está en marcha.',
  googleAuthPlayServices:
    'La autenticación de Google requiere los servicios de Google Play.',
  googleAuthConfigError:
    'Google Auth no se ha configurado correctamente para esta aplicación.',
  // TODO get catalog of google error messages and translate them

  // Facebook auth messages
  facebookAuthErrorTitle: 'Error con Facebook',
  facebookAuthCancelled: 'Facebook autenticación cancelado.',
  facebookAuthErrorMessage:
    'No obtenemos token de acceso por parte de Facebook.',
  // TODO get catalog of facebook error messages and translate them

  // Apple auth messages
  appleAuthErrorTitle: 'Error con Apple Auth',
  appleAuthErrorMessage: 'No obtenemos un token de identidad desde Apple.',
  // TODO get catalog of Apple auth error codes and translate them

  // Firebase auth error messages
  unknownError:
    'Se ha producido un error inesperado. por favor, inténtelo de nuevo',
  'invalid-session': 'Sesión inválida',
  'invalid-session-message':
    'No has iniciado sesión, ingresa de nuevo por favor',
  'registration-error': 'Error de registro',
  'user-created': 'Usuario registrado',
  'user-created-message': 'Usuario nuevo registrado con éxito',
  'change-password-email': 'Vínculo enviado para cambio de contraseña',
  'change-password-email-message':
    'Revisa tu correo y cambia la contraseña a través del link que te acabamos de enviar',
  'change-password-email-error':
    'Error al enviar correo para cambio de contraseña',
  'change-password-email-error-message':
    'Disculpa, ha habido un error enviando el correo para cambiar tu contraseña. Por favor rectifica tu correo para cambiar tu contraseña e intenta ingresar de nuevo.',
  'change-password-error': 'Error al cambiar contraseña',
  'change-password-successful': 'Constraseña actualizada',
  'change-password-successful-message':
    'Has cambiado tu contraseña con éxito. Por favor intenta ingresar con tu nueva contraseña.',
  'logout-error': 'Error cerrando sesión',
  'login-error': 'Error iniciando sesión',
  'email-send': 'Email de verificación enviado',
  'email-send-message': 'Hemos enviado un nuevo link para verificar tu cuenta',
  'email-send-error': 'Error verificando Email',
  'email-not-verified': 'Email no verificado',
  'email-not-verified-message':
    'Estimado usuario, tu email aún no ha sido verificado',
  'email-verified': 'Email verificado',
  'email-verified-message': 'Tu email ha sido verificado con éxito',
  'phone-link-error': 'Error verificando dispositivo',
  'phone-verify-error': 'Error verificando dispositivo',
  'phone-auth-error':
    'Debes ingresar tu número completo con el código de país, ej: +59398111xxxx',
  'phone-code-sent': 'Código SMS Enviado',
  'phone-code-sent-message':
    'El código SMS para verificar tu dispositivo fue enviado con éxito',
  'phone-code-auto': 'Código SMS recibido',
  'phone-code-auto-message':
    'El código SMS para verificar tu dispositivo fue recibido con éxito',
  'phone-link-success': 'Dispositivo verificado',
  'phone-link-success-message': 'Tu dispositivo ha sido verificado con éxito',
  'auth/firebase-auth':
    'Esta applicación solo funciona en dispositivos con Google Play Services',
  'auth/app-not-authorized':
    'Esta applicación no tiene permiso para servicios de autenticación. Contacte servicio al cliente.',
  'auth/captcha-check-failed':
    'Error en control de CAPTCHA. Por favor espere un momento e intente de nuevo',
  'auth/credential-already-in-use':
    'Su dispositivo ya está en uso. Elija otro o contáctenos para solucionar.',
  'auth/session-expired': 'Sesión caducado, por favor intente de nuevo',
  'auth/invalid-action-code': 'Código caducado, por favor intente de nuevo',
  'auth/code-expired': 'Código caducado, por favor intente de nuevo',
  'auth/network-request-failed':
    'Problema con la red, por favor intente de nuevo',
  'auth/expired-action-code':
    'Código usado o malformado, por favor intente de nuevo',
  'auth/invalid-phone-number': 'Formato incorrecto de número de teléfono',
  'auth/provider-already-linked':
    'Ya verificó con este método de inicio de sesión',
  'auth/invalid-verification-code':
    'El código SMS que ha entrado es inválido. Enviar de nuevo por favor',
  'auth/invalid-verification-id':
    'El código SMS que ha entrado es inválido. Enviar de nuevo por favor',
  'auth/invalid-email': 'Formato incorrecto de email',
  'auth/email-already-in-use':
    'Este email ya está en uso. Por favor elija otro email o haga clik en "Olvido contraseña',
  'auth/quota-exceeded':
    'Esta applicación ha superado cuota de SMS. Por favor contacte servicio al cliente',
  'auth/user-disabled': 'Esta cuenta ha sido desactivada',
  'auth/user-not-found': 'Email o contraseña incorrecta',
  'auth/unknown':
    'Disculpe, ha ocurrido un problema con su solicitud. Usualmente significa que necesita esperar unos minutos e intentar de nuevo',
  'auth/wrong-password': 'Email o contraseña incorrecta',
  'auth/weak-password': 'LA contraseña debe tener mínimo 6 carácteres',
  'auth/too-many-requests':
    'Demasiado códigos pedidos demasiado rápido. Por favor espere un rato y intente de nuevo más tarde.',
  'auth/invalid-credential':
    'Error en validación. Por favor cierre la app, ábrela de nuevo, y re-intentar',
};
