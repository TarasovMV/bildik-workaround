import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
    TUI_SANITIZER,
    TuiAlertModule,
    TuiDialogModule,
    TuiRootModule,
} from '@taiga-ui/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
    standalone: true,
    imports: [
        RouterModule,
        TuiRootModule,
        TuiDialogModule,
        TuiAlertModule,
        HeaderComponent,
    ],
    selector: 'calibration-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    title = 'calibration';
}
