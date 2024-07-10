import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CodeRendererComponent } from './components/code-renderer/code-renderer.component';
import { CodeParserPipe } from './pipes/code-parser.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CodeRendererComponent, CodeParserPipe, FormsModule],
})
export class AppComponent {
  protected code: string = testNotes;
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

   Em G Em G Em A Em A G
3.: [C]How I wish, how I wish [D]you were here.
   We're just [Am]two lost souls swimming in fish bowl,
   [G]year after year,
   [D]Running over the same old ground. What [C]have we found?
   The same old [Am]fears. Wish you were [G]here!

   [||: Em G Em G Em A Em A G G :||]
`;
