import { store } from "../store";

export abstract class BaseElement extends HTMLElement {

  private shadow: ShadowRoot | undefined;
  private _requestRender = 0;
  private _renderFunc: FrameRequestCallback;

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.appendChild(this.getTemplate());

    this._renderFunc = this.requestUpdate.bind(this);
  }

  connectedCallback() {
    const style = document.createElement('style');
    style.innerHTML = this.css;
    this.shadow?.appendChild(style);
  }

  private getTemplate(): Node {
    const templateNode = document.createElement('template')
    templateNode.innerHTML = this.html;
    return templateNode.content.cloneNode(true)
  }

  getElement(selector: string): Element | undefined {
    const el = this.shadow?.querySelector(selector);
    return el ?? undefined;
  }

  getAllElements(selector: string): NodeListOf<Element> | undefined {
    const el = this.shadow?.querySelectorAll(selector);
    return el ?? undefined;
  }

  error(response?: Response) {
    if (!response || (response && response.status === 401)) {
      store.dispatch({ type: 'application/resetCredentials' });
      document.querySelector<HTMLDivElement>('#app')!.innerHTML = '<login-element></login-element>';
    }
  }

  abstract get html(): string;
  abstract get css(): string;

  protected requestRender = (): void => {
    if (this._requestRender) {
      cancelAnimationFrame(this._requestRender);
    }
    this._requestRender = requestAnimationFrame(this._renderFunc);
  }

  requestUpdate() { };
}