import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ParsedCode } from 'src/app/pipes/code-parser.pipe';
import { RenderSectionComponent } from '../render-section/render-section.component';

@Component({
  selector: 'app-code-renderer',
  standalone: true,
  imports: [RenderSectionComponent],
  templateUrl: './code-renderer.component.html',
  styleUrls: ['./code-renderer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeRendererComponent {
  @Input({ required: true }) public parsedCode!: ParsedCode;
}
