import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { IonHeader, IonToolbar } from "@ionic/angular/standalone";

@Component({
  selector: 'app-round-input-modal',
  standalone:true,
  imports:[CommonModule,FormsModule,IonicModule],
   templateUrl: './round-input-modal.component.html',
  styleUrls: ['./round-input-modal.component.scss'],
})
export class RoundInputModalComponent {
  @Input() players: string[] = [];
  winner: string = '';
  scores: { [playerName: string]: number } = {};

  constructor(private modalCtrl: ModalController) {}

  dismiss() {
    this.modalCtrl.dismiss();
  }

  saveRound() {
    if (!this.winner) {
      alert('Please select a winner');
      return;
    }

    // Calculate winner’s score = sum of all other players
    const losersTotal = this.players
      .filter(p => p !== this.winner)
      .reduce((sum, p) => sum + (Number(this.scores[p]) || 0), 0);

    const roundScores: { [playerName: string]: number } = {};

    this.players.forEach(player => {
      if (player === this.winner) {
        roundScores[player] = losersTotal; // winner gets sum
      } else {
        roundScores[player] = -(Number(this.scores[player]) || 0); // losers negative
      }
    });

    // Return round data to home page
    this.modalCtrl.dismiss({
      round: {
        winner: this.winner,
        scores: roundScores
      }
    });
  }
}
