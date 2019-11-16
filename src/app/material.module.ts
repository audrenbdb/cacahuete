import { NgModule } from "@angular/core";

import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';




@NgModule({
    imports: [
        MatStepperModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatDividerModule,
        MatListModule,
        MatTooltipModule,
        MatIconModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        MatDialogModule,
    ],
    exports: [
        MatStepperModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatDividerModule,
        MatListModule,
        MatTooltipModule,
        MatIconModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        MatDialogModule,
    ],
})
export class MaterialModule {}