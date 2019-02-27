function myFunction() {
  var response = UrlFetchApp.fetch("http://bitcoinwatch.com/").getContentText();
  var n = response.indexOf("<th>Bitcoins sent <span>last 24h</span>");
  var m = response.indexOf("<th>Bitcoins sent <span>avg. per hour</span></th>");
  var volumelast24 = response.substring((n + "<th>Bitcoins sent <span>last 24h</span>".length),m);
  var volumelast24 = volumelast24.replace(/</g,"");
  var volumelast24 = volumelast24.replace(/>/g,"");
  var volumelast24 = volumelast24.replace(/t/g,"");
  var volumelast24 = volumelast24.replace(/d/g,"");
  var volumelast24 = volumelast24.replace(/h/g,"");
  var volumelast24 = volumelast24.replace(/\//g,"");
  var volumelast24 = volumelast24.replace(/BTC/g,"");
  var volumelast24 = volumelast24.replace(/,/g,"");
  var volumelast24 = volumelast24.replace(/r/g,"");
  var volumelast24 = volumelast24.trim();
  
  var response = UrlFetchApp.fetch("http://bitcoinwatch.com/").getContentText();
  var n = response.indexOf('<td>', response.indexOf('<td class="strong">USD</td>'));
  var m = response.indexOf("</td>",n);
  var averageprice = response.substring((n + '<td>'.length),m);
  var averageprice = averageprice.replace(".",",");                                       
                                         
  var n = response.indexOf('<td class="strong">', response.indexOf('bitstampUSD'));
  var m = response.indexOf("</td>",n);
  var actualprice = response.substring((n + '<td class="strong">'.length),m);
  var actualprice = actualprice.replace(".",",");
  
  var nowtime = new Date();
  
  var fila = +(SpreadsheetApp.getActiveSheet().getLastRow() + 1);
  
  SpreadsheetApp.getActiveSheet().getRange('B'+fila).setValue(+volumelast24)
  SpreadsheetApp.getActiveSheet().getRange('A'+fila).setValue(nowtime)
  SpreadsheetApp.getActiveSheet().getRange('C'+fila).setValue(actualprice)
  SpreadsheetApp.getActiveSheet().getRange('D'+fila).setValue(averageprice)
  SpreadsheetApp.getActiveSheet().getRange('E'+(fila - 1)).copyTo(SpreadsheetApp.getActiveSheet().getRange('E'+fila))
}