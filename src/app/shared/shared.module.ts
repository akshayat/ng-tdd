import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SelectorComponent } from './selector/selector.component';
import { StartsWithPipe } from './starts-with.pipe';

@NgModule({
  declarations: [SelectorComponent, StartsWithPipe],
  imports: [CommonModule],
})
export class SharedModule {}
