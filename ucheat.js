var values = {
	"mt_visible" : true, "mt_intownonly" : true, "mt_rate_day" : "14.95",
	"rt_visible" : true, "rt_intownonly" : false, "rt_rate_day" : "24.95",
	"ho_visible" : true, "ho_intownonly" : true, "ho_rate_day" : "34.95",
	"fs_visible" : true, "fs_intownonly" : true, "fs_rate_day" : "14.95",
	"ao_visible" : true, "ao_intownonly" : true, "ao_rate_day" : "18.95",
	"ro_visible" : true, "ro_intownonly" : true, "ro_rate_day" : "29.95",
	"uv_visible" : true, "uv_intownonly" : false, "uv_rate_day" : "14.95",
	"av_visible" : true, "av_intownonly" : false, "av_rate_day" : "18.95",
	"mv_visible" : true, "mv_intownonly" : false, "mv_rate_day" : "29.95",
	"rv_visible" : true, "rv_intownonly" : false, "rv_rate_day" : "29.95",
	"td_visible" : true, "td_intownonly" : false, "td_rate_day" : "44.95",
	"at_visible" : true, "at_intownonly" : false, "at_rate_day" : "54.95",
	"bp_visible" : true, "bp_intownonly" : true, "bp_rate_day" : "19.95", "bp_rate_week" : "0.59", "bp_rate_weekend" : "0.69",
	"be_visible" : true, "be_intownonly" : true, "be_rate_day" : "19.95", "be_rate_week" : "0.59", "be_rate_weekend" : "0.69",
	"tm_visible" : true, "tm_intownonly" : false, "tm_rate_day" : "19.95", "tm_rate_week" : "0.79", "tm_rate_weekend" : "0.99",
	"dc_visible" : true, "dc_intownonly" : false, "dc_rate_day" : "29.95", "dc_rate_week" : "0.79", "dc_rate_weekend" : "0.99",
	"el_visible" : true, "el_intownonly" : false, "el_rate_day" : "29.95", "el_rate_week" : "0.79", "el_rate_weekend" : "0.99",
	"tt_visible" : true, "tt_intownonly" : false, "tt_rate_day" : "39.95", "tt_rate_week" : "0.79", "tt_rate_weekend" : "0.99",
	"jh_visible" : true, "jh_intownonly" : false, "jh_rate_day" : "39.95", "jh_rate_week" : "0.79", "jh_rate_weekend" : "0.99",
	"aa_visible" : true, "aa_intownonly" : true, "aa_rate_month" : "39.95"
}
var defaultValues = values;

// Si le cookie existe, les valeurs sont réécrites ; sinon, il est créé avec les valeurs par défaut.
$.cookie.json = true;
if (!!$.cookie('settings')) {
	values = $.cookie('settings');
} else {
 	$.cookie('settings',values, {expires: 365});
}


