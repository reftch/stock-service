import { BaseElement } from "../base.element";
import { PriceState } from "../../model";
import Chart from 'chart.js/auto';
import css from './chart.element.css?raw';

export class ChartElement extends BaseElement {

  static get observedAttributes() {
    return ['data'];
  }

  private chart: Chart | undefined;
  private labels = ["Open", "High", "Low", "Close"];

  connectedCallback(): void {
    super.connectedCallback();

    const myCharts = <HTMLCanvasElement>this.getElement("#id-chart");
    const ctx = myCharts.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.labels,
          datasets: [{
            fill: true,
            label: 'prices',
            data: [],
            borderColor: "#0399f7",
            borderWidth: 3,
            tension: 0.1,
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top"
            },
            title: {
              display: true,
              text: "Daily prices",
            },
          },
          scales: {
            y: {
              beginAtZero: false
            }
          }
        }
      });
    }
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case 'data': {
        if (this.chart) {
          const data: PriceState = JSON.parse(newValue);
          this.chart.data.datasets[0].data.length = 0;
          this.chart.data.datasets[0].data.push(Number(data.open));
          this.chart.data.datasets[0].data.push(Number(data.high));
          this.chart.data.datasets[0].data.push(Number(data.low));
          this.chart.data.datasets[0].data.push(Number(data.close));
          this.chart.update();
        }
        break;
      }
      default:
        break;
    }
  }

  get html(): string {
    return /*html*/`
      <div class="chart-area">
        <canvas id="id-chart"></canvas>
      </div>
    `;
  }

  get css(): string {
    return css;
  }

}

customElements.define('chart-element', ChartElement);