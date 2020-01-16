import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myfilter',
})
export class MyFilterPipe implements PipeTransform {
    transform(items: any[], minRange:number, fv: number, order:number, category: string): any {
        if (!items || !fv) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out    

        items = items.filter(item => (category==="All") ? true : (item.category === category));

        items = items.sort(function(a, b){return (order > 0) ? (a.price - b.price) : (b.price - a.price)});

        return items.filter(item => item.price >= minRange && item.price <= fv );
    }
}