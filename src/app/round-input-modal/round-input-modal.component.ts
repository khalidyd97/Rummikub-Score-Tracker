import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-round-input-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './round-input-modal.component.html',
  styleUrls: ['./round-input-modal.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RoundInputModalComponent implements OnInit {
  @Input() players: string[] = [];

  winner: string = '';
  scores: { [playerName: string]: number } = {};
  playerInputs: { [playerName: string]: number[] } = {};
  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 30];

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    // Initialize each player's number list
    this.players.forEach(p => {
      this.playerInputs[p] = [];
      this.scores[p] = 0;
    });
  }

  // Add number to player's expression
  addToExpression(player: string, num: number) {
    this.playerInputs[player].push(num);
    this.scores[player] = this.calcRes(player);
  }

  // Remove last number
  clear(player: string) {
    this.playerInputs[player].pop();
    this.scores[player] = this.calcRes(player);
  }

  // Calculate sum for a player
  calcRes(player: string) {
    return this.playerInputs[player].reduce((acc, num) => acc + num, 0);
  }

  // Return string like "5+7+3"
  exp(player: string) {
    return this.playerInputs[player].join('+');
  }

  calculate() {
    // reserved if you want extra logic (like saving or confirming)
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  saveRound() {
    if (!this.winner) {
      alert('Please select a winner');
      return;
    }

    // Use summed results from the keypad for each player
    const losersTotal = this.players
      .filter(p => p !== this.winner)
      .reduce((sum, p) => sum + (Number(this.scores[p]) || 0), 0);

    const roundScores: { [playerName: string]: number } = {};

    this.players.forEach(player => {
      if (player === this.winner) {
        roundScores[player] = losersTotal;
      } else {
        roundScores[player] = -(Number(this.scores[player]) || 0);
      }
    });

    this.modalCtrl.dismiss({
      round: {
        winner: this.winner,
        scores: roundScores
      }
    });
  }
}
