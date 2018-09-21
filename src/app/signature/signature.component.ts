import { Component, ViewChild, ElementRef, AfterViewInit, HostListener, Input, Output, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-signature',
    templateUrl: './signature.component.html',
    styleUrls: ['./signature.component.scss']
})
export class SignatureComponent implements OnInit {
    @Input()
    public strokeColor: string = '#000000';
    @Input()
    public lineJoin: string = 'round';
    @Input()
    public lineWidth: number = 3;
    @Input()
    public displayClear: boolean = true;
    @Output()
    public IsEmpty: boolean = true;

    @ViewChild('canvasEl') canvasEl?: ElementRef;
    private context?: CanvasRenderingContext2D;
    private paint: boolean = false;
    private clickX: any[] = new Array();
    private clickY: any[] = new Array();
    private clickDrag: any[] = new Array();


    constructor() {
    }


    ngOnInit() {

    }

    ngAfterViewInit() {
        this.context = (this.canvasEl!.nativeElement as HTMLCanvasElement).getContext('2d')!;
    }

    protected mouseOverEvent(e: any): void {
        this.paint = true;
        this.addClick(
            e.offsetX,
            e.offsetY
        );
        this.redraw();
    }

    protected mouseUpEvent(e: any): void {
        this.paint = false;
    }

    protected addClick(x: number, y: number, dragging: boolean = false): void {
        this.clickX.push(x);
        this.clickY.push(y);
        this.clickDrag.push(dragging);
    }

    protected redraw(): void {
        this.IsEmpty = false;
        //this.context!.clearRect(0, 0, this.context!.canvas.width, this.context!.canvas.height);

        this.context!.strokeStyle = this.strokeColor;
        this.context!.lineJoin = this.lineJoin;
        this.context!.lineWidth = this.lineWidth;

        for (var i = 0; i < this.clickX.length; i++) {
            this.context!.beginPath();
            if (this.clickDrag[i] && i) {
                this.context!.moveTo(this.clickX[i - 1], this.clickY[i - 1]);
            } else {
                this.context!.moveTo(this.clickX[i] - 1, this.clickY[i]);
            }
            this.context!.lineTo(this.clickX[i], this.clickY[i]);
            this.context!.closePath();
            this.context!.stroke();
        }
    }

    protected mouseMoveEvent(e: any): void {
        if (this.paint) {
            this.addClick(
                e.offsetX,
                e.offsetY,
                true);
            this.redraw();
        }
    }

    protected mouseLeaveEvent(e: any): void {
        this.paint = false;
    }

    protected clearCanvas(): void {
        this.context!.clearRect(0, 0, this.context!.canvas.width, this.context!.canvas.height);
        this.clickX = [];
        this.clickY = [];
        this.clickDrag = [];
        this.IsEmpty = true;
    }

    public getImage(): any {
        return (this.canvasEl!.nativeElement as HTMLCanvasElement).toDataURL("image/jpg")
            .replace("data:image/png;base64,", "");
    }

    public loadImage(base64Image:any []): void {
        var image = new Image();
        var ctx = this.context!;
        image.onload = function () {
            ctx.drawImage(image, 0, 0);
        };
        image.src = "data:image/png;base64," + base64Image;
        this.IsEmpty = false;
    }
}
