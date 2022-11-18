import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MatchResultsService {

  constructor(private http: HttpClient) { }

  getMatches(){
    return this.http.get('https://script.google.com/macros/s/AKfycbxjAD2b5L2qx57lBbK6VtHBEU5ombhMVCkFGL6p16LjCoJVilHj22zmDMFGDqNh9CjuFA/exec');
  }

  // Rankings GS
  // function doGet(req){
  //   var doc = SpreadsheetApp.getActiveSpreadsheet();

  //   var rankingsSheet = doc.getSheetByName('classements');

  //   var rankingValues = rankingsSheet.getDataRange().getValues();

  //   var output = [];

  //   for (var i = 1; i<rankingValues.length; i++){
  //     var row = {};
  //     row['trigramme'] = rankingValues[i][0];
  //     row['email'] = rankingValues[i][1];
  //     row['points1'] = rankingValues[i][2];
  //     row['points2'] = rankingValues[i][3];
  //     row['points3'] = rankingValues[i][4];

  //     output.push(row);
  //   }

  //   return ContentService.createTextOutput(JSON.stringify({data: output})).setMimeType(ContentService.MimeType.JSON);
  // }
}
