import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  ParsedCodeChord,
  ParsedCodeLine,
} from 'src/app/pipes/code-parser.pipe';

@Component({
  selector: 'app-render-line',
  standalone: true,
  imports: [],
  templateUrl: './render-line.component.html',
  styleUrl: './render-line.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RenderLineComponent implements ParsedCodeLine {
  @Input() public chords?: ParsedCodeChord[] | undefined;
  @Input() public lyrics?: string | undefined;

  protected marginLeft(position: number, index: number): number {
    if (index === 0 || !this.chords) {
      return position;
    }
    return Math.max(
      0,
      position -
        this.chords[index - 1].position -
        this.chords[index - 1].text.length
    );
  }
}
