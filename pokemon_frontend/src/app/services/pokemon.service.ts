import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl: string = environment.url;

  constructor(private http: HttpClient) { }

  getPokemonById(index: number){
     const url = `${this.apiUrl}/pokemon/${index}`;
     return this.http.get<Pokemon[]>(url);
  }







}
