import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Item {
  id: number;
  value: string;
  content: string;
  date: Date;
  status: '✔️' | '🌟' | '❌';
  description: string;
}

const status = ['✔️', '🌟', '❌'];

function randomStatus(): '✔️' | '🌟' | '❌' {
  const betweenZeroAndTwo = Math.floor(Math.random() * 3);
  return status[betweenZeroAndTwo] as '✔️' | '🌟' | '❌';
}

function randomContent(minLength = 1, maxLength = 50) {
  return new Array(Math.max(minLength, Math.floor(Math.random() * maxLength)))
    .fill('')
    .map(() => randomWord())
    .join(' ');
}

function randomWord() {
  const words = [
    'Apple',
    'Banana',
    'The',
    'Orange',
    'House',
    'Boat',
    'Lake',
    'Car',
    'And',
  ];
  return words[Math.floor(Math.random() * words.length)];
}

function randomDate() {
  const start = new Date('2000-01-01');
  const end = new Date();
  const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
  const randomDiff = Math.floor(Math.random() * diff);
  const randomDate = new Date(
    start.getTime() + randomDiff * (1000 * 60 * 60 * 24)
  );
  return randomDate;
}

function generateItems(startId: number, amount: number): Item[] {
  return new Array(amount).fill(0).map((v, i) => ({
    id: startId + i,
    value: `value ${startId + i}`,
    content: randomContent(),
    status: randomStatus(),
    date: randomDate(),
    description: Math.random() >= 0.5 ? randomContent(30, 50) : '',
  }));
}

@Injectable()
export class DataService {
  items = generateItems(0, 500);

  items$ = new BehaviorSubject<Item[]>(this.items);

  addItems(amount: number | string) {
    if (typeof amount === 'string') {
      amount = parseInt(amount);
    }
    if (this.items.length + amount <= 10000) {
      this.items = this.items.concat(
        ...generateItems(this.items.length, amount)
      );
      this.items$.next(this.items);
    }
  }

  trackItem = (i: number, item: { id: number }) => item.id;
}
