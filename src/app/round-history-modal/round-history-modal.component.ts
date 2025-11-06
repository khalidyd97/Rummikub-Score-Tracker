import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-round-history-modal',
  imports:[IonicModule,CommonModule],
  templateUrl: './round-history-modal.component.html',
  styleUrls: ['./round-history-modal.component.scss'],
})
export class RoundHistoryModalComponent {
  @Input() rounds: any[] = []; // array of round objects with number and winner
  @Input() deleteRoundCallback!: (index: number) => void; // function passed from parent
  constructor(private modalCtrl: ModalController) {}


  deleteRound(index: number) {
    if (confirm(`Are you sure you want to delete Round ${index + 1}?`)) {
      this.deleteRoundCallback(index);
    }
  }
  close() {
    this.modalCtrl.dismiss();
  }
}
