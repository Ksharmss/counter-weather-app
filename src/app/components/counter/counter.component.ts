import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent {
  counters: { id: number; count: number }[] = [];
  counterId = 0;

  addCounter() {
    this.counters.push({ id: this.counterId++, count: 0 });
  }

  increment(id: number) {
    const counter = this.counters.find(c => c.id === id);
  }

  decrement(id: number) {
    this.counters.find(c => c.id === id)!.count--;
  }

  deleteCounter(id: number) {
    this.counters = this.counters.filter(c => c.id !== id);
  }

  resetCounters() {
    this.counters = [];
  }
}
