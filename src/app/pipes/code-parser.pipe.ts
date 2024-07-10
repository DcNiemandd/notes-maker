import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'codeParser',
  standalone: true,
})
export class CodeParserPipe implements PipeTransform {
  private chordsCatch = /\[([^\]]+)\]/;

  transform(value: string | undefined): ParsedCode {
    const rows: string[] = value?.split('\n') ?? [];
    const parsed: ParsedCode = {
      sections: [],
    };

    let tempSection: ParsedCodeSection = {
      lines: [],
    };

    const newSection = () => {
      if (tempSection.lines.length) {
        parsed.sections.push({ ...tempSection });
        tempSection = {
          lines: [],
        };
      }
    };

    rows.forEach((row) => {
      // Ends section
      if (!row) {
        newSection();
        return;
      }
      // Subtitle
      if (row.startsWith('##')) {
        parsed.subtitle = row.substring(2).trim();
        return;
      }
      // Title
      if (row.startsWith('#')) {
        parsed.title = row.substring(1).trim();
        return;
      }
      // Line with chords
      const labelEnd = row.indexOf(':');
      const firstChord = row.indexOf('[');
      const line: ParsedCodeLine = {};
      if (labelEnd !== -1 && (firstChord === -1 || labelEnd < firstChord)) {
        newSection();
        tempSection.label = row.substring(0, labelEnd);
        row = row.substring(labelEnd + 1);
      }

      row = row.trim();
      let match;
      while ((match = this.chordsCatch.exec(row)) !== null) {
        if (!line.chords) {
          line.chords = [];
        }
        const matchIndex = row.indexOf(match[0]);
        line.chords?.push({
          position: matchIndex,
          text: match[1],
        });
        row = row.replace(match[0], '');
      }

      line.lyrics = row;
      tempSection.lines.push(line);
    });

    return parsed;
  }
}

export interface ParsedCode {
  title?: string;
  subtitle?: string;
  sections: ParsedCodeSection[];
}

export interface ParsedCodeSection {
  label?: string;
  lines: ParsedCodeLine[];
}

export interface ParsedCodeLine {
  lyrics?: string;
  chords?: ParsedCodeChord[];
}

export interface ParsedCodeChord {
  text: string;
  position: number;
}
