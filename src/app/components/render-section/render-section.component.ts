import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  ParsedCodeLine,
  ParsedCodeSection,
} from 'src/app/pipes/code-parser.pipe';
import { RenderLineComponent } from '../render-line/render-line.component';

@Component({
  selector: 'app-render-section',
  standalone: true,
  imports: [RenderLineComponent],
  templateUrl: './render-section.component.html',
  styleUrl: './render-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RenderSectionComponent implements ParsedCodeSection {
  @Input() public label?: string | undefined;
  @Input() public labelWidth?: number | undefined;
  @Input({ required: true }) public lines: ParsedCodeLine[] = [];
}
