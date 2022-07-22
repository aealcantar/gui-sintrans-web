// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: {
   // mssintetransUnidad: 'http://localhost:8082/mssintetrans-unidad/v1/unidades',
    mssintetransVehiculosEnajenacion: 'http://localhost:8084/mssintetrans-vehiculos/enajenacion/',
    mssintetransUsuario:'http://localhost:8083/mssintetrans-usuario/usuarios',
    mssintetransRol:'http://localhost:8083/mssintetrans-usuario/roles',
    mssintetransOoad:'http://localhost:8083/mssintetrans-usuario/ooad',
    mssintetransUsuarioUnidad:'http://localhost:8083/mssintetrans-usuario/unidades',
    mssintetransOauth: 'http://localhost:8080/mssintetrans-oauth/api',
    mssintetransUnidad: 'http://localhost:8082/mssintetrans-unidad/unidades',
    mssintetransCodigoPostal: 'http://localhost:8082/mssintetrans-unidad/codigo-postal',
    mssintetransCatalogoOoad: 'http://localhost:8082/mssintetrans-unidad/ooad',
    mssintetransTarjetaElectronica: 'http://localhost:8085/mssintetrans-tarjetas-electronicas/tarjetas/',
    mssintetransVehiculosPropios: 'http://localhost:8084/mssintetrans-vehiculos/propios',
    mssintetransChoferes: 'http://localhost:8087/mssintetrans-choferes/choferes'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
