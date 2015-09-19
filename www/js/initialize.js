var devices = null
var report = null
var typoptions = [
	[
		"Annunciator",
		"Battery",
		"Bell",
		"CO Detector",
		"Combo Detector",
		"Door Holder",
		"FACP",
		"Fire Pump Control",
		"Flow Switch",
		"Heat Detector",
		"Horn",
		"Horn Strobe",
		"Addressable Module",
		"Monitor Module",
		"Relay Module",
		"Remote LED",
		"Pull Station",
		"Smoke Detector",
		"Duct Smoke Detector",
		"Speaker",
		"Speaker Strobe",
		"Strobe",
		"Tamper Switch",
		"Low Pressure Switch",
		"Fire Pump Deficiency",
		"Sprinkler Deficiency"
	],
	[]
]
var vicoptions = []
var address_options = []
var zone_options = []
var gen_device_type = []
gen_device_type[ "audios" ] = []
gen_device_type[ "detectors" ] = []
gen_device_type[ "modules" ] = []
gen_device_type[ "switches" ] = []
gen_device_type[ "visuals" ] = []
var devices_chart_total = null
var devices_chart_type = null
var devices_chart_type_abs = null
var data_total = null
var data_devices_type = null
var data_devices_abs = null
var printed = false


$( window ).load( function () {

} )

$( document ).ready( function () {
	$.getJSON( "assets/DEMO.json", function ( json ) {
		report = json[ 0 ]
		devices = json[ 1 ]
		loadThaDATA()
	} )
} )


function loadThaDATA() {
		initializeReport()
		prep_Model_Options()
		initializeData()
	}
	// document.getElementById('load').addEventListener('click', loadThaDATA, false);




function loadFile( evt ) {
	var files = evt.target.files; // FileList object

	for ( var i = 0, f; f = files[ i ]; i++ ) {
		var reader = new FileReader();

		reader.onload = ( function ( theFile ) {

			var ext = theFile.name.substr( ( Math.max( 0, theFile.name.lastIndexOf( "." ) ) || Infinity ) + 1 )
			if ( ext != 'json' ) {
				alert( "Incorrect File Extention!!!" )
			} else {
				return function ( e ) {
					var pars = JSON.parse( e.target.result )
					report = pars[ 0 ]
					devices = pars[ 1 ]
				};
			}

		} )( f );
		reader.readAsText( f );
	}

	window.setTimeout( function () {
		if ( devices && report ) {
			// $('#load').removeClass('disabled').removeClass('btn-danger').addClass('btn-success')
			initializeReport()
			prep_Model_Options()
			initializeData()
		}
	}, 250 );

}
document.getElementById( 'file' ).addEventListener( 'change', loadFile, false );




function loadOtherFile() {
	if ( window.confirm( "Are you sure you want to open new file?\n\nAll changes made without saving will be lost!" ) ) {
		location.reload()
	}
}
document.getElementById( 'btn_open' ).addEventListener( 'click', loadOtherFile, false );




window.onerror = function ( msg, url, linenumber ) {
	alert( 'Error message - ' + msg + '\nURL - ' + url + '\nLine Number - ' + linenumber + "\n\nTELL ROB OF THIS HORIBLE NEWS!!!" )
}





function testScript() {

	}
	// document.getElementById('btn_test').addEventListener('click', testScript, false);






















