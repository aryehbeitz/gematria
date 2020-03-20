import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  public matchingWords: Array<string>;
  public sum: number;
  public favorites: Array<string>;
  currentWord: string;
  baseUrl = 'https://gematria.aryehbeitz.net/gematrium';
  constructor(private httpClient: HttpClient) {
    this.loadFavorites();
  }

  calculateGematria(event = null) {
    if (event && event.target) {
      const word = event.target.value;
      this.currentWord = word;
    } else {
      this.currentWord = event;
    }
    const url = `${this.baseUrl}/lookup_by_word`;
    return this.httpClient.get<Array<GematriaResult>>(`${url}?query=${this.currentWord}`)
    .subscribe((result: Array<GematriaResult>) => {
      this.assignResult(result);
    });
  }

  private assignResult(result) {
    const match = result[0];
    this.matchingWords = match.matching_words;
    this.sum = match.gematria_value;
  }

  resultByGematria(gematria: number) {
    const url = `${this.baseUrl}/lookup_by_gematria`;
    this.httpClient.get<string>(`${url}?query=${gematria}`)
      .subscribe((result) => {
      this.assignResult(result);
    })
  }

  addToFavorites() {
    const url = `${this.baseUrl}/add_to_favorites`;
    this.httpClient.put<string>(url, {
      query: this.currentWord
    }).subscribe(() => {
      this.loadFavorites();
    });
  }

  loadFavorites() {
    const url = `${this.baseUrl}/favorites`;
    this.httpClient.get<Array<string>>(url)
    .subscribe((result: Array<string>) => {
      this.favorites = result;
    });
  }

  removeWord(word) {
    const url = `${this.baseUrl}/remove_word`;
    this.httpClient.put<string>(url, {
      query: word
    }).subscribe(() => {
      this.resultByGematria(this.sum);
    });
  }
}
