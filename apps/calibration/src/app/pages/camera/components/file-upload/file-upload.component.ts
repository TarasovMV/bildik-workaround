import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiInputFilesModule, TuiMarkerIconModule } from '@taiga-ui/kit';
import type { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiLinkModule } from '@taiga-ui/core';

@Component({
    selector: 'calibration-file-upload',
    standalone: true,
    imports: [
        CommonModule,
        TuiInputFilesModule,
        TuiMarkerIconModule,
        ReactiveFormsModule,
        TuiLinkModule,
    ],
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent {
    @Input({ required: true }) control: FormControl<any> | undefined;
}