function printFile( evt ) {



	$( '#list_devices_chart_abs' ).empty()
	// $( "#ve_def" ).empty()
	data_devices_abs = []
	gen_device_type[ "audios" ] = []
	gen_device_type[ "detectors" ] = []
	gen_device_type[ "modules" ] = []
	gen_device_type[ "switches" ] = []
	gen_device_type[ "visuals" ] = []
	typoptions[ 1 ] = []
	var devices_length = 0


	var yrz = new Date().getFullYear()
	document.title = ( report[ 12 ][ 1 ] + " - " + report[ 13 ][ 1 ] + " - " + report[ 4 ][ 8 ] + " - " + yrz ).replace( /\./g, "" ).replace( "%", "" ).replace( "#", "" ).replace( "$", "" ).replace( "&", "" ).replace( "*", "" );






	// ------------------------------------------------------------
	// ------------------------------------------------------------
	// ------------------------------------------------------------
	// ------------------------------------------------------------
	// ------------------------------------------------------------
	// - modules and switches add to one category called modules
	// - add numbers to license
	// ------------------------------------------------------------
	// ------------------------------------------------------------
	// ------------------------------------------------------------
	// ------------------------------------------------------------
	// ------------------------------------------------------------

	for ( var i = 0; i < devices.length; i++ ) {
		if ( !devices[ i ][ 10 ] == true ) {
			if ( devices[ i ][ 0 ].indexOf( "Bell" ) > -1 ) {
				gen_device_type[ "audios" ] = gen_device_type[ "audios" ] + 1
			} else if ( devices[ i ][ 0 ].indexOf( "Horn" ) > -1 ) {
				gen_device_type[ "audios" ] = gen_device_type[ "audios" ] + 1
			} else if ( devices[ i ][ 0 ].indexOf( "Speaker" ) > -1 ) {
				gen_device_type[ "audios" ] = gen_device_type[ "audios" ] + 1
			}

			if ( devices[ i ][ 0 ].indexOf( "Detector" ) > -1 ) {
				gen_device_type[ "detectors" ] = gen_device_type[ "detectors" ] + 1
			}

			if ( devices[ i ][ 0 ].indexOf( "Module" ) > -1 ) {
				gen_device_type[ "modules" ] = gen_device_type[ "modules" ] + 1
			}

			if ( devices[ i ][ 0 ].indexOf( "Switch" ) > -1 ) {
				gen_device_type[ "switches" ] = gen_device_type[ "switches" ] + 1
			}

			if ( devices[ i ][ 0 ].indexOf( "Strobe" ) > -1 ) {
				gen_device_type[ "visuals" ] = gen_device_type[ "visuals" ] + 1
			}



			var ind = typoptions[ 0 ].indexOf( devices[ i ][ 0 ] )
			if ( !typoptions[ 1 ][ ind ] ) {
				typoptions[ 1 ][ ind ] = 0
			}
			typoptions[ 1 ][ ind ] = typoptions[ 1 ][ ind ] + 1

			devices_length = devices_length + 1
		}
	}




	var devices_failed = devices_fail.length
	var devices_passed = devices_length - devices_failed

	$( '.devices_total' ).text( devices_length )
	$( '.devices_fail_perc' ).text( Math.round( ( devices_failed / devices_length ) * 100 ) )
	$( '.devices_pass_perc' ).text( Math.round( ( devices_passed / devices_length ) * 100 ) )
	$( '.devices_pass' ).text( devices_passed )
	$( '.devices_fail' ).text( devices_failed )



	data_total = [ {
		value: devices_passed,
		color: "#5cb85c",
	}, {
		value: devices_failed,
		color: "#d9534f",
	} ]

	var gen_colors = make_chart_colors( 5, 80, 60 )

	data_devices_type = [ {
		value: gen_device_type[ "audios" ].length,
		color: gen_colors[ 0 ],
	}, {
		value: gen_device_type[ "detectors" ].length,
		color: gen_colors[ 1 ],
	}, {
		value: gen_device_type[ "modules" ].length,
		color: gen_colors[ 2 ],
	}, {
		value: gen_device_type[ "switches" ].length,
		color: gen_colors[ 3 ],
	}, {
		value: gen_device_type[ "visuals" ].length,
		color: gen_colors[ 4 ],
	} ]

	var gen_colors_leg = make_chart_colors( 5, 80, 70 )
	$( '.devices_audios' ).text( gen_device_type[ "audios" ].length )
	$( '.devices_audios' ).parent().css( "background-color", gen_colors_leg[ 0 ] )

	$( '.devices_detectors' ).text( gen_device_type[ "detectors" ].length )
	$( '.devices_detectors' ).parent().css( "background-color", gen_colors_leg[ 1 ] )

	$( '.devices_modules' ).text( gen_device_type[ "modules" ].length )
	$( '.devices_modules' ).parent().css( "background-color", gen_colors_leg[ 2 ] )

	$( '.devices_switches' ).text( gen_device_type[ "switches" ].length )
	$( '.devices_switches' ).parent().css( "background-color", gen_colors_leg[ 3 ] )

	$( '.devices_visuals' ).text( gen_device_type[ "visuals" ].length )
	$( '.devices_visuals' ).parent().css( "background-color", gen_colors_leg[ 4 ] )

	if ( gen_device_type[ "audios" ].length == 0 ) {
		$( '.devices_audios' ).parent().hide()
	}
	if ( gen_device_type[ "detectors" ].length == 0 ) {
		$( '.devices_detectors' ).parent().hide()
	}
	if ( gen_device_type[ "modules" ].length == 0 ) {
		$( '.devices_modules' ).parent().hide()
	}
	if ( gen_device_type[ "switches" ].length == 0 ) {
		$( '.devices_switches' ).parent().hide()
	}
	if ( gen_device_type[ "visuals" ].length == 0 ) {
		$( '.devices_visuals' ).parent().hide()
	}









	var len = typoptions[ 1 ].length
	var filt = typoptions[ 1 ].filter( function ( e ) {
		return e
	} )
	var len2 = filt.length
		// console.log(len2)
	var abs_chart_colors = make_chart_colors( len2, 80, 60 )

	for ( var i = 0; i < len2; i++ ) {
		// if (typoptions[1][i]) {
		data_devices_abs[ data_devices_abs.length ] = {
				value: filt[ i ],
				color: abs_chart_colors[ i ]
			}
			// }
	}



	var abs_chart_list_colors = make_chart_colors( len2, 80, 70 )
	var color_counter = 0
	for ( var i = 0; i < len; i++ ) {

		if ( typoptions[ 1 ][ i ] ) {
			// console.log(abs_chart_list_colors[color_counter])
			var li = $( '<li class="list-group-item" style="background-color:' + abs_chart_list_colors[ color_counter ] + '">' + typoptions[ 0 ][ i ] + '<span class="badge badge-chart">' + typoptions[ 1 ][ i ] + '</span></li>' )
			color_counter = color_counter + 1
			$( '#list_devices_chart_abs' ).append( li )
		}
	}


	$( '.devices_abs' ).text( len2 )






	var options = {
		animation: false,
		animateRotate: false,
		animateScale: false,
		segmentStrokeWidth: 1,
		showTooltips: false
	}

	var ctx_total = document.getElementById( "canvas_devices_chart_total" ).getContext( "2d" );
	devices_chart_total = new Chart( ctx_total ).Doughnut( data_total, options );

	var ctx_devices = document.getElementById( "canvas_devices_chart" ).getContext( "2d" );
	devices_chart_type = new Chart( ctx_devices ).Doughnut( data_devices_type, options );

	var ctx_devices_abs = document.getElementById( "canvas_devices_chart_abs" ).getContext( "2d" );
	devices_chart_type_abs = new Chart( ctx_devices_abs ).Doughnut( data_devices_abs, options );









	// $( '.dyn' ).each( function ( index ) {
	// 	if ( $( this ).data()[ "pf3_data" ] ) {
	// 		var i = $( this ).data()[ "pf3_data" ][ 0 ]
	// 		var v = $( this ).data()[ "pf3_data" ][ 1 ]

	// 		if ( report[ i ][ v ] == false ) {
	// 			if ( !$( this ).prev().text() == "" ) {
	// 				$( "#ve_def" ).append( "<li class='list-group-item list-group-item-danger'>" + $( this ).prev().text() + "<span class='badge badge-danger'>FAIL</span></li>" )
	// 			} else {
	// 				$( "#ve_def" ).append( "<li class='list-group-item list-group-item-danger'>" + $( $( this ).parent().parent().parent().children()[ 0 ].children[ 0 ] ).text() + "<span class='badge badge-danger'>FAIL</span></li>" )

	// 			}
	// 		}
	// 	}

	// 	if ( $( this ).data()[ "pf_data" ] ) {
	// 		var i = $( this ).data()[ "pf_data" ][ 0 ]
	// 		var v = $( this ).data()[ "pf_data" ][ 1 ]

	// 		if ( report[ i ][ v ] == false ) {
	// 			if ( !$( this ).prev().text() == "" ) {
	// 				$( "#ve_def" ).append( "<li class='list-group-item list-group-item-danger'>" + $( this ).prev().text() + "<span class='badge badge-danger'>FAIL</span></li>" )
	// 			}
	// 		}
	// 	}
	// } )











	var p_count = 10








	var counter = 0
	var top_count = 20

	$( '#devices_fails_tbody > tr' ).each( function ( i, v ) {
		if ( counter == top_count ) {
			$( v ).after( '<br class="br_hide"><div class="devifce_pb_d"><img class="device_pb" src="img/logo.png" height="68"><h4>Device_Deficiencies<br>Page_' + p_count + '</h4></div>' )
				// $( v ).after( '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><h4 class="dyn date"></h4><h4>Page ' + p_count + '</h4></td></tr>' )
			counter = 0
			p_count = p_count + 1
			top_count = 22
		}

		counter = counter + 1
	} );

	$( "#n_page_pics" ).text( p_count )
	p_count = p_count + 1





	var cnt = 0

	for ( var i = 0; i < 15; i++ ) {
		if ( !$( '#pix_' + i ).is( ':empty' ) ) {

			if ( cnt == 2 ) {
				$( "#pix_" + i ).before( '<div class="row header page_br page_br_dyn"> <div class="col-xs-3"> <img src="img/logo.png" height="68"> <br> <h4 class="text-left">Page_' + p_count + '</h4> </div> <div class="col-xs-6"> <h3 class="text-center bold">' + report[ 12 ][ 1 ] + '</h3> <h4 class="text-center">' + report[ 13 ][ 1 ] + '</h4> </div> <div class="col-xs-3"> <h3 class="text-right">' + report[ 4 ][ 8 ] + '</h3> <h4 class="text-right">' + report[ 11 ][ 4 ] + '</h4> </div> </div>' )
				p_count = p_count + 1
				cnt = 0
			}

			cnt = cnt + 1
		}
	}

	$( "#page_def_hist" ).text( "Page_" + p_count )
	p_count = p_count + 1





	var counter = 0
	var top_count = 13

	$( '#devices_history_tbody > tr' ).each( function ( i, v ) {
		if ( counter == top_count ) {
			$( v ).after( '<br class="br_hide"><div class="devifce_pb_d"><img class="device_pb" src="img/logo.png" height="68"><h4>Deficiencies_History<br>Page_' + p_count + '</h4></div>' )
				// $( v ).after( '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><h4 class="dyn date"></h4><h4>Page ' + p_count + '</h4></td></tr>' )
			counter = 0
			p_count = p_count + 1
			top_count = 15
		}

		counter = counter + 1
	} );








	$( "#page_dev" ).text( "Page_" + p_count )
	p_count = p_count + 1


	var counter = 0
	var top_count = 20

	$( '#devicestbody > tr' ).each( function ( i, v ) {
		if ( counter == top_count ) {
			$( v ).after( '<br class="br_hide"><div class="devifce_pb_d"><img class="device_pb" src="img/logo.png" height="68"><h4>Devices<br>Page_' + p_count + '</h4></div>' )
				// $( v ).after( '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td><h4 class="dyn date"></h4><h4>Page ' + p_count + '</h4></td></tr>' )
			counter = 0
			p_count = p_count + 1
			top_count = 22
		}

		counter = counter + 1
	} );





	if (devices_noa.length == 0) {
		$(".no_acc").hide()
	}









	window.print()



	$( ".devifce_pb_d" ).remove()
	$( ".page_br_dyn" ).remove()
	$(".no_acc").show()



	// html2canvas(document.getElementById('coverpage'), {
	// 	onrendered: function(canvas) {
	// 		$("#coverpage").hide();
	// 		// document.getElementById('main').appendChild(canvas);
	// 		$('#print_coverpage').append(canvas)
	// 	}
	// });

	// html2canvas(document.getElementById('reportpage'), {
	// 	onrendered: function(canvas) {
	// 		$("#reportpage").hide();
	// 		// document.getElementById('main').appendChild(canvas);
	// 		$('#print_reportpage').append(canvas)
	// 	}
	// });

	// setTimeout(function () {
	// 	window.print()
	// }, 2000)
}
document.getElementById( 'print_btn' ).addEventListener( 'click', printFile, false );









