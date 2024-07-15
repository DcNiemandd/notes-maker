import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
} from '@angular/core';

@Directive({
  selector: '[appAspectKeeper]',
  standalone: true,
})
export class AspectKeeperDirective implements AfterViewInit, OnChanges {
  @Input({ required: true })
  public appAspectKeeper: number = 0;

  @HostBinding('style.width') private width: string | null = null;
  @HostBinding('style.height') private height: string | null = null;
  private widthPx: number = 0;
  private heightPx: number = 0;
  @HostBinding('style.scale') private scale: number | null = null;

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}
  ngOnChanges(): void {
    const smallerSide = 1080;
    const biggerSide = smallerSide / this.appAspectKeeper;

    this.heightPx = this.appAspectKeeper > 1 ? smallerSide : biggerSide;
    this.widthPx = this.appAspectKeeper > 1 ? biggerSide : smallerSide;

    this.height = this.heightPx + 'px';
    this.width = this.widthPx + 'px';

    this.imageContainerAspectRatioCalculate();
  }
  ngAfterViewInit(): void {
    if (this.elementRef.nativeElement.parentElement) {
      this.elementRef.nativeElement.parentElement.style.position = 'relative';
      this.elementRef.nativeElement.style.position = 'absolute';
      this.elementRef.nativeElement.style.top = '50%';
      this.elementRef.nativeElement.style.translate = '-50% -50%';
      this.elementRef.nativeElement.style.left = '50%';
    }
    this.imageContainerAspectRatioCalculate();
  }

  @HostListener('window:resize')
  protected imageContainerAspectRatioCalculate() {
    const rect =
      this.elementRef.nativeElement.parentElement?.getBoundingClientRect();
    if (!rect) return;
    const imageContainerAspectRatio = rect.width / rect.height;
    const isWider = this.appAspectKeeper > imageContainerAspectRatio;
    this.scale = isWider
      ? rect.width / this.widthPx
      : rect.height / this.heightPx;
  }
}
