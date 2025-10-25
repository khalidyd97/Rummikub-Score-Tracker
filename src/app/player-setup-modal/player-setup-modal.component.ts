import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-player-setup-modal',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  templateUrl: './player-setup-modal.component.html',
  styleUrls: ['./player-setup-modal.component.scss'],
})
export class PlayerSetupModalComponent {
  numPlayers = 2;
  playerOptions = [2, 3, 4, 5, 6];
  playerNames: string[] = ['', '']; // start with 2 empty names

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.syncPlayerNames();
  }

  syncPlayerNames() {
    // Add empty slots if array too short
    while (this.playerNames.length < this.numPlayers) {
      this.playerNames.push('');
    }
    // Remove extra slots if array too long
    while (this.playerNames.length > this.numPlayers) {
      this.playerNames.pop();
    }
  }

  startGame() {
    this.modalCtrl.dismiss({ players: this.playerNames });
  }

  cancel() {
    this.modalCtrl.dismiss();
  }
}
