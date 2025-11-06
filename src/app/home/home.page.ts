import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { PlayerSetupModalComponent } from '../player-setup-modal/player-setup-modal.component';
import { RoundInputModalComponent } from '../round-input-modal/round-input-modal.component';
import { GameData, Round, ScoreStorageService } from '../ScoreStorageService';
import { Storage } from '@ionic/storage-angular';
import { PlayerHistoryModalComponent } from '../player-history-modal/player-history-modal.component';
import { RoundHistoryModalComponent } from '../round-history-modal/round-history-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  standalone:false,
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  gameData: GameData = { players: [], rounds: [] };
  @ViewChild('historyModal') historyModal!: TemplateRef<any>;
  isWinner(player: string) {
    if (!this.gameData.rounds.length) return false;
    const lastRound = this.gameData.rounds[this.gameData.rounds.length - 1];
    return lastRound.winner === player;
  }



  maxTotal(): number {
    const totals = Object.values(this.getTotals());
    return totals.length ? Math.max(...totals) : 0;
  }
  

  constructor(
  
    private modalCtrl: ModalController,
    private storage:Storage,
    private alertCtrl: AlertController

  ) {

    this.storage.create();
  }

  async ngOnInit() {
    const saved = await this.storage.get('rummikub_game_data');
    if (saved) this.gameData = saved;
  }
  async openPlayerHistory(playerName: string) {
    const modal = await this.modalCtrl.create({
      component: PlayerHistoryModalComponent,
      componentProps: {
        playerName,
        rounds: this.gameData.rounds // make sure gameData.rounds exists
      }
    });
    await modal.present();
  }



  async confirmReset() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Reset',
      message: 'Are you sure you want to reset the game? All data will be lost.',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Reset',
          role: 'destructive',
          handler: () => {
            this.resetGame();
          },
        },
      ],
    });

    await alert.present();
  }

  async confirmStartNewGame() {
    const alert = await this.alertCtrl.create({
      header: 'Start New Game',
      message: 'Are you sure you want to start a new game? Current game will be cleared.',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Start',
          role: 'confirm',
          handler: () => {
            this.openPlayerSetup();
          },
        },
      ],
    });

    await alert.present();
  }



  getTotals(): { [player: string]: number } {
    const totals: any = {};
    this.gameData.players.forEach((p) => (totals[p] = 0));
    this.gameData.rounds.forEach((round) => {
      this.gameData.players.forEach((player) => {
        totals[player] += round.scores[player] || 0;
      });
    });
    return totals;
  }

  async openPlayerSetup() {
    const modal = await this.modalCtrl.create({
      component: PlayerSetupModalComponent,
    });
    modal.onDidDismiss().then(async (result) => {
      if (result.data) {
        const players = result.data.players || [];
        this.gameData = { players, rounds: [] };
        await this.storage.set('rummikub_game_data',this.gameData);
      }
    });
    await modal.present();
  }


  async openRoundInput() {
    console.log('Opening round input modal...');
    const modal = await this.modalCtrl.create({
      component: RoundInputModalComponent,
      componentProps: { players: this.gameData.players },
    });
    
    await modal.present();

    const { data } = await modal.onDidDismiss();
  
    if (data?.round) {
      const newRound = {
        roundNumber: this.gameData.rounds.length + 1,
        winner: data.round.winner,
        scores: data.round.scores,
      };
      this.gameData.rounds.push(newRound);
      await this.storage.set('rummikub_game_data',this.gameData);
    }

  }
  

  
  async openRoundHistory() {
    const modal = await this.modalCtrl.create({
      component: RoundHistoryModalComponent,
      componentProps: {
        rounds: this.gameData.rounds,
        deleteRoundCallback: (index: number) => {
          this.gameData.rounds.splice(index, 1); // delete round
        },
      },
    });
    await modal.present();
  }

  async resetGame() {
    this.gameData = { players: this.gameData.players, rounds: [] };
    await this.storage.set('rummikub_game_data',this.gameData)
  }
}
