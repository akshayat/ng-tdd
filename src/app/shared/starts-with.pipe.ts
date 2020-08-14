import { Pipe, PipeTransform } from '@angular/core';
import { Item } from './item';

@Pipe({
  name: 'startsWith',
})
export class StartsWithPipe implements PipeTransform {
  transform(value: Item[], query: string): Item[] {
    if (!query) {
      return value;
    }
    const lowerCaseQuery = query.toLowerCase();
    const queryWords = lowerCaseQuery
      .split(' ')
      // we are filtering "" from array
      .filter((word) => word);
    const itemForEachWord = queryWords.flatMap((queryWord) =>
      this.filterWithWord(value, queryWord)
    );
    return [...new Set(itemForEachWord)];
  }

  private filterWithWord(value: Item[], lowerCaseQuery: string): Item[] {
    return value.filter((item) => {
      const lowerCaseTitle = item.title.toLowerCase();
      const words = lowerCaseTitle
        .split(' ')
        // we are filtering "" from array
        .filter((word) => word);
      const wordMatch = words.filter((word) => word.startsWith(lowerCaseQuery));
      return wordMatch.length > 0;
    });
  }
}
