import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementData } from 'src/app/interfaces/element-data.interface';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { Pokemon } from 'src/app/interfaces/pokemon.interface';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.component.html',
  styleUrls: ['./list-pokemons.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ListPokemonsComponent implements OnInit {

  //
  // dataSource = ELEMENT_DATA;
  columnsToDisplay : string[] = ['position', 'name', 'expandir'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: ElementData | null;
  //

  //
  result:any[] = []
  pokemons:Pokemon[] = [];
  data: any[] = [];
  hayData: boolean = false;
  hayDataDetail: boolean = false;
  initGrid: boolean = true;
  pokemonDetail!: any;

  dataSource = new MatTableDataSource<any>(this.data);
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  //

  ngOnInit(): void {
    this.getPokemons();
  }

  constructor(
    private _pokemonService:PokemonService,
    ) { }

  clearData(){
    this.data = [];
  }

  getPokemons() {
      let pokemonData;

      this.clearData();

      for (let x = 1; x <= 200; x++) {
        this._pokemonService.getPokemonById(x).subscribe(
          (res:any) => {

            pokemonData = {
              position: x,
              image: res.sprites.front_default,
              name: res.name,
              types: res.types[0].type.name,
              weight: res.weight,
              moves: res.moves[0].move.name,
              sprites: [{
                back_default : res.sprites.back_default,
                back_shiny: res.sprites.back_shiny,
                front_default: res.sprites.front_default,
                front_shiny: res.sprites.front_shiny,
               }]
            };

            this.data.push(pokemonData);
            this.dataSource = new MatTableDataSource<any>(this.data);
            this.dataSource.paginator = this.paginator;

          },
          err => {
            console.log(err);
          }
        );
      }
  }

  viewDetail(idx: number){
    this._pokemonService.getPokemonById(idx).subscribe(
      (res:any) => {
        console.log('res',res);

        if (res) {
          this.hayDataDetail = true;
          this.pokemonDetail = {
            id: (Number)(res.id),
            image: res.sprites.front_default,
            name: res.name,
            types: res.types[0].type.name,
            weight: res.weight,
            moves: res.moves[0].move.name,
            sprites: [{
              back_default : res.sprites.back_default,
              back_shiny: res.sprites.back_shiny,
              front_default: res.sprites.front_default,
              front_shiny: res.sprites.front_shiny,
             }]
          };

        } else {

          this.hayDataDetail = false;
        }

        console.log('pokemonDetail', this.pokemonDetail);


      },
      err => {
        console.log(err);
      }
    );
  }



}

