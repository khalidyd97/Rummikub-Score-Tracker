import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface Round {
  roundNumber: number;
  winner: string;
  scores: { [playerName: string]: number };
}

export interface GameData {
  players: string[];
  rounds: Round[];
}

@Injectable({
  providedIn: 'root'
})
export class ScoreStorageService {
  private _storage: Storage | null = null;
  private readonly STORAGE_KEY = 'rummikub_game_data';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const store = await this.storage.create();
    this._storage = store;
  }

  async saveGame(data: GameData): Promise<void> {
    await this._storage?.set(this.STORAGE_KEY, data);
  }

  async loadGame(): Promise<GameData | null> {
    return (await this._storage?.get(this.STORAGE_KEY)) || null;
  }

  async clearGame(): Promise<void> {
    await this._storage?.remove(this.STORAGE_KEY);
  }
}
