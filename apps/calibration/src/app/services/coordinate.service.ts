import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, shareReplay } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class CoordinateService {
    private readonly sanitizer = inject(DomSanitizer);

    readonly coordinates$ = [
        new BehaviorSubject<Size>([0, 0]),
        new BehaviorSubject<Size>([100, 0]),
        new BehaviorSubject<Size>([100, 100]),
        new BehaviorSubject<Size>([0, 100]),
    ];

    onPan(idx: number, delta: readonly [number, number]): void {
        this.coordinates$[idx].next([
            this.getCurrentCoords(idx)[0] + delta[0],
            this.getCurrentCoords(idx)[1] + delta[1],
        ]);

        const canvas = this.getCanvas();
        if (!canvas) {
            return;
        }

        this.drawLines(canvas);
    }

    transform$(idx: number) {
        return this.coordinates$[idx].pipe(
            map((coords) =>
                this.sanitizer.bypassSecurityTrustStyle(
                    `translate(${coords[0]}px, ${coords[1]}px)`
                )
            ),
            shareReplay({ bufferSize: 1, refCount: true })
        );
    }

    drawLines(canvas: HTMLCanvasElement) {
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#FF0000';
        ctx.strokeStyle = '#FF0000';

        ctx.beginPath();

        const startPoint = this.getCurrentCoords(0);

        ctx.moveTo(startPoint[0], startPoint[1]);

        this.coordinates$
            .filter((_, idx) => !!idx)
            .map((x) => x.value)
            .forEach((c) => ctx.lineTo(c[0], c[1]));

        ctx.lineTo(startPoint[0], startPoint[1]);

        ctx.stroke();
    }

    private getCurrentCoords(idx: number): number[] {
        return this.coordinates$[idx].value;
    }

    private getCanvas(): HTMLCanvasElement | undefined {
        return document.getElementById('canvas') as HTMLCanvasElement;
    }
}
