import { StartsWithPipe } from './starts-with.pipe';
import { Item } from './item';

describe('StartsWithPipe', () => {
  const pipe = new StartsWithPipe();
  const input: Item[] = [
    { title: 'Foo' },
    { title: 'Bar' },
    { title: 'happy birthday' },
    { title: '   other   title with multiple spaces ' },
  ];

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should ignore blank query', () => {
    expect(pipe.transform(input, '')).toEqual(input);
    expect(pipe.transform(input, null)).toEqual(input);

    expect(pipe.transform(input, undefined)).toEqual(input);
  });

  it('Should filter if I give exact query', () => {
    const result = pipe.transform(input, 'Foo');
    const expctation = input[0];
    expect(result).toEqual([expctation]);
  });

  it('Should filter if I give partial query', () => {
    const result = pipe.transform(input, 'Fo');
    const expctation = input[0];
    expect(result).toEqual([expctation]);
  });

  it('Should filter if I give case insensitive query', () => {
    const result = pipe.transform(input, 'fo');
    const [expctation] = input;
    expect(result).toEqual([expctation]);
  });

  it('Should search in multiple words', () => {
    const result = pipe.transform(input, 'bi');
    const expectation = input[2];
    expect(result).toEqual([expectation]);
  });

  it('Should search in with mutliple words query', () => {
    const result = pipe.transform(input, 'abc happ');
    const expectation = input[2];
    expect(result).toEqual([expectation]);
  });

  it('Should escapte the space', () => {
    const result = pipe.transform(input, '   abc happ');
    const expectation = input[2];
    expect(result).toEqual([expectation]);
  });

  it('filter only one time', () => {
    const result = pipe.transform(input, 'happy birthday');
    const expectation = input[2];
    expect(result).toEqual([expectation]);
  });
});
