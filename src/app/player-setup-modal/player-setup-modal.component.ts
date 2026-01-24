import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-player-setup-modal',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  templateUrl: './player-setup-modal.component.html',
  styleUrls: ['./player-setup-modal.component.scss'],
})
export class PlayerSetupModalComponent implements OnInit {

  @Input() existingPlayers: string[] = [];

  numPlayers = 2;
  playerOptions = [2, 3, 4, 5, 6];
  playerNames: string[] = [];

  isEditMode = false;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    if (this.existingPlayers.length) {
      this.isEditMode = true;
      this.playerNames = [...this.existingPlayers];
      this.numPlayers = this.playerNames.length;
    } else {
      this.playerNames = ['', ''];
      this.syncPlayerNames();
    }
  }

  syncPlayerNames() {
    while (this.playerNames.length < this.numPlayers) {
      this.playerNames.push('');
    }
    while (this.playerNames.length > this.numPlayers) {
      this.playerNames.pop();
    }
  }

  submit() {
    const cleanedNames = this.playerNames.map(n => n.trim());
    this.modalCtrl.dismiss({ players: cleanedNames });
  }

  cancel() {
    this.modalCtrl.dismiss();
  }
}
