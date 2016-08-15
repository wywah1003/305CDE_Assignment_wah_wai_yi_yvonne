var Settings = {
    DATA_TYPE : 'jsonp',
    CLIENT_ID : "121510300066-3s6sdrqrv0lsi7umg54oqadd9iv6pd8e.apps.googleusercontent.com",
    SCOPES : "https://www.googleapis.com/auth/userinfo.email",
    RESPONSE_TYPE : "token",
    API_KEY: "yT48TXdoJ_UJyubopa_krXGb"
};

Settings.REDIRECT_URI = "http://localhost:8000";
Settings.OAUTH_URL = "https://accounts.google.com/o/oauth2/auth?scope=" + Settings.SCOPES + "&client_id=" + Settings.CLIENT_ID + "&redirect_uri=" + Settings.REDIRECT_URI + "&response_type=" + Settings.RESPONSE_TYPE + "&approval_prompt=auto";
