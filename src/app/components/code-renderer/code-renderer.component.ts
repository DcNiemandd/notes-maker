import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import { ParsedCode } from 'src/app/pipes/code-parser.pipe';
import { AspectKeeperComponent } from '../aspect-keeper/aspect-keeper.component';
import { RenderSectionComponent } from '../render-section/render-section.component';

@Component({
  selector: 'app-code-renderer',
  standalone: true,
  imports: [RenderSectionComponent, AspectKeeperComponent],
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
  @HostBinding('style.--scale')
  @Input()
  public scale: number = 1;
  @HostBinding('style.--columns')
  @Input()
  public columns: number = 1;
  @Input({ required: true }) public parsedCode!: ParsedCode;

  @ViewChild('toPrintRef', { static: true })
  public printRef!: ElementRef<HTMLDivElement>;
}