function arrContains( obj, a ) {
	for ( var i = 0; i < a.length; i++ ) {
		if ( a[ i ] == obj ) {
			return false;
		}
	}
	return true;
}







function make_chart_colors( num, sat, lit ) {
	var tbl = []
	var ht = Math.floor( 360 / num )
	var hi = 0
	for ( var n = 0; n < num; n++ ) {
		var color = new KolorWheel( [ hi, sat, lit ] );
		// console.log(color.getHex())
		tbl[ n ] = color.getHex()
		hi = hi + ht
	}
	return tbl
}



function saveFile() {
	var arr = []
	arr[ 0 ] = report
	arr[ 1 ] = devices
		// console.log( JSON.stringify(arr) )
	var blob = new Blob( [ JSON.stringify( arr ) ], {
		type: "text/plain;charset=utf-8"
	} )

	var yr = new Date().getFullYear()
		// document.title = (report[12][1] + " " + report[13][1] + " " + report[4][8] + " " + yrz).replace(/\./g, "");
	var txtz = ( report[ 12 ][ 1 ] + " - " + report[ 13 ][ 1 ] + " - " + report[ 4 ][ 8 ] + " - " + yr ).replace( /\./g, "" ).replace( "%", "" ).replace( "#", "" ).replace( "$", "" ).replace( "&", "" ).replace( "*", "" );
	saveAs( blob, txtz + ".json" )
}
document.getElementById( 'btn_save' ).addEventListener( 'click', saveFile, false )
