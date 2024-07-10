import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ParsedCode } from 'src/app/pipes/code-parser.pipe';

@Component({
  selector: 'app-code-renderer',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './code-renderer.component.html',
  styleUrls: ['./code-renderer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeRendererComponent {
  @Input({ required: true }) public parsedCode!: ParsedCode;
}
