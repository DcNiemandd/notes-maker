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
  @HostBinding('style.aspect-ratio')
  @Input({ required: true })
  public appAspectKeeper: number = 0;

  @HostBinding('style.width') private width: string | null = null;
  @HostBinding('style.height') private height: string | null = null;

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}
  ngOnChanges(): void {
    this.imageContainerAspectRatioCalculate();
    console.log('W', this.appAspectKeeper);
  }
  ngAfterViewInit(): void {
    this.imageContainerAspectRatioCalculate();
  }

  @HostListener('window:resize')
  protected imageContainerAspectRatioCalculate() {
    const rect =
      this.elementRef.nativeElement.parentElement?.getBoundingClientRect();
    if (!rect) return;
    const imageContainerAspectRatio = rect.width / rect.height;

    this.height =
      this.appAspectKeeper <= imageContainerAspectRatio ? '100%' : null;

    this.width =
      this.appAspectKeeper >= imageContainerAspectRatio ? '100%' : null;
  }
}
