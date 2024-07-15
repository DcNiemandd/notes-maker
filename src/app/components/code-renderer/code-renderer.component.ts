import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
} from '@angular/core';
import { AspectKeeperDirective } from 'src/app/directives/aspect-keeper.directive';
import { ParsedCode } from 'src/app/pipes/code-parser.pipe';
import { RenderSectionComponent } from '../render-section/render-section.component';

@Component({
  selector: 'app-code-renderer',
  standalone: true,
  imports: [RenderSectionComponent, AspectKeeperDirective],
  templateUrl: './code-renderer.component.html',
  styleUrls: ['./code-renderer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeRendererComponent {
  @Input({
    transform: (v: number | string) => {
      if (typeof v !== 'string') return v;

      return v
        .split(/[/:]/g, 2)
        .reduce(
          (evaluation, value) =>
            evaluation ? evaluation / Number(value) : Number(value),
          undefined as undefined | number
        );
    },
  })
  public aspectRatio: number = 10 / 16;
  @Input({ required: true }) public parsedCode!: ParsedCode;

  public elementRef: ElementRef = inject(ElementRef);
}
