import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface GematriaResult {
  id: number;
  gematria_value: number;
  matching_words: Array<string>;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  public matchingWords: string;
  public sum: number;
  constructor(private httpClient: HttpClient) {
  }

  calculateGematria(event) {
    const word = event.target.value;
    const baseUrl = 'https://gematria.aryehbeitz.net/gematrium/lookup_by_word';
    return this.httpClient.get<Array<GematriaResult>>(`${baseUrl}?word=${word}`).subscribe((result: Array<GematriaResult>) => {
      const match = result[0];
      this.matchingWords = match.matching_words.join(', ');
      this.sum = match.gematria_value;
    });
  }
}
