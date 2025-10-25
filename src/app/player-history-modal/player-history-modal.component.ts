import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-player-history-modal',
  templateUrl: './player-history-modal.component.html',
  imports:[CommonModule,IonicModule,FormsModule]
})
export class PlayerHistoryModalComponent {
  @Input() playerName!: string;
  @Input() rounds: { round: number, scores: { [player: string]: number } }[] = [];

  constructor(private modalCtrl: ModalController) {}

  getWinner(scores: { [player: string]: number }) {
    let maxScore = -Infinity;
    let winner = '';
    for (let player in scores) {
      if (scores[player] > maxScore) {
        maxScore = scores[player];
        winner = player;
      }
    }
    return winner;
  }

  
  close() {
    this.modalCtrl.dismiss();
  }
}
