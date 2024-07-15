import { Component, DestroyRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CodeRendererComponent } from './components/code-renderer/code-renderer.component';
import { CodeParserPipe } from './pipes/code-parser.pipe';
import * as htmlToImage from 'html-to-image';
import { from, Subject, switchMap } from 'rxjs';
import { Options } from 'html-to-image/lib/types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CodeRendererComponent, CodeParserPipe],
})
export class AppComponent {
  protected code: string = testNotes;
  protected aspectRatio: string = '10/16';
  private readonly renderOptions: Options = {
    quality: 1,
    pixelRatio: 3,
  };

  @ViewChild(CodeRendererComponent, { static: true })
  private codeRenderer!: CodeRendererComponent;

  private htmlToImagePromise$: Subject<Promise<string>> = new Subject();

  constructor(private readonly destroyRef: DestroyRef) {
    this.htmlToImagePromise$
      .pipe(
        switchMap((promise) => from(promise)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((dataUrl) => {
        const link = document.createElement('a');
        link.download =
          this.codeRenderer.parsedCode.title +
          ' - ' +
          this.codeRenderer.parsedCode.subtitle +
          '.jpeg';
        link.href = dataUrl;
        // link.target = '_blank';
        link.click();
      });
  }

  protected saveAsJpeg() {
    this.htmlToImagePromise$.next(
      htmlToImage.toJpeg(
        this.codeRenderer.elementRef.nativeElement,
        this.renderOptions
      )
    );
  }
}

const testNotes = `# Wish you were here
## Pink Floyd

[||: Em G Em G Em A Em A G G :||]

1.: [C]So, so you think you[D] can tell,
  Heaven from [Am]Hell, blue skies fr[G]om pain.
  Can you tell, green [D]field from cold steel[C] rail,
  smile from [Am]veil,
  Do you think you can [G]tell?

2.: And did they get you to [C]trade your heroes for[D] ghosts,
Hot ashes for [Am]trees, hot air for[G] cool breeze,
cold comfort for ch[D]ange,
And did you ex[C]change walk on part in the [Am]war
for lead role in [G]cage?

   [Em G Em G Em A Em A G]
3.: [C]How I wish, how I wish [D]you were here.
   We're just [Am]two lost souls swimming in fish bowl,
   [G]year after year,
   [D]Running over the same old ground. What [C]have we found?
   The same old [Am]fears. Wish you were [G]here!

   [||: Em G Em G Em A Em A G G :||]
`;
