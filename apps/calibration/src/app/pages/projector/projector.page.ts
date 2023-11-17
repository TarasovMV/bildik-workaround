import type { AfterViewInit } from '@angular/core';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    inject,
    ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiLetModule, TuiPanModule } from '@taiga-ui/cdk';
import { debounceTime, merge, throttleTime } from 'rxjs';
import { FileUploadComponent } from '../camera/components/file-upload/file-upload.component';
import { ImageComponent } from '../camera/components/image/image.component';
import { CoordinateService } from '../../services/coordinate.service';
import { SocketService } from '../../services/socket.service';

@Component({
    selector: 'calibration-projector',
    standalone: true,
    imports: [
        CommonModule,
        FileUploadComponent,
        ImageComponent,
        TuiLetModule,
        TuiPanModule,
    ],
    providers: [CoordinateService],
    templateUrl: './projector.page.html',
    styleUrls: ['./projector.page.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class ProjectorPage implements AfterViewInit {
    @ViewChild('container', { read: ElementRef<HTMLElement> }) containerRef:
        | ElementRef
        | undefined;

    readonly coordinateService = inject(CoordinateService);
    readonly socketService = inject(SocketService);

    size: Size = [1280, 720];
    scale: number | undefined;

    get drawSize(): Size | null {
        if (!this.containerRef?.nativeElement) {
            return null;
        }

        return [
            this.containerRef.nativeElement.clientWidth,
            this.containerRef.nativeElement.clientHeight,
        ];
    }

    ngAfterViewInit() {
        if (!this.containerRef) {
            return;
        }

        const scale =
            this.size[0] / this.containerRef.nativeElement.clientWidth;

        merge(...this.coordinateService.coordinates$)
            .pipe(
                throttleTime(300, undefined, { leading: true, trailing: true })
            )
            .subscribe((x) => {
                this.socketService.sendMessage({
                    type: 'coordinates',
                    data: this.coordinateService.coordinates$.map((p) =>
                        p.value.map((c) => c * scale)
                    ),
                });
            });
    }
}
