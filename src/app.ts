import {Component, bootstrap} from 'angular2/angular2';

@Component({
    selector: 'my-app',
    templateUrl: './dist/templates/main.html'
    // template: `<h1>Who's awesome? {{name}} is!</h1>
    // The winner is: <input [value]="name" (input)="name = $event.target.value">
    // <p>(this was included fomr an inline template)</p>`
})

class AppComponent {
    name: string = 'Maru the Cat';
}

bootstrap(AppComponent);