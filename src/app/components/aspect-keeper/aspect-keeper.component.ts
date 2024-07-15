import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-aspect-keeper',
  standalone: true,
  imports: [],
  templateUrl: './aspect-keeper.component.html',
  styleUrl: './aspect-keeper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AspectKeeperComponent implements OnChanges, AfterViewInit {
  @Input({ required: true })
  public aspectRatio: number = 0;

  protected widthPx: number = 0;
  protected heightPx: number = 0;
  protected scale: number = 0;

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}
  ngOnChanges(): void {
    const smallerSide = 1080;
    const biggerSide = smallerSide / this.aspectRatio;

    this.heightPx = this.aspectRatio > 1 ? smallerSide : biggerSide;
    this.widthPx = this.aspectRatio > 1 ? biggerSide : smallerSide;

    this.imageContainerAspectRatioCalculate();
  }
  ngAfterViewInit(): void {
    this.imageContainerAspectRatioCalculate();
  }

  @HostListener('window:resize')
  protected imageContainerAspectRatioCalculate() {
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    if (!rect) return;
    const imageContainerAspectRatio = rect.width / rect.height;
    const isWider = this.aspectRatio > imageContainerAspectRatio;
    this.scale = isWider
      ? rect.width / this.widthPx
      : rect.height / this.heightPx;
  }
}