function updateItem(item,visible,itonly,day,weekday,weekend) {
 	if (visible == true || visible == 1) { $('div.item.'+item).show() } else { $('div.item.'+item).hide() }
 	if (itonly == true || itonly == 1) {$('div.item.'+item+' .itonly').html('<h4 class="alert"><span>En ville seulement</span></h4>').show(); } else { $('div.item.'+item+' .itonly').hide() }
 	$('div.item.'+item+' .price').text('$'+day+' / jour');
 	if (weekday >= 10) weekday = weekday / 100 // Au cas où l'utilisateur aurait entré des centimes, convertir en dollars
 	if (weekend >= 10) weekend = weekend / 100	// Cette approche suppose qu'aucun kilométrage n'est supérieur à 10 $/mile ou inférieur à 10 cents/mile
 	if (weekday > 0 ) $('div.item.'+item+' .weekday').text('$'+weekday+'/mile (Dim-Jeu)');
 	if (weekend > 0 ) $('div.item.'+item+' .weekend').text('$'+weekend+'/mile (Ven-Sam)');
 		// Par défaut, afficher le format $x.xx, mais écraser si nous trouvons une meilleure façon. Ceci DEVRAIT être converti en un if/else, mais c'est suffisant pour l'instant.
	if (weekday > 0 && weekday < 1) $('div.item.'+item+' .weekday').text((weekday + "").split(".")[1] + '¢/mile (Dim-Jeu)');
 	if (weekend > 0 && weekend < 1) $('div.item.'+item+' .weekend').text((weekend + "").split(".")[1] + '¢/mile (Ven-Sam)');
 		// Cette méthode convertit le jour de semaine/week-end en chaînes, les divise au niveau de la virgule et affiche la deuxième partie du tableau (ce qui se trouve à droite de la virgule). Idéalement, nous vérifierions les entrées invalides, mais cela fera l'affaire.
 }

 function updateUbox(item, visible,itonly,month) {
 	if (visible == true || visible == 1) { $('div.item.'+item).show() } else { $('div.item.'+item).hide() }
 	if (itonly == true || itonly == 1) {$('div.item.'+item+' .itonly').html('<h4 class="alert"><span>En ville seulement</span></h4>').show(); } else { $('div.item.'+item+' .itonly').hide() }
 	$('div.item.'+item+' .price').text('$'+month+' / mois + livraison');
 }

 function updateAll() {
 	updateItem('mt',values.mt_visible,values.mt_intownonly,values.mt_rate_day,0,0);
 	updateItem('rt',values.rt_visible,values.rt_intownonly,values.rt_rate_day,0,0);
 	updateItem('ho',values.ho_visible,values.ho_intownonly,values.ho_rate_day,0,0);
 	updateItem('fs',values.fs_visible,values.fs_intownonly,values.fs_rate_day,0,0);
 	updateItem('ao',values.ao_visible,values.ro_intownonly,values.ao_rate_day,0,0);
 	updateItem('ro',values.ro_visible,values.ro_intownonly,values.ro_rate_day,0,0);
 	updateItem('uv',values.uv_visible,values.uv_intownonly,values.uv_rate_day,0,0);
 	updateItem('av',values.av_visible,values.av_intownonly,values.av_rate_day,0,0);
 	updateItem('mv',values.mv_visible,values.mv_intownonly,values.mv_rate_day,0,0);
 	updateItem('rv',values.rv_visible,values.rv_intownonly,values.rv_rate_day,0,0);
 	updateItem('td',values.td_visible,values.td_intownonly,values.td_rate_day,0,0);
 	updateItem('at',values.at_visible,values.at_intownonly,values.at_rate_day,0,0);
 	updateItem('bp',values.bp_visible,values.bp_intownonly,values.bp_rate_day,values.bp_rate_week,values.bp_rate_weekend);
 	updateItem('be',values.be_visible,values.be_intownonly,values.be_rate_day,values.be_rate_week,values.be_rate_weekend);
 	updateItem('tm',values.tm_visible,values.tm_intownonly,values.tm_rate_day,values.tm_rate_week,values.tm_rate_weekend);
 	updateItem('dc',values.dc_visible,values.dc_intownonly,values.dc_rate_day,values.dc_rate_week,values.dc_rate_weekend);
 	updateItem('el',values.el_visible,values.el_intownonly,values.el_rate_day,values.el_rate_week,values.el_rate_weekend);
 	updateItem('tt',values.tt_visible,values.tt_intownonly,values.tt_rate_day,values.tt_rate_week,values.tt_rate_weekend);
 	updateItem('jh',values.jh_visible,values.jh_intownonly,values.jh_rate_day,values.jh_rate_week,values.jh_rate_weekend);
 	updateUbox('aa',values.aa_visible,values.aa_intownonly,values.aa_rate_month);
 	// Utilisation de updateUbox comme cas particulier en raison de "/ mois + livraison"
 	// Maintenant, mettez à jour les éléments des paramètres
 	$.each(values, function(id, value) {
  		switch(value) {
  			case true:
  			case 1:
	  			$('#' + id).prop("checked", true);
	  			break;
	  		case false:
	  		case 0:
	  			$('#' + id).prop("checked", false);
	  			break;
	  		default:
	  			$('#' + id).val(value);
  		};
  	});
 $.cookie('settings',values, {expires: 365});
 }
