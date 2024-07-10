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

    const endOfLast = this.chords.slice(0, index).reduce((endOfPrev, chord) => {
      return Math.max(
        chord.position + chord.text.length,
        endOfPrev + chord.text.length
      );
    }, 0);
    return Math.max(0, position - endOfLast);
  }
}
