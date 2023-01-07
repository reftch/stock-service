import { actions, store } from "../../store";
import { BaseElement } from "../base.element";
import css from './login.element.css?raw';

export class LoginElement extends BaseElement {

  connectedCallback(): void {
    super.connectedCallback();
    this.getElement('#form-signin')?.addEventListener('submit', this.submit);
    (this.getElement('#username') as HTMLElement).focus();
  }

  submit = (e: Event) => {
    e.preventDefault();
    const username = (this.getElement('#username') as HTMLInputElement).value;
    const password = (this.getElement('#password') as HTMLInputElement).value;

    const token = window.btoa(`${username.trim()}:${password.trim()}`);
    actions.application.login(store.dispatch, token, this.success, this.error);
  }

  success = () => {
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = /*html*/`<home-element></home-element>`;

    setTimeout(() => {
      store.dispatch({ type: 'application/resetCredentials' });
      document.querySelector<HTMLDivElement>('#app')!.innerHTML = /*html*/`<login-element></login-element>`;
    }, this.getExpireValue());
  }

  error = () => this.getAllElements('.form-control')?.forEach((el: Element) => el.classList.add('error'));

  get html() {
    return /*html*/`
      <div class="wrapper" data-testid="login-element">
        <form id="form-signin" class="form-signin">
          <h2 class="form-signin-heading" data-testid="title">Please login</h2>
          <input id="username" data-testid="username" type="text" class="form-control" name="username" placeholder="Username" required="" />
          <input id="password" data-testid="password" type="password" class="form-control" name="password" placeholder="Password" required=""/>
          <div class="bottom">
             <button id="submit-btn" data-testid="submit-btn" type="submit" >Login</button>
          </div>
        </form>
      </div>
    `;
  }

  get css() {
    return css;
  }

  private getExpireValue() {
    const expires = sessionStorage.getItem('expires') ?? '1h';
    let expValue = Number(expires.slice(0, expires.length - 1));
    if (expires[expires.length - 1] === 'm') {
      expValue *= 60000;
    } else if (expires[expires.length - 1] === 'h') {
      expValue *= 60000 * 60;
    }
    return expValue;
  }

}

customElements.define('login-element', LoginElement);