window.appConfig = {};
if (window.location.host.indexOf('localhost') == -1) {
    appConfig.env = 'production';
    appConfig.context = 'dtg.jit.su';
    appConfig.scClientId = 'b60ac37afa8549e97f3d5e7d0fce15f5';
    appConfig.scRedirectURI = 'http://localhost:8087/callback.html';
} else {
    appConfig.env = 'local';
    appConfig.context = 'localhost:8087';
    appConfig.scClientId = 'b60ac37afa8549e97f3d5e7d0fce15f5';
    appConfig.scRedirectURI = 'http://localhost:8087/callback.html';
}