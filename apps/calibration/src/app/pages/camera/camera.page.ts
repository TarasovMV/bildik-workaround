import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable, of, shareReplay, switchMap } from 'rxjs';
import { TuiLetModule } from '@taiga-ui/cdk';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ImageComponent } from './components/image/image.component';

@Component({
    selector: 'calibration-camera',
    standalone: true,
    imports: [CommonModule, FileUploadComponent, ImageComponent, TuiLetModule],
    templateUrl: './camera.page.html',
    styleUrls: ['./camera.page.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class CameraPage {
    readonly fileControl = new FormControl();
    readonly imageSrc$ = this.fileControl.valueChanges.pipe(
        switchMap((file) => {
            return !file
                ? of(null)
                : (new Observable((sub) => {
                      const reader = new FileReader();
                      reader.onload = (event: any) => {
                          sub.next(event.target.result);
                      };
                      reader.onerror = () => {
                          sub.next(null);
                      };
                      reader.readAsDataURL(file);
                  }) as Observable<string | null>);
        }),
        shareReplay({ bufferSize: 1, refCount: true })
    );
}
