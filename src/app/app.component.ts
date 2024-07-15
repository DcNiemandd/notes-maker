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
  protected aspectRatio: string = '10/16';
  protected code: string = povesteHoVejs;
  protected scale: number = 1.7;
  protected columns: number = 1;
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
        this.codeRenderer.printRef.nativeElement,
        this.renderOptions
      )
    );
  }

  protected toNumber(v: string): number {
    return Number(v);
  }
}

const povesteHoVejs = `# Pověste ho vejš
## Harlej

R1:: Pověste ho [F#mi]vejš, ať se houpá,
pověste ho [A]vejš, ať má [E]dost,
    pověste ho [Hmi]vejš, ať se [F#mi]houpá,
že tu [E]byl nezvanej [F#mi]host.


1.: Pověst[F#mi]e ho že byl jinej,
 že tu s nám[A]a dejchal stejnej [E]vzduch
   pověs[Hmi]te ho, že byl [F#mi]línej
a tak [E]trochu dobro[F#mi]druh.

2.: Pověste ho za El Paso,
za Snídani v trávě a Lodní zvon,
   za to, že neoplýval krásou,
   že měl [D]country rád
a že se [C#7]uměl smát
i [F#mi]vám.

 R2::  Nad hla[A]vou mi slunce pá[E]lí,
konec [Hmi]můj nic neod[A]dá[E]lí,
      do mých [A]snů se dívám zdá[E]li
      a do[Hmi] uší mi stále zní
[C#7]tahle píseň poslední.

3.: Pověste ho za tu banku,
v který zruinoval svůj vklad,
   za to, že nikdy nevydržel
na jednom místě stát.

     [F#mi  A  E  Hmi  F#mi  E  F#mi]

R2+R1::Nad hla[A]vou mi slunce pá[E]lí


4.: Pověste ho za tu jistou,
který nesplnil svůj slib,
   že byl zarputilým optimistou,
 a tak dělal spoustu chyb

5.: Pověste ho, že se koukal
a že hodně jed a hodně pil,
   že dal přednost jarním loukám
   a pak se oženil a pak se usadil a žil

R2+R1::Nad hla[A]vou mi slunce pá[E]lí`;

const wishYouWereHere = `# Wish you were here
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
