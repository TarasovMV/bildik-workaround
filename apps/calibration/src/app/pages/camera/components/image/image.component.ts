import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { TuiLetModule, TuiPanModule } from '@taiga-ui/cdk';
import { CoordinateService } from '../../../../services/coordinate.service';

@Component({
    selector: 'calibration-image',
    standalone: true,
    imports: [CommonModule, TuiPanModule, TuiLetModule],
    providers: [CoordinateService],
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageComponent {
    @Input({ required: true }) src: any | undefined;

    readonly coordinateService = inject(CoordinateService);
    readonly imageSize$ = new BehaviorSubject<{
        real: Size;
        draw: Size;
        scale: number;
    } | null>(null);

    imageLoad() {
        const img = document.getElementsByTagName('img')[0];
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;

        if (!img) {
            return;
        }

        this.imageSize$.next({
            real: [img.naturalWidth, img.naturalHeight],
            draw: [img.clientWidth, img.clientHeight],
            scale: img.naturalWidth / img.clientWidth,
        });

        if (!canvas) {
            return;
        }

        canvas.width = img.clientWidth;
        canvas.height = img.clientHeight;
    }
}
