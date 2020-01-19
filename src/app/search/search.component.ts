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
  constructor(private httpClient: HttpClient) {
  }

  calculateGematria(event) {
    const word = event.target.value;
    const baseUrl = 'https://gematria.aryehbeitz.net/gematrium/lookup_by_word';
    return this.httpClient.get<GematriaResult>(`${baseUrl}?word=${word}`).subscribe((result: GematriaResult) => {
      this.matchingWords = result.matching_words.join(', ');
    });
  }
}
