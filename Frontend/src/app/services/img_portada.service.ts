import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'

})
export class ImagesService{
    constructor(@Inject(DOCUMENT) private document: Document){}

    getImages(): string[]{
        return[
            this.document.location.origin + '/assets/img/img-1.jpg',
            this.document.location.origin + '/assets/img/img-2.jpg',
            this.document.location.origin + '/assets/img/img-3.jpg',
        ]
    }
}