/*
 * Basic responsive mashup template
 * @owner Enter you name here (xxx)
 */
/*
 *    Fill in host and port for Qlik engine
 */


connect();

async function connect() {
    const urlQlikServer = "https://r0737681.eu.qlikcloud.com";
    const urlLoggedIn = "/api/v1/audits";//Use GET request to see if you are authenticated
    const urlLogin = "/login";
    const webIntegrationId = 'BlUqX2Qo2klBoQbuCkbpxheYH4wFswGY';

    //Check to see if logged in
    return await fetch(`${urlQlikServer}${urlLoggedIn}`, {
        credentials: 'include',
        headers: {
            'Qlik-Web-Integration-ID':webIntegrationId
        }
    })
    .then(async function(response)
    {
        //check if user is authenticated; if not, redirect to login page
		if(response.status===401){
            const url = new URL(`${urlQlikServer}/login`);
            url.searchParams.append('returnto', 'https://linked.azurewebsites.net/table');
            url.searchParams.append('qlik-web-integration-id', webIntegrationId);
            window.location.href = url;
        }
    })
    .catch(function(error)
    {
        console.error(error);
    });
}

var config1 = {
    host: "r0737681.eu.qlikcloud.com", //the address of your Qlik Engine Instance
    prefix: "/", //or the virtual proxy to be used. for example "/anonymous/"
    port: 443, //or the port to be used if different from the default port
    isSecure: true, //should be true if connecting over HTTPS
    webIntegrationId: 'BlUqX2Qo2klBoQbuCkbpxheYH4wFswGY' //only needed in SaaS editions and QSEoK
};

require.config( {
    baseUrl: (config1.isSecure ? "https://" : "http://" ) + config1.host + (config1.port ? ":" + config1.port : "") + config1.prefix + "resources",
    webIntegrationId: config1.webIntegrationId
} );

require( ["js/qlik"], function ( qlik ) {

	qlik.on( "error", function ( error ) {
		$( '#popupText' ).append( error.message + "<br>" );
		$( '#popup' ).fadeIn( 1000 );
	} );
	$( "#closePopup" ).click( function () {
		$( '#popup' ).hide();
	} );

	//open apps -- inserted here --
	var app = qlik.openApp("6130a3fe-31d1-4991-be09-2c74dced71f8", config1);
	//grafiek besmetingen/dooden in een land
	app.getObject('vooruitgang', 'RLsbpZ');
    //grafiek hoeveel ziekenhuis bedden per 1.000.000 inwooners
    app.getObject('lkstatus', 'jbJzeP');
    //aantal besmetingen per 1.000.000
    app.getObject('lkbedrijf', 'eptVBK');
    //wereld kaart met mediaan leeftijd op
    app.getObject('infobedrijf', 'qHmRjW');
    //vervoer per land
    app.getObject('producten', 'mwbQ');
    //geselecteerd land voor vervoer
    app.getObject('actievelk', 'rhdp');
    //belgie teggen over de rest
    app.getObject('filter', 'mmRtMM');

    app.getObject('reload', 'mGTxmZQ');

	$("#ClearAll").click(function() {
	app.clearAll();
      });

} );
