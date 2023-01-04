import { BaseElement } from "../base.element";
import Chart from 'chart.js/auto';
import css from './chart.element.css?raw';
import { actions, store } from "../../store";

export class ChartElement extends BaseElement {

  // private chart: Chart | undefined;

  // private labels = ["Open", "High", "Low", "Close"];
  // private data = {
  //   labels: this.labels,
  //   datasets: [
  //     {
  //       label: "Daily Prices",
  //       data: [],
  //       fill: true,
  //       borderColor: "#0399f7",
  //       lineTension: 0.1,
  //       borderWidth: 3,
  //     },
  //   ],
  // };

  connectedCallback(): void {
    super.connectedCallback();

    // const config = {
    //   type: "line",
    //   data: this.data,
    //   options: {
    //     responsive: true,
    //     plugins: {
    //       legend: {
    //         position: "top",
    //       },
    //       title: {
    //         display: true,
    //         text: "Chart.js Line Chart",
    //       },
    //     },
    //   },
    // }

    // const ctx = document.getElementById('myChart');
    // const ctx = this.canvas.nativeElement;
    const myCharts = <HTMLCanvasElement>this.getElement("#id-chart");
    const ctx = myCharts.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

  onDaily = () => {

  }

  requestUpdate() {
    actions.company.daily(store.dispatch, this.onDaily, this.error);
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