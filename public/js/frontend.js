window.appConfig = {};
if (window.location.host.indexOf('localhost') == -1) {
    appConfig.env = 'local';
    appConfig.scClientId = '';
    appConfig.scRedirectURI = '';
} else {
    appConfig.env = 'production';
    appConfig.scRedirectURI = '';
}