import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { RoundInputModalComponent } from '../round-input-modal/round-input-modal.component';
import { PlayerSetupModalComponent } from '../player-setup-modal/player-setup-modal.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    RoundInputModalComponent,
    PlayerSetupModalComponent,

  ],
  declarations: [HomePage,


  ]
})
export class HomePageModule {}
