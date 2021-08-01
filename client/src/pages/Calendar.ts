import HeaderContainer from '../containers/HeaderContainer';
import CalendarContainer from '../containers/CalendarContainer';

class Calendar {
  $app: HTMLElement;
  constructor({ $app }) {
    this.$app = $app;
    this.render();
  }
  render = () => {
    const $header = document.createElement('header');
    new HeaderContainer({ $target: $header });

    const $main = document.createElement('main');
    new CalendarContainer({ $target: $main });

    const fragemnt = document.createDocumentFragment();
    fragemnt.appendChild($header);
    fragemnt.appendChild($main);

    this.$app.innerHTML = '';
    this.$app.appendChild(fragemnt);
  };
}
export default Calendar;
