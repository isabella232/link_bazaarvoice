/**
             * Initialize HTTP and SFTP services for int_bazaarvoice
             */
            
var Site = require('dw/system/Site');
var ServiceRegistry = require('dw/svc/LocalServiceRegistry');
            
//need to have separate sftp services/credentials for each site
var allSites = Site.allSites;
for(var i = 0; i < allSites.length; i++) {
    var siteID = allSites[i].getID();
                
    ServiceRegistry.createService('bazaarvoice.sftp.export.' + siteID, {
        createRequest: function(svc){
            return svc;
        },
        parseResponse: function(svc, result) {
            return result;
        }
    });
                
    ServiceRegistry.createService('bazaarvoice.sftp.import.' + siteID, {
        createRequest: function(svc){
            return svc;
        },
        parseResponse: function(svc, result) {
            return result;
        }
    });
}
            
/**
            *
            * HTTP Services
            *
            */
ServiceRegistry.createService('bazaarvoice.http', {
    createRequest: function(svc){
        svc.setRequestMethod('GET');
        return svc;
    },
    parseResponse: function(svc, client) {
        return client.getText();
    },
    mockCall: function(svc){
        return {
            statusCode: 200,
            statusMessage: 'Success',
            text: 'MOCK RESPONSE (' + svc.URL + ')'
        };
    },
    getResponseLogMessage: function(response) {
        return response.getText() ? response.getText().substr(0, 100) + '\n\n...[no need to log all the content]\n\n' : 'Response is empty.';
    }
});
            
ServiceRegistry.createService('bazaarvoice.http.bot', {
    createRequest: function(svc){
        svc.setRequestMethod('GET');
        return svc;
    },
    parseResponse: function(svc, client) {
        return client.getText();
    },
    mockCall: function(svc){
        return {
            statusCode: 200,
            statusMessage: 'Success',
            text: 'MOCK RESPONSE (' + svc.URL + ')'
        };
    },
    getResponseLogMessage: function(response) {
        return response.getText() ? response.getText().substr(0, 100) + '\n\n...[no need to log all the content]\n\n' : 'Response is empty.';
    }
});